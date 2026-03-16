import Link from "next/link";
import BookingConfirmDetail from "@/components/booking/BookingConfirmDetail";

interface BookingConfirmationPageProps {
  searchParams: Promise<{ bookingId?: string }>;
}

export default async function BookingConfirmationPage({
  searchParams,
}: BookingConfirmationPageProps) {
  const { bookingId } = await searchParams;

  return (
    <main className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* 완료 아이콘 */}
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl">✓</span>
        </div>

        <p className="font-en text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">
          Booking Confirmed
        </p>
        <h1 className="text-4xl font-bold tracking-tight2 mb-4">
          예약이 완료되었습니다
        </h1>
        <p className="text-base text-gray-500 leading-relaxed mb-10">
          입력하신 이메일로 예약 확인서가 발송되었습니다.
          <br />
          SMS로도 예약번호와 체크인 안내를 보내드렸습니다.
        </p>

        {/* 예약 상세 */}
        {bookingId && <BookingConfirmDetail bookingId={bookingId} />}

        {/* 홈으로 */}
        <div className="mt-10">
          <Link
            href="/"
            className="bg-black text-white font-semibold rounded-full py-4 px-8 hover:bg-gray-900 active:scale-[0.98] transition-all inline-block"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
