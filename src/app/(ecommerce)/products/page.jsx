import categories from "@/app/api/products/categories";
import filters from "@/app/api/products/filter";
import ShopHero from "@/components/layout/Ecommerce/ProductListingPage/ProductHero";
import ProductsFilterManager from "@/components/layout/Ecommerce/ProductListingPage/ProductsFilterManager";
import { getLocalization } from "@/lib/getLocalization";


export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const data = await getLocalization();
  return {
    title: data?.shop_all_products_meta_title,
    description: data?.shop_all_products_meta_desc,
  };
}

export default async function ShopPage({ searchParams }) {
  const data = await getLocalization();
  const resolvedParams = await searchParams;

  const categoryList = await categories();
  const filterList = await filters();

  const page = Number(resolvedParams.page) || 1;
  const sortBy = resolvedParams.sort || filterList.sort[0];
  const minPrice = Number(resolvedParams.minPrice) || filterList.price.min;
  const maxPrice = Number(resolvedParams.maxPrice) || filterList.price.max;

  return (
    <div className="bg-(--secondary-color)">
      <ShopHero
        title={data?.shop_all_products_title}
        subtitle={data?.shop_all_products_subtitle}
      />
      <ProductsFilterManager
        categoryList={categoryList}
        filters={filterList}
        initialPage={page}
        initialSort={sortBy}
        initialPriceRange={{ min: minPrice, max: maxPrice }}
        localization={data}
      />
    </div>
  );
}