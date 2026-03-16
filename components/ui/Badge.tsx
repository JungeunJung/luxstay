interface BadgeProps {
  children: React.ReactNode;
  variant?: "black" | "outline" | "gray" | "muted" | "blue";
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  black:   "bg-black text-white",
  outline: "border-[1.5px] border-black text-black bg-transparent",
  gray:    "bg-gray-100 text-gray-500 border border-gray-200",
  muted:   "bg-gray-100 text-gray-400",
  blue:    "bg-blue-600 text-white",
};

export default function Badge({ children, variant = "black" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-en text-11 font-bold px-2.5 py-[5px] rounded-full tracking-[0.01em] leading-none ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
