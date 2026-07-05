// import FaderInAnimation from "@/Hooks/FaderInAnimation";
// import RevealInAnimation from "@/Hooks/RevealInAnimation";
// import Link from "next/link";
// import Button from "@/components/ui/Button";

// export default function CtaBox() {
//   return (
//     <section className="cta-box dark-section relative py-24 bg-(--primary-color)">
//       <div className="container mx-auto px-4 relative z-1">
//         <div className="flex flex-col items-center gap-10 lg:flex-row">
//           {/* Left: Content */}
//           <div className="w-full lg:w-1/2">
//             <div className="cta-content h-full text-center lg:text-left">
//               {/* Section Title */}
//               <div className="section-title">
//                 <RevealInAnimation>
//                   <h2
//                     className="text-anime-style-2 leading-tight text-2xl sm:text-3xl lg:text-8xl font-bold text-(--white-color) text-center font-default"
//                     data-cursor="-opaque"
//                   >
//                     <span className="block  font-accent font-light italic lg:text-6xl">
//                       Get 50% off
//                     </span>
//                     Premium oil
//                   </h2>
//                 </RevealInAnimation>
//                 <FaderInAnimation direction="up">
//                   <p
//                     className="wow fadeInUp mt-6 opacity-80 text-sm sm:text-base text-align--center justify lg:text-center text-(--white-color)"
//                     data-wow-delay="0.2s"
//                   >
//                     Porches Premium Oil is crafted for those who value purity and
//                     excellence. Sourced from the finest natural ingredients, our
//                     premium oil is carefully extracted to preserve its full
//                     potency.
//                   </p>
//                 </FaderInAnimation>
//               </div>

//               {/* Button */}
//               <FaderInAnimation direction="up" delay="0.4s">
//                 <div
//                   className="cta-buton wow fadeInUp mt-8"
//                   data-wow-delay="0.4s"
//                 >
//                   <div className="flex justify-center">
//                     <Link href="/contact">
//                       <Button
//                         variant="accent"
//                         size="lg"
//                         className="!rounded-full !px-8 uppercase tracking-wide"
//                       >
//                         purchase now
//                       </Button>
//                     </Link>
//                   </div>
//                 </div>
//               </FaderInAnimation>
//             </div>
//           </div>

//           {/* Right: Image */}
//           <div className="w-full lg:w-1/2">
//             <div className="cta-image h-full text-center">
//               <figure>
//                 <img
//                   src="/images/cta-image.png"
//                   alt="Premium oil"
//                   className="mx-auto w-full object-cover aspect-[1/0.955] -mb-24"
//                 />
//               </figure>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function CtaBox({ data = {} }) {
  return (
    <section className="cta-box dark-section relative bg-(--primary-color) py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 relative z-1">
        <div className="flex flex-col items-center gap-10 lg:flex-row">

          {/* Left: Content */}
          <div className="w-full lg:w-1/2">
            <div className="cta-content h-full text-center lg:text-center">
              {/* Section Title */}
              <div className="section-title">

                <RevealInAnimation>
                  <h2 className="leading-tight text-2xl sm:text-3xl lg:text-8xl font-bold text-(--white-color) text-center lg:text-center font-default">
                    <span className="block font-accent font-light italic lg:text-6xl">
                      {data?.title_line1}
                    </span>
                    {data?.title_line2}
                  </h2>
                </RevealInAnimation>

                <FaderInAnimation direction="up">
                  <p className="mt-6 opacity-90 text-sm sm:text-base text-(--white-color) text-center lg:text-center leading-relaxed">
                    {data?.description}
                  </p>
                </FaderInAnimation>

              </div>

              {/* Button */}
              <FaderInAnimation direction="up" delay={0.4}>
                <div className="mt-8 flex justify-center lg:justify-center">
                  <Link href="/products">
                    <Button
                      variant="accent"
                      size="lg"
                      className="rounded-full! px-8! uppercase tracking-wide"
                    >
                      {data?.button_text}
                    </Button>
                  </Link>
                </div>
              </FaderInAnimation>

            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-1/2">
            <div className="cta-image h-full text-center">
              <Link href={data?.links?.purchase || "/blog"} className="block group relative">
                <Image
                  src="/images/new/Purchase-Now.webp"
                  alt="Prolixus Produkt"
                  width={800}
                  height={800}
                  className="mx-auto w-full object-cover aspect-[1/0.955]  rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 rounded-2xl">
                  <span className="text-white font-bold text-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Read more &rarr;
                  </span>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
