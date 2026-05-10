import { getProductById } from "@/app/api/products/products";
import {
  ProductImageGallery,
  ProductInfo,
  ProductAccordion,
  ProductBuySection,
} from "@/components/layout/Ecommerce/ProductPage";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import { getLocalization } from "@/lib/getLocalization";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductById(slug);
  const data = await getLocalization();

  if (!product) {
    return {
      title: data?.product_not_found_title,
    };
  }

  return {
    title: `${product.title} | Ecomm Store`,
    description: product.description || `Buy ${product.title} at our store.`,
    openGraph: {
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductById(slug);
  const data = await getLocalization();

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-accent text-2xl font-semibold text-(--primary-color)">
            {data?.product_not_found_title}
          </h1>
          <p className="mt-2 text-(--text-color)">
            {data?.product_not_found_desc} (ID: {slug})
          </p>
        </div>
      </div>
    );
  }

  /* ============================
     DATA PREPARATION
  ============================ */
  const extendedProduct = {
    ...product,
    category: product.categoryName || "Product",
    subcategory: product.subcategoryName || "",
    badges: product.badge
      ? [{ label: product.badge, type: "default" }]
      : [],
    images: (() => {
      const allImgs = [product.image, ...(product.itemImages || [])].filter(Boolean);
      const unique = Array.from(new Set(allImgs));
      return unique.length > 0 ? unique : ["/images/new/prolixus-nutrients.jpeg"];
    })(),
    heroImage: product.image,
    accordionItems: [
      {
        title: data?.product_description_label,
        content: product.description || data?.product_no_description,
      },
      /*
      {
        title: "Shipping & Returns",
        content: "Free shipping over $50. 30-day satisfaction guarantee.",
      },
      */
    ],
  };

  /* ============================
     RENDER
  ============================ */
  return (
    <div className="bg-(--secondary-color) overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-start">
          <FaderInAnimation direction="left" delay={0.1} distance={30}>
            <ProductImageGallery
              images={extendedProduct.images}
              productTitle={extendedProduct.title}
            />
          </FaderInAnimation>

          <FaderInAnimation direction="right" delay={0.2} distance={30}>
            <div>
              <ProductInfo {...extendedProduct} localization={data} />

              <ProductBuySection product={product} localization={data} />

              <ProductAccordion items={extendedProduct.accordionItems} />
            </div>
          </FaderInAnimation>
        </div>
      </div>
    </div>
  );
}