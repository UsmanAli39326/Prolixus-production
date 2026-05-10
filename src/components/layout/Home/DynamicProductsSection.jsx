import getAllProducts from "@/app/api/products/products";
import ProductsSection from "./Product";

/**
 * DynamicProductsSection is now a Server Component.
 * It fetches product data on the server during the rendering phase.
 * When wrapped in Suspense in the page, it will be streamed to the client.
 */
export default async function DynamicProductsSection({ localization = {} }) {
  try {
    const data = await getAllProducts(1, 4);
    
    if (!data || !data.products || data.products.length === 0) {
      return null;
    }

    return <ProductsSection products={data.products} data={localization} />;
  } catch (error) {
    console.error("Error fetching home products on server:", error);
    return null;
  }
}
