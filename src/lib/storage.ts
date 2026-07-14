
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
  if (!stored) {
    const mockBookings: Booking[] = [
      {
        id: "mock1",
        client: "Vilas Rao",
        phone: "+91 9876543210",
        email: "vilas.rao@gmail.com",
        subject: "Property Title Dispute - Land Acquisition",
        message: "Need urgent representation regarding land acquisition by NHAI in Nelamangala.",
        date: "12 Jul 2026",
        status: "Confirmed",
        createdAt: new Date().toISOString(),
        caseDescription: "NHAI has issued a notification for land acquisition. Client disputes the compensation package and compensation calculation under the new Act.",
        assignedAssociate: "Chandrashekar H",
        courtName: "High Court of Karnataka - Court Hall 8",
        caseState: "Evidence",
        caseNumber: "WP/8492/2026",
        media: [
          { id: "1", type: "photo", url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800", title: "Evidence Photo 1" }
        ],
        reviews: [
          { id: "1", author: "Internal Review", rating: 4, comment: "Case looks promising. Need to verify the witness statements.", date: "12 Jul 2026" }
        ],
        history: [
          { id: "h1", date: "12 Jul 2026", action: "Case Filed", description: "Writ petition filed seeking stay on dispossession.", updatedBy: "Chandrashekar H" },
          { id: "h2", date: "13 Jul 2026", action: "Admission Hearing", description: "Notice issued to NHAI. Interim stay granted on dispossession till next hearing.", updatedBy: "Chandrashekar H" }
        ]
      },
      {
        id: "mock2",
        client: "Meera Deshpande",
        phone: "+91 8765432109",
        email: "meera.d@yahoo.com",
        subject: "Constitutional Challenge - Service Dispute",
        message: "Challenging wrongful termination from state department in violation of Article 311.",
        date: "10 Jul 2026",
        status: "Confirmed",
        createdAt: new Date().toISOString(),
        caseDescription: "Client was terminated without an inquiry. Challenging under Article 311 of the Constitution.",
        assignedAssociate: "Vasushrutha Sharma",
        courtName: "Karnataka State Administrative Tribunal (KSAT)",
        caseState: "Admission",
        caseNumber: "Application No. 129/2026",
        media: [],
        reviews: [],
        history: [
          { id: "h1", date: "10 Jul 2026", action: "Petition Drafted", description: "Completed petition drafting and compiled annexures.", updatedBy: "Vasushrutha Sharma" },
          { id: "h2", date: "12 Jul 2026", action: "Filing Registered", description: "Filing registered successfully at KSAT registry.", updatedBy: "Vasushrutha Sharma" }
        ]
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockBookings));
    return mockBookings;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse bookings from localStorage", e);
    return [];
  }
};

export const saveBooking = (bookingData: Omit<Booking, "id" | "date" | "status" | "createdAt">) => {
  const bookings = getBookings();
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
  
  const updatedBookings = [newBooking, ...bookings];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
  return newBooking;
};

export const updateBooking = (id: string, updates: Partial<Booking>) => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(b => 
    b.id === id ? { ...b, ...updates } : b
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
  return updatedBookings.find(b => b.id === id);
};
