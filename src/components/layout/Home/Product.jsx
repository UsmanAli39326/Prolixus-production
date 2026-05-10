// import Card from "@/components/ui/Card";

// const PRODUCTS = [
//   {
//     img: "/images/product-image-1.png",
//     title: "Eco Glow Dropper",
//     price: "$16.00",
//   },
//   {
//     img: "/images/product-image-2.png",
//     title: "Vital Oil Dropper",
//     price: "$35.00",
//     delay: "0.2s",
//   },
//   {
//     img: "/images/product-image-3.png",
//     title: "Golden Drip Bottle",
//     price: "$45.00",
//     delay: "0.6s",
//   },
//   {
//     img: "/images/product-image-4.png",
//     title: "Zen Flow Dropper",
//     price: "$62.00",
//     delay: "1s",
//   },
// ];

// export default function ProductsSection() {
//   return (
//     <section className="our-products py-24">
//       <div className="container mx-auto px-4">
//         {/* Header Row */}
//         <div className="section-row mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
//           <div className="section-title max-w-xl">
//             <h3 className="wow fadeInUp capitalize tracking-[0.2em] text-sm font-thin font-accent italic mb-4 text-(--primary-color)">
//               our product
//             </h3>
//             <h2
//               className="text-anime-style-2 text-3xl lg:text-4xl font-bold leading-tight font-default text-(--primary-color)"
//               data-cursor="-opaque"
//             >
//               Premium droppers for pure,
//               <span className="block  text-(--dark-color)  font-accent font-light italic">
//                 precise application
//               </span>
//             </h2>
//           </div>

//           <div
//             className="section-btn wow fadeInUp flex lg:justify-end"
//             data-wow-delay="0.2s"
//           >
//             <a
//               href="#"
//               className="btn-default inline-block rounded-full bg-(--accent-color) px-6 py-2 text-sm font-semibold text-(--white-color)"
//             >
//               view all products
//             </a>
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
//           {PRODUCTS.map((p, i) => (
//             <Card
//               key={i}
//               img={p.img}
//               title={p.title}
//               price={p.price}
//               delay={p.delay}
//             />
//           ))}
//         </div>

//         {/* Footer Text */}
//         <div
//           className="section-footer-text wow fadeInUp mt-10 text-center"
//           data-wow-delay="0.8s"
//         >
//           <p className="m-0 text-sm sm:text-base">
//             <span className="mr-2 rounded-full bg-(--accent-color) px-3 py-1 text-xs font-semibold text-(--white-color)">
//               Free
//             </span>
//             Let&apos;s make something great work together.{" "}
//             <a
//               href="/contact"
//               className="italic underline text-(--accent-color) transition-colors hover:text-(--primary-color)"
//             >
//               Get Free Quote
//             </a>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


import ProductGrid from "../Ecommerce/ProductListingPage/ProductGrid";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";

export default function ProductsSection({ products = [], data = {} }) {
  return (
    <section className="our-products py-16 lg:py-20">
      <div className="container mx-auto px-4">

        {/* Header Row */}
        <div className="section-row mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <RevealInAnimation direction="left" delay={0.2} duration={0.8}>
            <div className="section-title max-w-xl">
              <h3 className="capitalize tracking-[0.2em] text-sm font-thin font-accent italic mb-4 text-(--primary-color)">
                {data?.label}
              </h3>

              <h2 className="text-3xl lg:text-4xl font-bold leading-tight font-default text-(--primary-color)">
                {data?.title_main}
                <span className="block text-(--accent-color) font-accent font-light italic">
                  {data?.title_accent}
                </span>
              </h2>
            </div>
          </RevealInAnimation>

          <div className="section-btn flex lg:justify-end">
            <a
              href="/products"
              className="btn-default inline-block rounded-full bg-(--accent-color) px-6 py-2 text-sm font-semibold text-(--white-color)"
            >
              {data?.view_all_button}
            </a>
          </div>
        </div>

        {/* Product Grid */}
        <FaderInAnimation direction="up" delay={0.2} duration={0.8}>
          <ProductGrid products={products} columns={4} />
        </FaderInAnimation>

      </div>
    </section>
  );
}
