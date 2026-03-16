export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

export function calcNights(checkIn: Date, checkOut: Date): number {
  const diff = checkOut.getTime() - checkIn.getTime();
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
}

export function calcTotalPrice(pricePerNight: number, nights: number) {
  const subtotal = pricePerNight * nights;
  const tax = Math.round(subtotal * 0.1);
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + tax + serviceFee;
  return { subtotal, tax, serviceFee, total };
}

export function generateBookingId(): string {
  const prefix = "LUX";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const random = Array.from({ length: 8 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `${prefix}-${random}`;
}
