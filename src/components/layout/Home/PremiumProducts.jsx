// import FaderInAnimation from "@/Hooks/FaderInAnimation";
// import RevealInAnimation from "@/Hooks/RevealInAnimation";

// export default function PremiumProducts() {
//   return (
//     <section
//       className="premium-products bg-(--white-color) bg-no-repeat bg-bottom-left py-24"
//       style={{ backgroundImage: "url(/images/section-bg-shape-1.png)" }}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col gap-10 lg:flex-row">
//           {/* LEFT: Content */}
//           <div className="w-full lg:w-7/12">
//             <div className="premium-products-content">
//               {/* Section Title */}
//               <div className="section-title mb-6 pl-4">
//                 <h3 className="wow fadeInUp text-sm font-semibold capitalize tracking-[0.2em] text-(--primary-color) mb-4">
//                   Premium dropper
//                 </h3>
//                 <RevealInAnimation direction="left" duration={1} >
//                   <h2
//                     className="text-anime-style-2 text-2xl sm:text-3xl lg:text-5xl font-default font-bold leading-tight text-(--primary-color)"
//                     data-cursor="-opaque"
//                   >
//                     Premium quality precsion design{" "}
//                     <span className="block text-(--primary-color) font-thin  font-accent italic">
//                       pure performance
//                     </span>
//                   </h2>
//                 </RevealInAnimation>
//               </div>

//               {/* Body: text + list */}
//               <div className="premium-products-body pl-4 flex flex-wrap items-center gap-6 border-b border-(--divider-color) pb-12 mb-12">

//                 <div
//                   className="premium-products-body-content wow fadeInUp w-full md:w-[calc(50%-15px)]"
//                   data-wow-delay="0.2s"
//                 >
//                   <FaderInAnimation direction="up" duration={0.2}>
//                     <p className="mb-6 text-sm sm:text-base">
//                       Our oil dropper bottles designed precision, ensuring
//                       controlled application.
//                     </p>
//                     <a
//                       href="/contact"
//                       className="btn-default inline-flex rounded-full bg-(--accent-color) px-6 py-2 text-sm font-semibold text-(--white-color)"
//                     >
//                       Explore More
//                     </a>
//                   </FaderInAnimation>
//                 </div>

//                 <div
//                   className="premium-products-list wow fadeInUp w-full md:w-[calc(50%-15px)]"
//                   data-wow-delay="0.4s"
//                 >
//                   <FaderInAnimation direction="up" duration={0.4}>
//                     <ul className="space-y-3">
//                       <li className="relative pl-8 text-sm sm:text-base">
//                         <span className="absolute left-0 top-[0.35em] h-[0.6em] w-[0.6em] rounded-full bg-accent"></span>
//                         Easy and mess-free oil dispensing
//                       </li>

//                       <li className="relative pl-8 text-sm sm:text-base">
//                         <span className="absolute left-0 top-[0.35em] h-[0.6em] w-[0.6em] rounded-full bg-accent"></span>
//                         Prevents spills and waste.
//                       </li>

//                       <li className="relative pl-8 text-sm sm:text-base">
//                         <span className="absolute left-0 top-[0.35em] h-[0.6em] w-[0.6em] rounded-full bg-accent"></span>
//                         Durable and safe for essential oils.
//                       </li>
//                     </ul>
//                   </FaderInAnimation>
//                 </div>
//               </div>

//               {/* Item cards */}
//               <FaderInAnimation direction="up">
//                 <div className="premium-products-item-box flex flex-wrap gap-6">
//                   {/* Item 1 */}
//                   <div
//                     className="premium-products-item wow fadeInUp relative w-full md:w-[calc(33.33%-20px)]"
//                     data-wow-delay="0s"
//                   >
//                     <div className="premium-products-image relative">
//                       <figure className="image-anime block overflow-hidden rounded-2xl relative">
//                         <img
//                           src="/images/premium-products-image-1.jpg"
//                           alt="Leak-Proof Seal"
//                           className="w-full aspect-[1/1.01] object-cover transition-transform duration-300"
//                         />
//                         <span className="pointer-events-none absolute inset-0 z-1 bg-linear-to-b from-transparent via-transparent to-[rgba(10,44,15,0.9)]" />
//                       </figure>
//                     </div>
//                     <div className="premium-products-item-content absolute right-5 bottom-5 left-5 z-[2] text-center">
//                       <h3 className="text-[20px] capitalize text-(--white-color)">
//                         <a href="#" className="text-inherit">
//                           Leak-Proof Seal
//                         </a>
//                       </h3>
//                     </div>
//                   </div>

//                   {/* Item 2 */}
//                   <div
//                     className="premium-products-item wow fadeInUp relative w-full md:w-[calc(33.33%-20px)]"
//                     data-wow-delay="0.2s"
//                   >
//                     <div className="premium-products-image relative">
//                       <figure className="image-anime block overflow-hidden rounded-2xl relative">
//                         <img
//                           src="/images/premium-products-image-2.jpg"
//                           alt="Leak-Proof Seal"
//                           className="w-full aspect-[1/1.01] object-cover transition-transform duration-300"
//                         />
//                         <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[rgba(10,44,15,0.9)]" />
//                       </figure>
//                     </div>
//                     <div className="premium-products-item-content absolute right-5 bottom-5 left-5 z-[2] text-center">
//                       <h3 className="text-[20px] capitalize text-[var(--white-color)]">
//                         <a href="#" className="text-inherit">
//                           Leak-Proof Seal
//                         </a>
//                       </h3>
//                     </div>
//                   </div>

//                   {/* Item 3 */}
//                   <div
//                     className="premium-products-item wow fadeInUp relative w-full md:w-[calc(33.33%-20px)]"
//                     data-wow-delay="0.4s"
//                   >
//                     <div className="premium-products-image relative">
//                       <figure className="image-anime block overflow-hidden rounded-2xl relative">
//                         <img
//                           src="/images/premium-products-image-3.jpg"
//                           alt="Durable Glass"
//                           className="w-full aspect-[1/1.01] object-cover transition-transform duration-300"
//                         />
//                         <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[rgba(10,44,15,0.9)]" />
//                       </figure>
//                     </div>
//                     <div className="premium-products-item-content absolute right-5 bottom-5 left-5 z-[2] text-center">
//                       <h3 className="text-[20px] capitalize text-[var(--white-color)]">
//                         <a href="#" className="text-inherit">
//                           Durable Glass
//                         </a>
//                       </h3>
//                     </div>
//                   </div>
//                 </div>
//               </FaderInAnimation>
//             </div>
//           </div>

//           {/* RIGHT: Video */}
//           <div className="w-full lg:w-5/12">
//             <RevealInAnimation direction="left" duration={1} >
//               <div className="products-intro-video relative mt-8 lg:mt-0 lg:ml-8">
//                 <div className="products-intro-image relative overflow-hidden rounded-2xl">
//                   <figure className="image-anime reveal block relative">
//                     <img
//                       src="/images/products-intro-image.jpg"
//                       alt="Products Intro"
//                       className="w-full aspect-[1/1.455] object-cover"
//                     />
//                     <span className="pointer-events-none absolute inset-0 z-1 bg-(--primary-color)/30" />
//                   </figure>
//                 </div>

//                 {/* Play button */}
//                 <div className="video-play-button absolute left-1/2 top-1/2 z-2 -translate-x-1/2 -translate-y-1/2">
//                   <a
//                     href="https://www.youtube.com/watch?v=Y-x0efG1seA"
//                     className="popup-video"
//                     data-cursor-text="Play"
//                   >
//                     <i className="fa-solid fa-play" />
//                   </a>
//                 </div>
//               </div>
//             </RevealInAnimation>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// =====================
//    NEW CODE
// =====================

import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Image from "next/image";
import Link from "next/link";

export default function PremiumProducts() {
  return (
    <section
      className="premium-products bg-(--white-color) bg-no-repeat bg-bottom-left py-0 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-stretch">

          {/* LEFT: Content */}
          <div className="w-full lg:w-7/12 py-20 lg:py-24">
            <div className="premium-products-content">

              {/* Section Title */}
              <div className="section-title mb-6 pl-4">
                <h3 className="text-sm font-semibold capitalize tracking-[0.2em] text-(--primary-color) mb-4">
                  Prolixus Qualität
                </h3>

                <RevealInAnimation direction="left" duration={1}>
                  <h2 className="text-2xl sm:text-3xl lg:text-5xl font-default font-bold leading-tight text-(--primary-color)">
                    Hochwertige Rezeptur{" "}
                    <span className="block font-thin font-accent italic">
                      für nachhaltige Vitalität
                    </span>
                  </h2>
                </RevealInAnimation>
              </div>

              {/* Body: text + list */}
              <div className="premium-products-body pl-4 flex flex-wrap items-center gap-6 border-b border-(--divider-color) pb-12 mb-12">

                <div className="w-full md:w-[calc(50%-15px)]">
                  <FaderInAnimation direction="up">
                    <p className="mb-6 text-sm sm:text-base">
                      Prolixus kombiniert Vitamin C, Eisen, Calcium und Magnesium
                      in einer ausgewogenen Zusammensetzung zur täglichen
                      Unterstützung Ihres Körpers.
                    </p>

                    <a
                      href="/products"
                      className="btn-default inline-flex rounded-full bg-(--accent-color) px-6 py-2 text-sm font-semibold text-(--white-color)"
                    >
                      Mehr erfahren
                    </a>
                  </FaderInAnimation>
                </div>

                <div className="w-full md:w-[calc(50%-15px)]">
                  <FaderInAnimation direction="up">
                    <ul className="space-y-3">
                      <li className="relative pl-8 text-sm sm:text-base">
                        <span className="absolute left-0 top-[0.35em] h-[0.6em] w-[0.6em] rounded-full bg-(--accent-color)"></span>
                        Unterstützt den normalen Energiestoffwechsel
                      </li>

                      <li className="relative pl-8 text-sm sm:text-base">
                        <span className="absolute left-0 top-[0.35em] h-[0.6em] w-[0.6em] rounded-full bg-(--accent-color)"></span>
                        Trägt zur Verringerung von Müdigkeit bei
                      </li>

                      <li className="relative pl-8 text-sm sm:text-base">
                        <span className="absolute left-0 top-[0.35em] h-[0.6em] w-[0.6em] rounded-full bg-(--accent-color)"></span>
                        Vegan, glutenfrei und ohne Zusatzstoffe
                      </li>
                    </ul>
                  </FaderInAnimation>
                </div>
              </div>

              {/* Feature Cards */}
              <FaderInAnimation direction="up">
                <div className="premium-products-item-box flex flex-wrap gap-6">

                  {/* Card 1 */}
                  <div className="premium-products-item relative w-full md:w-[calc(33.33%-20px)]">
                    <div className="premium-products-image relative">
                      <figure className="block overflow-hidden rounded-2xl relative">
                        <Link href="/blog" className="block w-full h-full group relative">
                          <Image
                            src="/images/new/Purchase-Now.webp"
                            alt="Essenzielle Nährstoffe"
                            width={800}
                            height={800}
                            className="w-full aspect-[1/1.01]"
                          />
                          <span className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[rgba(10,44,15,0.9)] pointer-events-none" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                            <span className="text-white font-bold text-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              Read more &rarr;
                            </span>
                          </div>
                        </Link>
                      </figure>
                    </div>
                    <div className="absolute right-5 bottom-5 left-5 text-center">
                      <h3 className="text-[20px] text-(--white-color)">
                        Essenzielle Nährstoffe
                      </h3>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="premium-products-item relative w-full md:w-[calc(33.33%-20px)]">
                    <div className="premium-products-image relative">
                      <figure className="block overflow-hidden rounded-2xl relative">
                        <Image
                          src="/images/new/prolixus-absorb.jpeg"
                          alt="Optimale Aufnahme"
                          width={800}
                          height={800}
                          className="w-full aspect-[1/1.01] object-cover"
                        />
                        <span className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[rgba(10,44,15,0.9)]" />
                      </figure>
                    </div>
                    <div className="absolute right-5 bottom-5 left-5 text-center">
                      <h3 className="text-[20px] text-(--white-color)">
                        Optimale Aufnahme
                      </h3>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="premium-products-item relative w-full md:w-[calc(33.33%-20px)]">
                    <div className="premium-products-image relative">
                      <figure className="block overflow-hidden rounded-2xl relative">
                        <Link href="/blog" className="block w-full h-full group relative">
                          <Image
                            src="/images/new/prolixus-uv.jpeg"
                            alt="Geprüfte Qualität"
                            width={800}
                            height={800}
                            className="w-full aspect-[1/1.01] object-cover"
                          />
                          <span className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[rgba(10,44,15,0.9)] pointer-events-none" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                            <span className="text-white font-bold text-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              Read more &rarr;
                            </span>
                          </div>
                        </Link>
                      </figure>
                    </div>
                    <div className="absolute right-5 bottom-5 left-5 text-center">
                      <h3 className="text-[20px] text-(--white-color)">
                        Geprüfte Qualität
                      </h3>
                    </div>
                  </div>

                </div>
              </FaderInAnimation>

            </div>
          </div>

          {/* RIGHT: Video */}
          <div className="w-full lg:w-5/12 h-full">
            <RevealInAnimation direction="left" duration={1} className="h-full">
              <div className="products-intro-video relative h-full">
                <div className="products-intro-image relative overflow-hidden h-full">
                  <figure className="block relative h-full">
                    <Link href="/blog" className="block w-full h-full group relative">
                      <Image
                        src="/images/new/prolixus-steps.jpeg"
                        alt="Prolixus Anwendung"
                        width={800}
                        height={800}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute inset-0 bg-(--primary-color)/30 pointer-events-none" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                        <span className="text-white font-bold text-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          Read more &rarr;
                        </span>
                      </div>
                    </Link>
                  </figure>
                </div>

                {/* Play button */}
                <div className="video-play-button absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <a
                    href="https://www.youtube.com/watch?v=Y-x0efG1seA"
                    className="popup-video"
                  >
                    <i className="fa-solid fa-play" />
                  </a>
                </div>

              </div>
            </RevealInAnimation>
          </div>

        </div>
      </div>
    </section>
  );
}
