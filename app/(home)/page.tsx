import { Suspense } from "react";
import SearchBar from "@/components/search/SearchBar";
import PropertyListSection from "@/components/property/PropertyListSection";

export default function HomePage() {
  return (
    <main>
      {/* ── 검색 바 ── */}
      <section id="search-section" className="py-4 bg-white overflow-visible relative z-50">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 lg:px-16">
          <Suspense>
            <SearchBar variant="compact" />
          </Suspense>
        </div>
      </section>

      {/* ── 숙소 목록 ── */}
      <section className="max-w-[1800px] mx-auto px-6 md:px-10 lg:px-16 py-10 pb-24">
        <Suspense>
          <PropertyListSection />
        </Suspense>
      </section>
    </main>
  );
}
