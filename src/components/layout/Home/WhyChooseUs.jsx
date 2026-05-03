// import FaderInAnimation from "@/Hooks/FaderInAnimation";
// import RevealInAnimation from "@/Hooks/RevealInAnimation";

// export default function WhyChooseUs() {
//   return (
//     <section
//       className="why-choose-us bg-(--white-color) bg-no-repeat bg-bottom-left"
//       style={{ backgroundImage: "url(/images/section-bg-shape-1.png)" }}
//     >
//       <div className="container-fluid px-0">
//         <div className="row no-gutters">
//           <div className="col-lg-12">
//             {/* Why Choose Box */}
//             <div className="why-choose-box flex flex-wrap pl-0 lg:pl-[max((100vw-1300px)/2,1rem)]">
//               {/* Content */}
//               <div className="why-choose-content w-full lg:w-[52%] flex items-center py-16 lg:py-24 pr-0 lg:pr-[200px] px-4 lg:px-0">
//                 <div className="w-full">
//                   {/* Section Title */}
//                   <div className="section-title mb-8">
//                     <FaderInAnimation direction="up">
//                       <h3 className="text-sm font-semibold capitalize  text-primary font-accent italic mb-4">
//                         why choose us
//                       </h3>
//                     </FaderInAnimation>
//                     <RevealInAnimation direction="right" >
//                       <h2
//                         className="text-anime-style-2 text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-primary font-default"
//                         data-cursor="-opaque"
//                       >
//                         Precision drops, <div>
//                           premium{" "}
//                           <span className="font-thin font-accent text--accent-color italic">
//                             quality, care you trust
//                           </span>
//                         </div>
//                       </h2>
//                     </RevealInAnimation>


//                     {/* Intro Paragraph */}
//                     <FaderInAnimation direction="up" delay={0.2}>

//                       <div className="why-choose-intro mt-6">
//                         <p
//                           className="wow fadeInUp mt-4 text-sm sm:text-base text--body-color,rgba(15,23,42,0.75)"
//                           data-wow-delay="0.2s"
//                         >
//                           Our oil dropper bottles are designed for precision,
//                           ensuring controlled application with minimal waste. Made
//                           from high-quality, durable materials.
//                         </p>
//                       </div>
//                     </FaderInAnimation>
//                   </div>

//                   {/* Why Choose Items */}
//                   <FaderInAnimation direction="up" delay={0.4}>
//                     <div className="flex flex-wrap gap-6">
//                       {/* Item 1 */}
//                       <div className="why-choose-item w-full sm:w-[calc(50%-12px)]">
//                         <div className="icon-box relative mb-6 flex h-15 w-15 items-center justify-center rounded-full bg-(--accent-color)">
//                           <span className="absolute inset-0 rounded-full bg--primary-color scale-0 transition-transform duration-300 group-hover:scale-100" />
//                           <img
//                             src="/images/icon-why-choose-1.svg"
//                             alt="Premium Quality"
//                             className="relative z-10 max-w-[35px]"
//                           />
//                         </div>
//                         <div className="why-choose-item-content font-default">
//                           <h3 className="text-lg font-semibold text-primary mb-2">
//                             Premium Quality
//                           </h3>
//                           <p className="m-0 text-sm text-[rgba(15,23,42,0.75)]">
//                             Carefully sourced, 100%, rigorously tested for excellence.
//                           </p>
//                         </div>
//                       </div>

//                       {/* Item 2 */}
//                       <div className="why-choose-item w-full sm:w-[calc(50%-12px)]">
//                         <div className="icon-box relative mb-6 flex h-15 w-15 items-center justify-center rounded-full bg-(--accent-color)">
//                           <span className="absolute inset-0 rounded-full bg--primary-color scale-0 transition-transform duration-300 group-hover:scale-100" />
//                           <img
//                             src="/images/icon-why-choose-2.svg"
//                             alt="Fast & Reliable Shipping"
//                             className="relative z-10 max-w-[35px]"
//                           />
//                         </div>
//                         <div className="why-choose-item-content">
//                           <h3 className="text-lg font-semibold text-primary mb-2 font-default">
//                             Fast &amp; Reliable Shipping
//                           </h3>
//                           <p className="m-0 font-default text-sm text-[rgba(15,23,42,0.75)] ">
//                             Carefully sourced, 100%, rigorously tested for excellence.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </FaderInAnimation>

//                   {/* Why Choose Body */}
//                   <FaderInAnimation direction="up" delay={0.6}>
//                   <div className="why-choose-body mt-8 flex items-center rounded-2xl bg--secondary-color p-6 lg:p-8 bg-(--secondary-color)">
//                     <div className="icon-box mr-8">
//                       <img
//                         src="/images/premium-quality-circle-3.png"
//                         alt="Premium"
//                         className="max-w-[120px] w-full rounded-full animate-spin-slowly"
//                       />
//                     </div>
//                     <div
//                       className="why-choose-body-content wow fadeInUp w-[calc(100%-160px)] text-sm sm:text-base text--white-color"
//                       data-wow-delay="0.6s"
//                     >
//                       <p className="m-0">
//                         With a commitment to sustainability and customer
//                         satisfaction, we provide reliable, stylish, and
//                         eco-friendly solutions you can trust. Experience the
//                         balance of function and care—one drop at a time.
//                       </p>
//                     </div>
//                   </div>
//                   </FaderInAnimation>
//                 </div>
//               </div>

//               {/* Images */}
//               <div className="why-choose-images w-full lg:w-[48%] relative">
//                 <div className="why-choose-img h-full">
//                   <figure className="h-full">
//                     <img
//                       src="/images/why-choose-image.jpg"
//                       alt="Why choose us"
//                       className="w-full h-full object-cover aspect-[1/1.12]"
//                     />
//                   </figure>
//                 </div>
//                 <div className="why-choose-product-image absolute bottom-0 left-0 -translate-x-1/2 w-full max-w-[220px]">
//                   <img
//                     src="/images/why-choose-product-image.png"
//                     alt="Product"
//                     className="w-full h-auto object-contain"
//                   />
//                 </div>
//               </div>
//               {/* End Images */}
//             </div>
//           </div>
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

export default function WhyChooseUs() {
  return (
    <section
      className="why-choose-us bg-(--white-color) bg-no-repeat bg-bottom-left overflow-hidden"
      style={{ backgroundImage: "url(/images/section-bg-shape-1.png)" }}
    >
      <div className="container-fluid px-0">
        <div className="why-choose-box flex flex-wrap pl-0 lg:pl-[max((100vw-1300px)/2,1rem)]">

          {/* LEFT CONTENT */}
          <div className="why-choose-content w-full lg:w-[52%] flex items-center py-16 lg:py-24 pr-0 lg:pr-[200px] px-4 lg:px-0">
            <div className="w-full">

              {/* Title */}
              <div className="section-title mb-8">
                <FaderInAnimation direction="up">
                  <h3 className="text-sm font-semibold capitalize text-primary font-accent italic mb-4">
                    Warum Prolixus?
                  </h3>
                </FaderInAnimation>

                <RevealInAnimation direction="right">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-(--primary-color) font-default">
                    Hochwertige Inhaltsstoffe{" "}
                    <span className="font-thin font-accent text-(--accent-color) italic">
                      für Ihre Vitalität
                    </span>
                  </h2>
                </RevealInAnimation>

                <FaderInAnimation direction="up" delay={0.2}>
                  <p className="mt-6 text-sm sm:text-base text-(--primary-color)/75">
                    Prolixus kombiniert essenzielle Mineralstoffe und Vitamine
                    in einer durchdachten Rezeptur zur Unterstützung Ihres
                    Energiestoffwechsels.
                  </p>
                </FaderInAnimation>
              </div>

              {/* Feature Items */}
              <FaderInAnimation direction="up" delay={0.4}>
                <div className="flex flex-wrap gap-6">

                  {/* Item 1 */}
                  <div className="why-choose-item w-full sm:w-[calc(50%-12px)]">
                    <div className="icon-box mb-6 flex h-15 w-15 items-center justify-center rounded-full bg-(--accent-color)">
                      <Image
                        src="/images/icon-why-choose-1.svg"
                        alt="Qualität"
                        width={64}
                        height={64}
                        className="max-w-[35px]"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-(--primary-color) mb-2">
                      Geprüfte Qualität
                    </h3>
                    <p className="text-sm text-(--primary-color)/75">
                      Sorgfältig ausgewählte Rohstoffe und strenge Qualitätskontrollen.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="why-choose-item w-full sm:w-[calc(50%-12px)]">
                    <div className="icon-box mb-6 flex h-15 w-15 items-center justify-center rounded-full bg-(--accent-color)">
                      <Image
                        src="/images/icon-why-choose-2.svg"
                        alt="Verträglichkeit"
                        width={64}
                        height={64}
                        className="max-w-[35px]"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-(--primary-color) mb-2">
                      Hohe Verträglichkeit
                    </h3>
                    <p className="text-sm text-(--primary-color)/75">
                      Vegan, glutenfrei und frei von unnötigen Zusatzstoffen.
                    </p>
                  </div>

                </div>
              </FaderInAnimation>

              {/* Trust Box FIXED */}
              <FaderInAnimation direction="up" delay={0.6}>
                <div className="mt-10 rounded-2xl bg-(--secondary-color) p-6 lg:p-8">
                  <p className="text-sm sm:text-base text-(--primary-color)">
                    Prolixus steht für Transparenz, Qualität und Verantwortung.
                    Unser Anspruch ist es, Ihnen ein Produkt zu bieten,
                    das Sie langfristig im Alltag begleitet.
                  </p>
                </div>
              </FaderInAnimation>

            </div>
          </div>

          {/* RIGHT IMAGE SIDE */}
          <div className="why-choose-images w-full lg:w-[48%] relative">

            {/* Main Image */}
            <div className="why-choose-img h-full">
              <Image
                src="/images/new/prolixus-absorb.jpeg"
                alt="Prolixus Produkt"
                width={800}
                height={800}
                className="w-full h-full object-cover aspect-[1/1.12]"
              />
            </div>

            {/* SMALL FLOATING IMAGE (Restored) */}
            <div className="why-choose-product-image absolute bottom-0 left-0 -translate-x-1/2 w-full max-w-[220px]">
              <Image
                src="/images/new/prolixus-hero-banner.jpeg"
                alt="Prolixus Produkt"
                width={800}
                height={800}
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
