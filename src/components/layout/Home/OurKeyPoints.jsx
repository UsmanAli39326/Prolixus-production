// import FaderInAnimation from "@/Hooks/FaderInAnimation";
// import RevealInAnimation from "@/Hooks/RevealInAnimation";

// export default function OurKeyPoints() {
//   return (
//     <section className="our-key-points py-24">
//       <div className="container mx-auto px-4">
//         {/* Top heading row */}
//         <div className="section-row mb-12 flex flex-col gap-6 lg:flex-row lg:items-center">
//           <div className="lg:w-1/2">
//             <div className="section-title pl-5">
//               <h3 className="wow fadeInUp text-sm font-thin capitalize tracking-[0.2em] text-(--primary-color)">
//                 our key points
//               </h3>
//               <RevealInAnimation direction="left">
//                 <h2
//                   className="text-anime-style-2 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-(--primary-color) font-default"
//                   data-cursor="-opaque"
//                 >
//                   Superior design, precision{" "}
//                   <span className="block text-(--dark-color) font-accent font-light italic">
//                     drop lasting quality
//                   </span>
//                 </h2>
//               </RevealInAnimation>
//             </div>
//           </div>

//           <div className="lg:w-1/2">
//             <div
//               className="section-title-content wow fadeInUp"
//               data-wow-delay="0.2s"
//             >
//               <p className="text-sm sm:text-base text-(--body-color,rgba(15,23,42,0.75))">
//                 Crafted with superior design, engineered with precision, and
//                 built to a commitment to excellence ensures every detail is
//                 meticulously perfected, delivering unparalleled quality and
//                 durability.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Main content row */}
//         <div className="flex flex-col items-center lg:flex-row  lg:items-center lg:gap-8 font-default">
//           {/* Left column - box 1 (reversed items via your CSS) */}
//           <div className="w-full lg:w-1/3 order-1">
//             <FaderInAnimation direction="up">
//               <div className="key-points-item-box-1">
//                 <div
//                   className="key-points-item wow fadeInUp flex items-center mb-14"
//                   data-wow-delay="0.4s"
//                 >
//                   <div className="key-points-item-content w-[calc(100%-100px)] text-right">
//                     <h3 className="text-lg font-semibold mb-2 font-default text-(--primary-color)">
//                       Preserves Purity
//                     </h3>
//                     <p className="m-0 text-sm">
//                       Ensures natural essence, free and from toxins, additives
//                     </p>
//                   </div>
//                   <div className="icon-box relative flex h-20 w-20 items-center justify-center rounded-full bg-(--accent-color) ml-5">
//                     <span className="absolute inset-0 rounded-full bg-(--primary-color) scale-0 transition-transform duration-300" />
//                     <img
//                       src="/images/icon-key-points-1.svg"
//                       alt="Preserves Purity"
//                       className="relative z-1 max-w-[45px]"
//                     />
//                   </div>
//                 </div>

//                 <div
//                   className="key-points-item wow fadeInUp flex items-center mb-14"
//                   data-wow-delay="0.6s"
//                 >
//                   <div className="key-points-item-content w-[calc(100%-100px)] text-right">
//                     <h3 className="text-lg font-semibold mb-2 font-default text-(--primary-color)">
//                       Travel Friendly
//                     </h3>
//                     <p className="m-0 text-sm">
//                       Ensures natural essence, free and from toxins, additives
//                     </p>
//                   </div>
//                   <div className="icon-box relative flex h-20 w-20 items-center justify-center rounded-full bg-(--accent-color) ml-5">
//                     <span className="absolute inset-0 rounded-full bg-(--primary-color) scale-0 transition-transform duration-300" />
//                     <img
//                       src="/images/icon-key-points-2.svg"
//                       alt="Travel Friendly"
//                       className="relative z-1 max-w-[45px]"
//                     />
//                   </div>
//                 </div>

//                 <div
//                   className="key-points-item wow fadeInUp flex items-center mb-0"
//                   data-wow-delay="0.8s"
//                 >

//                   <div className="key-points-item-content w-[calc(100%-100px)] text-right">
//                     <h3 className="text-lg font-semibold mb-2 font-default text-(--primary-color)">
//                       Preserves Purity
//                     </h3>
//                     <p className="m-0 text-sm">
//                       Ensures natural essence, free and from toxins, additives
//                     </p>
//                   </div>
//                   <div className="icon-box relative flex h-20 w-20 items-center justify-center rounded-full bg-(--accent-color) ml-5">
//                     <span className="absolute inset-0 rounded-full bg-(--primary-color) scale-0 transition-transform duration-300" />
//                     <img
//                       src="/images/icon-key-points-3.svg"
//                       alt="Preserves Purity"
//                       className="relative z-1 max-w-[45px]"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </FaderInAnimation>
//           </div>
//           {/* Middle image */}
//           <div className="w-full lg:w-1/3 order-3 lg:order-2 mt-10 lg:mt-0">
//             <div className="key-points-image text-center mx-4">
//               <figure>
//                 <img
//                   src="/images/key-points-image.png"
//                   alt="Key points"
//                   className="mx-auto w-full max-w-[340px]"
//                 />
//               </figure>
//             </div>
//           </div>

//           {/* Right column - box 2 */}
//           <div className="w-full lg:w-1/3 order-2 lg:order-3 mt-10 lg:mt-0">
//             <FaderInAnimation direction="up">
//               <div className="key-points-item-box-2">
//                 <div
//                   className="key-points-item wow fadeInUp flex items-center mb-14"
//                   data-wow-delay="0.4s"
//                 >
//                   <div className="icon-box relative flex h-20 w-20 items-center justify-center rounded-full bg-(--accent-color) mr-5">
//                     <span className="absolute inset-0 rounded-full bg-(--primary-color) scale-0 transition-transform duration-300" />
//                     <img
//                       src="/images/icon-key-points-4.svg"
//                       alt="100% Pure Oils"
//                       className="relative z-1 max-w-[45px]"
//                     />
//                   </div>
//                   <div className="key-points-item-content w-[calc(100%-100px)]">
//                     <h3 className="text-lg font-semibold mb-2 font-default text-(--primary-color)">
//                       100% Pure Oils
//                     </h3>
//                     <p className="m-0 text-sm">
//                       Ensures natural essence, free and from toxins, additives
//                     </p>
//                   </div>
//                 </div>

//                 <div
//                   className="key-points-item wow fadeInUp flex items-center mb-14"
//                   data-wow-delay="0.6s"
//                 >
//                   <div className="icon-box relative flex h-20 w-20 items-center justify-center rounded-full bg-(--accent-color) mr-5">
//                     <span className="absolute inset-0 rounded-full bg-(--primary-color) scale-0 transition-transform duration-300" />
//                     <img
//                       src="/images/icon-key-points-5.svg"
//                       alt="Eco Friendly"
//                       className="relative z-[1] max-w-[45px]"
//                     />
//                   </div>
//                   <div className="key-points-item-content w-[calc(100%-100px)]">
//                     <h3 className="text-lg font-semibold mb-2 font-default text-(--primary-color)">
//                       Eco Friendly
//                     </h3>
//                     <p className="m-0 text-sm">
//                       Ensures natural essence, free and from toxins, additives
//                     </p>
//                   </div>
//                 </div>

//                 <div
//                   className="key-points-item wow fadeInUp flex items-center mb-0"
//                   data-wow-delay="0.8s"
//                 >
//                   <div className="icon-box relative flex h-20 w-20 items-center justify-center rounded-full bg-(--accent-color) mr-5">
//                     <span className="absolute inset-0 rounded-full bg-(--primary-color) scale-0 transition-transform duration-300" />
//                     <img
//                       src="/images/icon-key-points-6.svg"
//                       alt="Trusted by Experts"
//                       className="relative z-[1] max-w-[45px]"
//                     />
//                   </div>
//                   <div className="key-points-item-content w-[calc(100%-100px)]">
//                     <h3 className="text-lg font-semibold mb-2 font-default text-(--primary-color)">
//                       Trusted by Experts
//                     </h3>
//                     <p className="m-0 text-sm">
//                       Ensures natural essence, free and from toxins, additives
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </FaderInAnimation>
//           </div>
//         </div>

//         {/* Footer text */}
//         <div
//           className="section-footer-text wow fadeInUp mt-16 text-center"
//           data-wow-delay="0.8s"
//         >
//           <p className="m-0 text-sm sm:text-base">
//             Let&apos;s make something great work together.{" "}
//             <a
//               href="/contact"
//               className="italic underline text-[var(--accent-color)] transition-colors hover:text-[var(--primary-color)]"
//             >
//               Get Free Quote
//             </a>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


// =====================
//    NEW CODE
// =====================]

import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/ImageService";

export default function OurKeyPoints({ data = {} }) {
  return (
    <section className="our-key-points py-10 sm:py-16 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Top heading row */}
        <div className="section-row mb-12 flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="lg:w-1/2">
            <div className="section-title pl-5">
              <h3 className="text-sm font-thin capitalize tracking-[0.2em] text-(--primary-color)">
                {data?.label}
              </h3>

              <RevealInAnimation direction="left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-(--primary-color) font-default">
                  {data?.title_main}
                  <span className="block text-(--accent-color) font-accent font-light italic">
                    {data?.title_accent}
                  </span>
                </h2>
              </RevealInAnimation>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div>
              <p className="text-sm sm:text-base text-(--primary-color)/75">
                {data?.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Main content row */}
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:gap-8 font-default">

          {/* LEFT COLUMN — on mobile: stacks below image as left-aligned items */}
          <div className="w-full lg:w-1/3 order-2 lg:order-1">
            <FaderInAnimation direction="up">
              <div className="key-points-item-box-1 space-y-6 sm:space-y-0">

                {/* Item 1 */}
                <div className="key-points-item flex items-center mb-6 sm:mb-14 flex-row-reverse lg:flex-row w-full">
                  <div className="key-points-item-content flex-1 text-left lg:text-right">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-(--primary-color)">
                      {data?.item1_title}
                    </h3>
                    <p className="m-0 text-sm">
                      {data?.item1_desc}
                    </p>
                  </div>
                  <div className="icon-box flex h-14 w-14 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-(--accent-color) mr-4 lg:mr-0 lg:ml-5">
                    <Image
                      src="/images/icon-key-points-1.svg"
                      alt="Energie"
                      width={64}
                      height={64}
                      className="max-w-[30px] sm:max-w-[45px]"
                    />
                  </div>
                </div>

                {/* Item 2 */}
                <div className="key-points-item flex items-center mb-6 sm:mb-14 flex-row-reverse lg:flex-row w-full">
                  <div className="key-points-item-content flex-1 text-left lg:text-right">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-(--primary-color)">
                      {data?.item2_title}
                    </h3>
                    <p className="m-0 text-sm">
                      {data?.item2_desc}
                    </p>
                  </div>
                  <div className="icon-box flex h-14 w-14 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-(--accent-color) mr-4 lg:mr-0 lg:ml-5">
                    <Image
                      src="/images/icon-key-points-2.svg"
                      alt="Bioverfügbarkeit"
                      width={64}
                      height={64}
                      className="max-w-[30px] sm:max-w-[45px]"
                    />
                  </div>
                </div>

                {/* Item 3 */}
                <div className="key-points-item flex items-center mb-0 flex-row-reverse lg:flex-row w-full">
                  <div className="key-points-item-content flex-1 text-left lg:text-right">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-(--primary-color)">
                      {data?.item3_title}
                    </h3>
                    <p className="m-0 text-sm">
                      {data?.item3_desc}
                    </p>
                  </div>
                  <div className="icon-box flex h-14 w-14 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-(--accent-color) mr-4 lg:mr-0 lg:ml-5">
                    <Image
                      src="/images/icon-key-points-3.svg"
                      alt="Qualität"
                      width={64}
                      height={64}
                      className="max-w-[30px] sm:max-w-[45px]"
                    />
                  </div>
                </div>

              </div>
            </FaderInAnimation>
          </div>

          {/* CENTER IMAGE — shown first on mobile, centerered on desktop */}
          <div className="w-full lg:w-[40%] order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="key-points-image text-center">
              <figure>
                <Link href="/blog" className="block w-full h-full group relative mx-auto max-w-[250px] sm:max-w-[280px] lg:max-w-[420px]">
                  <Image
                    src={getImageUrl("/uploadimages/Our_Key_Point_copy_6.webp")}
                    alt="Prolixus Produkt"
                    width={800}
                    height={800}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 rounded-2xl">
                    <span className="text-white font-bold text-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
              </figure>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-1/3 order-3 lg:order-3 mt-6 lg:mt-0">
            <FaderInAnimation direction="up">
              <div className="key-points-item-box-2 space-y-6 sm:space-y-0">

                {/* Item 4 */}
                <div className="key-points-item flex items-center mb-6 sm:mb-14 w-full">
                  <div className="icon-box flex h-14 w-14 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-(--accent-color) mr-4 sm:mr-5">
                    <Image
                      src="/images/icon-key-points-4.svg"
                      alt="Vegan"
                      width={64}
                      height={64}
                      className="max-w-[30px] sm:max-w-[45px]"
                    />
                  </div>
                  <div className="key-points-item-content flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-(--primary-color)">
                      {data?.item4_title}
                    </h3>
                    <p className="m-0 text-sm">
                      {data?.item4_desc}
                    </p>
                  </div>
                </div>

                {/* Item 5 */}
                <div className="key-points-item flex items-center mb-6 sm:mb-14 w-full">
                  <div className="icon-box flex h-14 w-14 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-(--accent-color) mr-4 sm:mr-5">
                    <Image
                      src="/images/icon-key-points-5.svg"
                      alt="Für jedes Alter"
                      width={64}
                      height={64}
                      className="max-w-[30px] sm:max-w-[45px]"
                    />
                  </div>
                  <div className="key-points-item-content flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-(--primary-color)">
                      {data?.item5_title}
                    </h3>
                    <p className="m-0 text-sm">
                      {data?.item5_desc}
                    </p>
                  </div>
                </div>

                {/* Item 6 */}
                <div className="key-points-item flex items-center mb-0 w-full">
                  <div className="icon-box flex h-14 w-14 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-(--accent-color) mr-4 sm:mr-5">
                    <Image
                      src="/images/icon-key-points-6.svg"
                      alt="Transparenz"
                      width={64}
                      height={64}
                      className="max-w-[30px] sm:max-w-[45px]"
                    />
                  </div>
                  <div className="key-points-item-content flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-(--primary-color)">
                      {data?.item6_title}
                    </h3>
                    <p className="m-0 text-sm">
                      {data?.item6_desc}
                    </p>
                  </div>
                </div>

              </div>
            </FaderInAnimation>
          </div>

        </div>
      </div>
    </section>
  );
}
