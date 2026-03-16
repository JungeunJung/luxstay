"use client";

// TODO: 달력 UI 라이브러리 연동 (react-day-picker 권장)
// npm install react-day-picker date-fns

interface DateRangePickerProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onChange: (checkIn: Date | null, checkOut: Date | null) => void;
  inline?: boolean;
}

export default function DateRangePicker({
  checkIn,
  checkOut,
  onChange,
  inline = false,
}: DateRangePickerProps) {
  const formatDate = (d: Date | null) =>
    d ? d.toLocaleDateString("ko-KR", { month: "long", day: "numeric" }) : "날짜 선택";

  if (inline) {
    return (
      <div>
        <label className="block font-en text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          체크인 · 체크아웃
        </label>
        {/* TODO: 인라인 달력 구현 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl px-3.5 py-3 border-[1.5px] border-transparent">
            <p className="font-en text-[10px] text-gray-400 uppercase tracking-wider mb-1">체크인</p>
            <p className="text-sm font-medium">{formatDate(checkIn)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl px-3.5 py-3 border-[1.5px] border-transparent">
            <p className="font-en text-[10px] text-gray-400 uppercase tracking-wider mb-1">체크아웃</p>
            <p className="text-sm font-medium">{formatDate(checkOut)}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">달력 UI 연동 예정 (react-day-picker)</p>
      </div>
    );
  }

  return (
    <div>
      <label className="block font-en text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
        날짜
      </label>
      <p className="text-sm text-black">
        {checkIn && checkOut
          ? `${formatDate(checkIn)} → ${formatDate(checkOut)}`
          : "체크인 - 체크아웃"}
      </p>
    </div>
  );
}
