import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* 브랜드 */}
          <div className="md:col-span-2">
            <p className="font-en text-xl font-bold tracking-tightest mb-3">LUXSTAY</p>
            <p className="text-13 text-gray-500 leading-relaxed max-w-xs">
              고급 여행자와 프리미엄 숙박 업체를 연결하는 숙박 예약 플랫폼입니다.
              몇 번의 클릭만으로 특별한 숙박 경험을 예약하세요.
            </p>
          </div>

          {/* 고객지원 */}
          <div>
            <p className="font-en text-11 font-medium uppercase tracking-wider text-gray-400 mb-4">
              Support
            </p>
            <ul className="space-y-2.5">
              {["자주 묻는 질문", "취소 및 환불 정책", "고객센터"].map((item) => (
                <li key={item}>
                  <Link href="/" className="text-13 text-gray-500 hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 */}
          <div>
            <p className="font-en text-11 font-medium uppercase tracking-wider text-gray-400 mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              {["서비스 소개", "개인정보처리방침", "이용약관"].map((item) => (
                <li key={item}>
                  <Link href="/" className="text-13 text-gray-500 hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-en text-11 text-gray-400">© 2026 LUXSTAY. All Rights Reserved.</p>
          <p className="text-11 text-gray-300">
            사업자등록번호: 000-00-00000 | 통신판매업신고: 제0000-서울-0000호
          </p>
        </div>
      </div>
    </footer>
  );
}
