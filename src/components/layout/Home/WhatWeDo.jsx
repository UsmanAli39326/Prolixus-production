// import FaderInAnimation from "@/Hooks/FaderInAnimation";
// import RevealInAnimation from "@/Hooks/RevealInAnimation";

// export default function WhatWeDo() {
//   return (
//     <section className="what-we-do py-24 relative bg-(--primary-color)">
//       <div className="container mx-auto px-4 relative z-1">
//         <div className="grid items-center gap-10 lg:grid-cols-2">
//           {/* Left: Images */}
//           <div>
//             <RevealInAnimation direction="left">
//               <div className="what-we-images relative flex flex-wrap items-end lg:mr-4">
//                 {/* Image 1 */}
//                 <div className="what-we-image-1 w-full pr-0 lg:pr-12">
//                   <figure className="block rounded-2xl overflow-hidden">
//                     <img
//                       src="/images/what-we-image-1.jpg"
//                       alt="What we do image 1"
//                       className="w-full object-cover rounded-2xl aspect-[1/0.73]"
//                     />
//                   </figure>
//                 </div>

//                 {/* Image 2 */}
//                 <div className="what-we-image-2 relative w-full max-w-[410px] ml-auto -mt-20 z-1">
//                   <figure className="image-anime reveal block rounded-2xl overflow-hidden">
//                     <img
//                       src="/images/what-we-image-2.jpg"
//                       alt="What we do image 2"
//                       className="w-full object-cover rounded-2xl aspect-[1/0.62]"
//                     />
//                   </figure>
//                 </div>

//                 {/* Circle */}
//                 <div className="what-we-circle absolute left-[50px] bottom-10 border-10 border-(--primary-color) rounded-full z-1">
//                   <img
//                     src="/images/premium-quality-circle-2.png"
//                     alt="Premium quality"
//                     className="w-full max-w-[180px] rounded-full animate-spin-slowly"
//                   />
//                 </div>
//               </div>
//             </RevealInAnimation>
//           </div>

//           {/* Right: Content */}
//           <div>
//             <div className="what-we-content space-y-8">
//               {/* Section Title */}
//               <div className="section-title">
//                 <FaderInAnimation direction="up">
//                   <h3 className="wow fadeInUp text-sm  capatilize tracking-[0.2em] text-(--white-color) font-accent italic font-thin">
//                     What we do ?
//                   </h3>
//                 </FaderInAnimation>
//                 <h2
//                   className="text-anime-style-2 text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight text-(--white-color) font-default"
//                   data-cursor="-opaque"
//                 >
//                   Delivering precision, purity,{" "}
//                   <span className="block font-thin  font-accent italic">
//                     and care daily
//                   </span>
//                 </h2>
//               </div>

//               {/* Items */}
//               <div className="what-we-item-box space-y-10">
//                 {/* Item 1 */}
//                 <FaderInAnimation direction="up" delay={0.2}>
//                   <div
//                     className="what-we-item wow fadeInUp border-b border-(--dark-divider-color) pb-10"
//                     data-wow-delay="0.2s"
//                   >
//                     <h3 className="relative mb-4 pl-8 text-lg font-semibold text-(--white-color)">
//                       Crafting Precision for Every Drop
//                     </h3>
//                     <p className="m-0 text-sm sm:text-base text-(--white-color)">
//                       We believe that precision matters. Our expertly designed oil
//                       dropper bottles ensure controlled dispensing allowing you to
//                       use just the right amount.
//                     </p>
//                   </div>
//                 </FaderInAnimation>
//                 {/* Item 2 */}
//                 <FaderInAnimation direction="up" delay={0.4}>
//                   <div
//                     className="what-we-item wow fadeInUp border-b-0 pb-0 mb-0"
//                     data-wow-delay="0.4s"
//                   >
//                     <h3 className="relative mb-4 pl-8 text-lg font-semibold text-(--white-color)">
//                       Designed for Essential Oils
//                     </h3>
//                     <p className="m-0 text-sm sm:text-base text-(--white-color)">
//                       We believe that precision matters. Our expertly designed oil
//                       dropper bottles ensure controlled dispensing allowing you to
//                       use just the right amount.
//                     </p>
//                   </div>
//                 </FaderInAnimation>
//               </div>
//             </div>
//           </div>
//           {/* End Right */}
//         </div>
//       </div>
//     </section>
//   );
// }


// =====================
//    TRANSLATED CODE
// =====================
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/ImageService";

export default function WhatWeDo({ data = {} }) {
  return (
    <section className="what-we-do py-12 sm:py-16 lg:py-20 relative bg-(--primary-color) overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-1">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2">

          {/* Left: Images */}
          <div>
            <RevealInAnimation direction="left">
              <div className="what-we-images relative flex flex-wrap items-end lg:mr-4">

                {/* Image 1 */}
                <div className="what-we-image-1 w-full pr-0 lg:pr-12">
                  <figure className="block rounded-2xl overflow-hidden">
                    <Link href="/blog" className="block w-full h-full group relative">
                      <Image
                        src={getImageUrl("/uploadimages/big_product_3.webp")}
                        alt="Prolixus Anwendung"
                        width={800}
                        height={800}
                        className="w-full object-cover rounded-2xl aspect-[1/0.73]"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                        <span className="text-white font-bold text-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          Read more &rarr;
                        </span>
                      </div>
                    </Link>
                  </figure>
                </div>

                {/* Image 2 */}
                <div className="what-we-image-2 relative w-full max-w-[280px] sm:max-w-[410px] ml-auto -mt-10 sm:-mt-20 z-1">
                  <figure className="block rounded-2xl overflow-hidden">
                    <Link href="/blog" className="block w-full h-full group relative">
                      <Image
                        src={getImageUrl("/uploadimages/small_product_copy_11.jpeg")}
                        alt="Prolixus Einnahme"
                        width={800}
                        height={800}
                        className="w-full object-cover rounded-2xl aspect-[1/0.62]"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                        <span className="text-white font-bold text-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          Read more &rarr;
                        </span>
                      </div>
                    </Link>
                  </figure>
                </div>

                {/* Circle */}
                <div className="what-we-circle absolute left-4 sm:left-[50px] bottom-4 sm:bottom-10 border-4 sm:border-8 border-(--primary-color) rounded-full z-1 bg-accent p-0 justify-center items-center flex overflow-hidden">
                  <Image
                    src="/images/new/logo-2.gif"
                    alt="Premium Qualität"
                    width={150}
                    height={150}
                    className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full object-cover"
                  />
                </div>
              </div>
            </RevealInAnimation>
          </div>

          {/* Right: Content */}
          <div>
            <div className="what-we-content space-y-6 sm:space-y-10">

              {/* Section Title */}
              <div className="section-title">
                <FaderInAnimation direction="up">
                  <h3 className="text-sm tracking-[0.2em] text-(--white-color) font-accent italic font-thin uppercase">
                    {data?.label}
                  </h3>
                </FaderInAnimation>

                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight text-(--white-color) font-default">
                  {data?.title_main}{" "}
                  <span className="block font-light font-accent italic">
                    {data?.title_accent}
                  </span>
                </h2>
              </div>

              {/* Items */}
              <div className="what-we-item-box space-y-8 sm:space-y-12">

                {/* Item 1 */}
                <FaderInAnimation direction="up" delay={0.2}>
                  <div className="what-we-item border-b border-(--dark-divider-color) pb-10">
                    <h3 className="mb-4 text-lg font-semibold text-(--white-color)">
                      {data?.item1_title}
                    </h3>
                    <p className="text-sm sm:text-base text-(--white-color)/90 leading-relaxed">
                      {data?.item1_desc}
                    </p>
                  </div>
                </FaderInAnimation>

                {/* Item 2 */}
                <FaderInAnimation direction="up" delay={0.4}>
                  <div className="what-we-item">
                    <h3 className="mb-4 text-lg font-semibold text-(--white-color)">
                      {data?.item2_title}
                    </h3>
                    <p className="text-sm sm:text-base text-(--white-color)/90 leading-relaxed">
                      {data?.item2_desc}
                    </p>
                  </div>
                </FaderInAnimation>
              </div>
            </div>
          </div>
          {/* End Right */}

        </div>
      </div>
    </section>
  );
}
