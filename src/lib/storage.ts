
export interface CaseMedia {
  id: string;
  type: "photo" | "video" | "file";
  url: string;
  title: string;
  size?: string;
  thumbnail?: string;
}

export interface CaseReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CaseHistoryItem {
  id: string;
  date: string;
  action: string;      // e.g., "Case Filed", "Evidence Submitted", "Next Hearing Scheduled"
  description: string; // details of the update
  updatedBy: string;   // person who updated it
}

export interface Booking {
  id: string;
  client: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  createdAt: string;
  caseDescription?: string;
  media?: CaseMedia[];
  reviews?: CaseReview[];
  
  // Case Tracking Fields
  assignedAssociate?: string;
  courtName?: string;
  caseState?: string;     // e.g. "Filing/Drafting", "Admission", "Interim Relief", "Evidence", "Arguments", "Judgment Pending", "Disposed"
  caseNumber?: string;    // Case number / e-court citation (e.g. WP 8492/2026)
  history?: CaseHistoryItem[];
}

export interface Associate {
  name: string;
  focus: string;
}

export const ASSOCIATES: Associate[] = [
  { name: "Chandrashekar H", focus: "Civil, Criminal, Service, Constitutional" },
  { name: "Deepashree", focus: "Civil, Criminal, Service, Constitutional" },
  { name: "Vasushrutha Sharma", focus: "Civil, Criminal, Service, Constitutional" },
  { name: "Sahana Sangreshi", focus: "Civil, Criminal, Service, Constitutional" },
  { name: "Shrinidhi K S", focus: "Civil, Criminal, Service, Constitutional, Matrimonial" },
  { name: "Chandra Gowda", focus: "Civil, Criminal, Service, Constitutional" },
  { name: "Drupad Gowda", focus: "Civil, Criminal, Service, Constitutional" },
  { name: "Pradnya Shenoy", focus: "Civil, Criminal, Service, Constitutional" },
  { name: "Ayush Thimmiah", focus: "Civil, Criminal, Service, Constitutional" },
  { name: "Mahadev S", focus: "Civil, Criminal, Service, Constitutional" },
];

const STORAGE_KEY = "vidhrta_bookings";

export const getBookings = (): Booking[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return []; // No local cache — cloud fetch will populate
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse bookings from localStorage", e);
    return [];
  }
};


const isLocalhost = typeof window !== "undefined" && 
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const CLOUD_URL = isLocalhost 
  ? "https://vidhrta-law-chambers.vercel.app/api/bookings" 
  : "/api/bookings";

const SETTINGS_URL = isLocalhost 
  ? "https://vidhrta-law-chambers.vercel.app/api/settings" 
  : "/api/settings";

export const getBookingsCloud = async (): Promise<Booking[]> => {
  try {
    const response = await fetch(CLOUD_URL);
    if (!response.ok) {
      throw new Error(`Cloud fetch failed with status: ${response.status}`);
    }
    const cloudBookings = await response.json();
    if (Array.isArray(cloudBookings)) {
      // Sync it locally as cache
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudBookings));
      return cloudBookings;
    }
  } catch (error) {
    console.error("Cloud fetch failed, falling back to local cache:", error);
  }
  // Fallback to local storage
  return getBookings();
};

export const saveBookingsCloud = async (bookings: Booking[]) => {
  try {
    // Write locally first as cache
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    
    // Write to cloud
    await fetch(CLOUD_URL, {
      method: "POST",
      body: JSON.stringify(bookings),
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Failed to sync bookings to cloud:", error);
  }
};

export const saveSingleBookingCloud = async (booking: Booking) => {
  try {
    await fetch(CLOUD_URL, {
      method: "POST",
      body: JSON.stringify([booking]),
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Failed to sync single booking to cloud:", error);
  }
};

export const saveBooking = (bookingData: Omit<Booking, "id" | "date" | "status" | "createdAt">) => {
  const newBooking: Booking = {
    ...bookingData,
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    status: "Pending",
    createdAt: new Date().toISOString(),
    caseDescription: bookingData.message,
    media: [
      { id: "1", type: "photo", url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800", title: "Evidence Photo 1" },
      { id: "2", type: "video", url: "#", title: "CCTV Footage" }
    ],
    reviews: [
      { id: "1", author: "Internal Review", rating: 4, comment: "Case looks promising. Need to verify the witness statements.", date: new Date().toLocaleDateString() }
    ],
    assignedAssociate: "",
    courtName: "",
    caseState: "Filing/Drafting",
    caseNumber: "",
    history: [
      { id: "h1", date: new Date().toLocaleDateString(), action: "Case Initialized", description: "Booking inquiry received and client folder initialized.", updatedBy: "System" }
    ]
  };
  
  const stored = localStorage.getItem(STORAGE_KEY);
  let localList = stored ? JSON.parse(stored) : [];
  localList = [newBooking, ...localList];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localList));
  
  // Sync ONLY the single new booking to the cloud
  saveSingleBookingCloud(newBooking).catch(console.error);
  
  return newBooking;
};

export const updateBooking = (id: string, updates: Partial<Booking>) => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(b => 
    b.id === id ? { ...b, ...updates } : b
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
  
  // Sync ONLY the single updated booking to the cloud
  const updatedBooking = updatedBookings.find(b => b.id === id);
  if (updatedBooking) {
    saveSingleBookingCloud(updatedBooking).catch(console.error);
  }
  
  return updatedBooking;
};

export const getAdminPassword = (): string => {
  return localStorage.getItem("vidhrta_admin_password") || "vidh2024";
};

export const saveAdminPassword = (password: string) => {
  localStorage.setItem("vidhrta_admin_password", password);
};

export const getAdminPasswordCloud = async (): Promise<string> => {
  try {
    const response = await fetch(SETTINGS_URL);
    if (response.ok) {
      const data = await response.json();
      if (data.adminPassword) {
        saveAdminPassword(data.adminPassword);
        return data.adminPassword;
      }
    }
  } catch (e) {
    console.error("Failed to fetch admin password from cloud:", e);
  }
  return getAdminPassword();
};

export const saveAdminPasswordCloud = async (password: string): Promise<boolean> => {
  try {
    saveAdminPassword(password);
    const response = await fetch(SETTINGS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ adminPassword: password })
    });
    return response.ok;
  } catch (e) {
    console.error("Failed to save admin password to cloud:", e);
    return false;
  }
};

export const deleteBookingCloud = async (id: string): Promise<boolean> => {
  try {
    const bookings = getBookings();
    const updated = bookings.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    const response = await fetch(`${CLOUD_URL}?id=${id}`, {
      method: "DELETE"
    });
    return response.ok;
  } catch (e) {
    console.error("Failed to delete booking from cloud:", e);
    return false;
  }
};
