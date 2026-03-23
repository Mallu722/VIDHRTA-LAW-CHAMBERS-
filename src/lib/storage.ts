
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
}

const STORAGE_KEY = "vidhrta_bookings";

export const getBookings = (): Booking[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
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
