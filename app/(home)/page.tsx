import { Suspense } from "react";
import SearchBar from "@/components/search/SearchBar";
import PropertyListSection from "@/components/property/PropertyListSection";

export default function HomePage() {
  return (
    <main>
      {/* ── 검색 영역 ── */}
      <section className="px-6 md:px-10 lg:px-16 py-4">
        <div className="max-w-screen-xl mx-auto">
          <Suspense>
            <SearchBar variant="compact" />
          </Suspense>
        </div>
      </section>

      {/* ── 숙소 목록 ── */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16 py-8 pb-24">
        <Suspense>
          <PropertyListSection />
        </Suspense>
      </section>
    </main>
  );
}
