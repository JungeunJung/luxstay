import { getProperties, getFeaturedProperties } from "@/lib/properties";
import PropertyListClient from "./PropertyListClient";

export default async function PropertyListSection() {
  const [all, featured] = await Promise.all([
    getProperties(),
    getFeaturedProperties(),
  ]);

  return <PropertyListClient allProperties={all} featuredProperties={featured} />;
}
