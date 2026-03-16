"use client";

interface GuestCounterProps {
  adults: number;
  children: number;
  onChange: (adults: number, children: number) => void;
}

export default function GuestCounter({ adults, children, onChange }: GuestCounterProps) {
  const maxGuests = 10;

  const updateAdults = (delta: number) => {
    const next = Math.max(1, Math.min(adults + delta, maxGuests));
    onChange(next, children);
  };

  const updateChildren = (delta: number) => {
    const next = Math.max(0, Math.min(children + delta, maxGuests - adults));
    onChange(adults, next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">성인</p>
          <p className="text-xs text-gray-400">만 13세 이상</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateAdults(-1)}
            disabled={adults <= 1}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:border-gray-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            −
          </button>
          <span className="font-en text-sm font-medium w-4 text-center">{adults}</span>
          <button
            onClick={() => updateAdults(1)}
            disabled={adults + children >= maxGuests}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:border-gray-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">아동</p>
          <p className="text-xs text-gray-400">만 2~12세</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateChildren(-1)}
            disabled={children <= 0}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:border-gray-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            −
          </button>
          <span className="font-en text-sm font-medium w-4 text-center">{children}</span>
          <button
            onClick={() => updateChildren(1)}
            disabled={adults + children >= maxGuests}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:border-gray-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
