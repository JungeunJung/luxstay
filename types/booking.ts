export interface GuestInfo {
  name: string;
  phone: string;
  email: string;
  specialRequest?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  checkIn: Date;
  checkOut: Date;
  nights: number;
  adults: number;
  children: number;
  guestInfo: GuestInfo;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  serviceFee: number;
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

export interface CreateBookingInput {
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  guestInfo: GuestInfo;
  paymentMethod: string;
}
