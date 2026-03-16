import type { Property, PropertyFilter } from "@/types/property";

// TODO: 실제 API 또는 DB 연동으로 교체
// 현재는 mock 데이터를 사용합니다

export async function getProperties(filters?: PropertyFilter): Promise<Property[]> {
  const { MOCK_PROPERTIES } = await import("@/data/mockProperties");
  let results = [...MOCK_PROPERTIES];

  if (filters?.location) {
    results = results.filter(
      (p) =>
        p.region.includes(filters.location!) ||
        p.subRegion.includes(filters.location!) ||
        p.location.address.includes(filters.location!)
    );
  }

  if (filters?.type) {
    results = results.filter((p) => p.type === filters.type);
  }

  if (filters?.minPrice) {
    results = results.filter((p) => p.pricePerNight >= filters.minPrice!);
  }

  if (filters?.maxPrice) {
    results = results.filter((p) => p.pricePerNight <= filters.maxPrice!);
  }

  switch (filters?.sort) {
    case "price_asc":
      results.sort((a, b) => a.pricePerNight - b.pricePerNight);
      break;
    case "price_desc":
      results.sort((a, b) => b.pricePerNight - a.pricePerNight);
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return results;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const { MOCK_PROPERTIES } = await import("@/data/mockProperties");
  return MOCK_PROPERTIES.find((p) => p.id === id) ?? null;
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const { MOCK_PROPERTIES } = await import("@/data/mockProperties");
  return MOCK_PROPERTIES.filter((p) => p.isFeatured).slice(0, 3);
}
