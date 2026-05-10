// import FaderInAnimation from "@/Hooks/FaderInAnimation";

// export default function OurBenefits() {
//   return (
//     <section className="our-benefits py-24">
//       <div className="container mx-auto px-4">
//         {/* Top row */}
//         <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center">
//           {/* Left: Image */}
//           <div className="w-full lg:w-5/12">
//             <div className="benefit-image relative lg:mr-4">
//               <div className="bemefit-img">
//                 <figure>
//                   <img
//                     src="/images/benefit-img.png"
//                     alt="Benefits of oil"
//                     className="w-full aspect-[1/1.33] object-cover"
//                   />
//                 </figure>
//               </div>

//               <div className="benefit-quality-circle absolute right-0 top-0">
//                 <figure>
//                   <img
//                     src="/images/premium-quality-circle-2.png"
//                     alt="Premium quality"
//                     className="w-full max-w-[120px] animate-spin"
//                   />
//                 </figure>
//               </div>
//             </div>
//           </div>

//           {/* Right: Content */}
//           <div className="w-full lg:w-7/12">
//             <div className="benefit-content">
//               {/* Section Title */}
//               <div className="section-title mb-8">
//                 <h3 className="wow fadeInUp text-sm font-semibold tracking-[0.2em] text-(--primary-color)">
//                   Benefits of Oil
//                 </h3>
//                 <h2
//                   className="text-anime-style-2 font-default text-primary text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
//                   data-cursor="-opaque"
//                 >
//                   Unlock nature&apos;s power amazing{" "}
//                   <span className="block text-(--dark-color)  font-accent font-light italic">
//                     benefits of essential oils
//                   </span>
//                 </h2>
//               </div>

//               {/* Benefit Body */}
//               <div className="benefit-body">
//                 {/* Row 1 */}
//                 <FaderInAnimation direction="up" duration={0.4}>
//                 <div className="benefit-item-box flex flex-wrap items-center gap-6 mb-8">
//                   <div
//                     className="benefit-item wow p-4 fadeInUp w-full md:w-[calc(50%-15px)] bg-(--white-color) rounded-2xl"
//                     data-wow-delay="0s"
//                   >
//                     <div className="icon-box relative mb-7 flex h-15 w-15 items-center justify-center rounded-full bg-(--accent-color)">
//                       <span className="absolute inset-0 rounded-full bg-(--primary-color) scale-0 transition-transform duration-300" />
//                       <img
//                         src="/images/icon-benefit-1.svg"
//                         alt="natural healing & wellness"
//                         className="relative z-1 w-full max-w-[35px]"
//                       />
//                     </div>
//                     <div className="benefit-item-content">
//                       <h3 className="text-[20px] capitalize mb-2 font-default text-primary font-bold">
//                         natural healing &amp; wellness
//                       </h3>
//                       <p className="m-0 text-sm sm:text-base">
//                         Supports overall health, immunity, and promotes
//                         well-being.
//                       </p>
//                     </div>
//                   </div>

//                   <div
//                     className="benefit-item wow fadeInUp w-full md:w-[calc(50%-15px)]"
//                     data-wow-delay="0.2s"
//                   >
//                     <div className="icon-box relative mb-7 flex h-15 w-15 items-center justify-center rounded-full bg-(--accent-color)">
//                       <span className="absolute inset-0 rounded-full bg-(--primary-color) scale-0 transition-transform duration-300" />
//                       <img
//                         src="/images/icon-benefit-2.svg"
//                         alt="skin & beauty care"
//                         className="relative z-1 w-full max-w-[35px]"
//                       />
//                     </div>
//                     <div className="benefit-item-content">
//                       <h3 className="text-[20px] capitalize mb-2 font-default text-primary font-bold">
//                         skin &amp; beauty care
//                       </h3>
//                       <p className="m-0 text-sm sm:text-base">
//                         Supports overall health, immunity, and promotes
//                         well-being.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 </FaderInAnimation>
//                 {/* Row 2 */}
//                 <FaderInAnimation direction="up" duration={0.6}>
//                 <div className="benefit-item-box flex flex-wrap items-center gap-6">
//                   <div
//                     className="benefit-item wow fadeInUp w-full md:w-[calc(50%-15px)]"
//                     data-wow-delay="0.4s"
//                   >
//                     <div className="icon-box relative mb-7 flex h-15 w-15 items-center justify-center rounded-full bg-(--accent-color)">
//                       <span className="absolute inset-0 rounded-full bg-(--primary-color) scale-0 transition-transform duration-300" />
//                       <img
//                         src="/images/icon-benefit-3.svg"
//                         alt="home purification"
//                         className="relative z-1 w-full max-w-[35px]"
//                       />
//                     </div>
//                     <div className="benefit-item-content">
//                       <h3 className="text-[20px] capitalize mb-2 font-default text-primary font-bold">
//                         home purification
//                       </h3>
//                       <p className="m-0 text-sm sm:text-base">
//                         Supports overall health, immunity, and promotes
//                         well-being.
//                       </p>
//                     </div>
//                   </div>

//                   <div
//                     className="benefit-item wow p-4 fadeInUp w-full md:w-[calc(50%-15px)] bg-(--white-color) rounded-2xl"
//                     data-wow-delay="0.6s"
//                   >
//                     <div className="icon-box relative mb-7 flex h-15 w-15 items-center justify-center rounded-full bg-(--accent-color)">
//                       <span className="absolute inset-0 rounded-full bg-(--primary-color) scale-0 transition-transform duration-300" />
//                       <img
//                         src="/images/icon-benefit-4.svg"
//                         alt="non-toxic & eco-friendly"
//                         className="relative z-1 w-full max-w-[35px]"
//                       />
//                     </div>
//                     <div className="benefit-item-content">
//                       <h3 className="text-[20px] capitalize mb-2 font-default text-primary font-bold">
//                         non-toxic &amp; eco-friendly
//                       </h3>
//                       <p className="m-0 text-sm sm:text-base">
//                         Supports overall health, immunity, and promotes
//                         well-being.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 </FaderInAnimation>
//               </div>
//               {/* Benefit Body End */}
//             </div>
//           </div>
//         </div>

//         {/* Bottom stats / benefit list */}
//         <div className="mt-20">
//           <div className="benefits-list flex flex-wrap gap-y-8 gap-x-24 border-t border-(--divider-color) pt-20">
//             <div className="benefit-list-item wow fadeInUp flex items-center w-full md:w-[calc(33.33%-66.66px)]">
//               <div className="icon-box mr-5">
//                 <img
//                   src="/images/icon-benefit-list-1.svg"
//                   alt="active member"
//                   className="w-full max-w-[50px]"
//                 />
//               </div>
//               <div className="benefit-list-item-content w-[calc(100%-70px)]">
//                 <h3 className="text-[20px] capitalize mb-1">active member</h3>
//                 <p className="m-0 text-sm sm:text-base">
//                   Dedicated to sharing oil benefits.
//                 </p>
//               </div>
//             </div>

//             <div
//               className="benefit-list-item wow fadeInUp flex items-center w-full md:w-[calc(33.33%-66.66px)]"
//               data-wow-delay="0.2s"
//             >
//               <div className="icon-box mr-5">
//                 <img
//                   src="/images/icon-benefit-list-2.svg"
//                   alt="project complete"
//                   className="w-full max-w-[50px]"
//                 />
//               </div>
//               <div className="benefit-list-item-content w-[calc(100%-70px)]">
//                 <h3 className="text-[20px] capitalize mb-1">
//                   project complete
//                 </h3>
//                 <p className="m-0 text-sm sm:text-base">
//                   Successfully delivered quality oil.
//                 </p>
//               </div>
//             </div>

//             <div
//               className="benefit-list-item wow fadeInUp flex items-center w-full md:w-[calc(33.33%-66.66px)]"
//               data-wow-delay="0.4s"
//             >
//               <div className="icon-box mr-5">
//                 <img
//                   src="/images/icon-benefit-list-3.svg"
//                   alt="product reward"
//                   className="w-full max-w-[50px]"
//                 />
//               </div>
//               <div className="benefit-list-item-content w-[calc(100%-70px)]">
//                 <h3 className="text-[20px] capitalize mb-1">product reward</h3>
//                 <p className="m-0 text-sm sm:text-base">
//                   Earn rewards for oil purchases.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// ====================

import FaderInAnimation from "@/Hooks/FaderInAnimation";
import Image from "next/image";

export default function OurBenefits({ data = {} }) {
  return (
    <section className="our-benefits py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Top row */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-stretch">

          {/* Left: Image */}
          <div className="w-full lg:w-5/12">
            <div className="benefit-image relative lg:mr-4 h-full">
              <figure className="h-full">
                <Image
                  src="/images/new/Benefits copy 2.jpg"
                  alt="Prolixus Inhaltsstoffe"
                  width={800}
                  height={1000}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </figure>
              <div className="benefit-quality-circle absolute -right-2 -top-2 sm:-right-6 sm:-top-6 z-1 bg-(--accent-color) p-0 rounded-full shadow-lg border-4 border-white justify-center items-center flex overflow-hidden">
                <Image
                  src="/images/new/logo-2.gif"
                  alt="Prolixus Logo"
                  width={110}
                  height={110}
                  className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-7/12">
            <div className="benefit-content">

              {/* Section Title */}
              <div className="section-title mb-8">
                <h3 className="text-sm font-semibold tracking-[0.2em] text-(--primary-color)">
                  {data?.label}
                </h3>

                <h2 className="font-default text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-(--primary-color)">
                  {data?.title_main}{" "}
                  <span className="block text-(--accent-color) font-accent font-light italic">
                    {data?.title_accent}
                  </span>
                </h2>
              </div>

              {/* Benefit Body */}
              <div className="benefit-body">
                <FaderInAnimation direction="up">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* MSM */}
                    <div className="benefit-item sm:col-span-2 p-5 bg-(--white-color) rounded-2xl shadow-sm border border-(--divider-color) transition-all duration-300 hover:shadow-md">
                      <div className="icon-box mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--accent-color)">
                        <Image
                          src="/images/icon-about-organic.svg"
                          alt="MSM"
                          width={64}
                          height={64}
                          className="w-full max-w-[32px]"
                        />
                      </div>
                      <h3 className="text-xl mb-2 font-bold text-(--primary-color) font-default">
                        {data?.msm_title}
                      </h3>
                      <p className="text-sm sm:text-base text-(--primary-color)/80 leading-relaxed">
                        {data?.msm_desc}
                      </p>
                    </div>

                    {/* Calcium */}
                    <div className="benefit-item p-5 bg-(--white-color) rounded-2xl shadow-sm border border-(--divider-color) transition-all duration-300 hover:shadow-md">
                      <div className="icon-box mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--accent-color)">
                        <Image
                          src="/images/icon-benefit-1.svg"
                          alt="Calcium"
                          width={64}
                          height={64}
                          className="w-full max-w-[32px]"
                        />
                      </div>
                      <h3 className="text-xl mb-2 font-bold text-(--primary-color) font-default">
                        {data?.calcium_title}
                      </h3>
                      <p className="text-sm sm:text-base text-(--primary-color)/80 leading-relaxed">
                        {data?.calcium_desc}
                      </p>
                    </div>

                    {/* Magnesium */}
                    <div className="benefit-item p-5 bg-(--white-color) rounded-2xl shadow-sm border border-(--divider-color) transition-all duration-300 hover:shadow-md">
                      <div className="icon-box mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--accent-color)">
                        <Image
                          src="/images/icon-benefit-2.svg"
                          alt="Magnesium"
                          width={64}
                          height={64}
                          className="w-full max-w-[32px]"
                        />
                      </div>
                      <h3 className="text-xl mb-2 font-bold text-(--primary-color) font-default">
                        {data?.magnesium_title}
                      </h3>
                      <p className="text-sm sm:text-base text-(--primary-color)/80 leading-relaxed">
                        {data?.magnesium_desc}
                      </p>
                    </div>

                    {/* Eisen */}
                    <div className="benefit-item p-5 bg-(--white-color) rounded-2xl shadow-sm border border-(--divider-color) transition-all duration-300 hover:shadow-md">
                      <div className="icon-box mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--accent-color)">
                        <Image
                          src="/images/icon-benefit-3.svg"
                          alt="Eisen"
                          width={64}
                          height={64}
                          className="w-full max-w-[32px]"
                        />
                      </div>
                      <h3 className="text-xl mb-2 font-bold text-(--primary-color) font-default">
                        {data?.eisen_title}
                      </h3>
                      <p className="text-sm sm:text-base text-(--primary-color)/80 leading-relaxed">
                        {data?.eisen_desc}
                      </p>
                    </div>

                    {/* Vitamin C */}
                    <div className="benefit-item p-5 bg-(--white-color) rounded-2xl shadow-sm border border-(--divider-color) transition-all duration-300 hover:shadow-md">
                      <div className="icon-box mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-(--accent-color)">
                        <Image
                          src="/images/icon-benefit-4.svg"
                          alt="Vitamin C"
                          width={64}
                          height={64}
                          className="w-full max-w-[32px]"
                        />
                      </div>
                      <h3 className="text-xl mb-2 font-bold text-(--primary-color) font-default">
                        {data?.vitaminc_title}
                      </h3>
                      <p className="text-sm sm:text-base text-(--primary-color)/80 leading-relaxed">
                        {data?.vitaminc_desc}
                      </p>
                    </div>
                  </div>
                </FaderInAnimation>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats / trust row */}
        {/* <div className="mt-20">
          <div className="flex flex-wrap gap-y-8 gap-x-24 border-t border-(--divider-color) pt-20">

            {/* Item 1 */}
        {/* <div className="flex items-center w-full md:w-[calc(33.33%-66.66px)]">
              <div className="mr-5">
                <img
                  src="/images/icon-benefit-list-1.svg"
                  alt="Zufriedene Kunden"
                  className="w-full max-w-[50px]"
                />
              </div>
              <div>
                <h3 className="text-[20px] mb-1">Zufriedene Kunden</h3>
                <p className="text-sm sm:text-base">
                  Viele Kundinnen und Kunden vertrauen bereits auf Prolixus.
                </p>
              </div>
            </div> */}

        {/* Item 2 */}
        {/* <div className="flex items-center w-full md:w-[calc(33.33%-66.66px)]">
              <div className="mr-5">
                <img
                  src="/images/icon-benefit-list-2.svg"
                  alt="Apotheken gelistet"
                  className="w-full max-w-[50px]"
                />
              </div>
              <div>
                <h3 className="text-[20px] mb-1">
                  Apotheken gelistet
                </h3>
                <p className="text-sm sm:text-base">
                  Gelistet unter PZN: 17879717.
                </p>
              </div>
            </div> */}

        {/* Item 3 */}
        {/* <div className="flex items-center w-full md:w-[calc(33.33%-66.66px)]">
              <div className="mr-5">
                <img
                  src="/images/icon-benefit-list-3.svg"
                  alt="Höchste Qualität"
                  className="w-full max-w-[50px]"
                />
              </div>
              <div>
                <h3 className="text-[20px] mb-1">Geprüfte Qualität</h3>
                <p className="text-sm sm:text-base">
                  Hergestellt nach strengen Qualitäts- und Sicherheitsstandards.
                </p>
              </div>
            </div>

          </div>
        </div> */}

      </div>
    </section>
  );
}

