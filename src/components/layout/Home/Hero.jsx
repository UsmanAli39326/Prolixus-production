// import Image from "next/image";
// import Link from "next/link";
// import FadeInAnimation from "@/Hooks/FaderInAnimation";
// import { FaPhone } from "react-icons/fa";
// import RevealInAniation from "@/Hooks/RevealInAnimation";
// import Button from "@/components/ui/Button";

// export default function Hero() {
//   return (
//     <section
//       className="relative overflow-hidden bg-cover bg-center pb-20 lg:pt-[220px] lg:pb-[110px] bg--secondary-color"
//       style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg--primary-color/80" />

//       <div className="relative z-2 container mx-auto px-4">
//         <div className="grid items-center gap-10 lg:grid-cols-2">
//           {/* Left: Content */}
//           <div>
//             <div className="hero-content text--white-color">
//               {/* Section Title */}
//               <div className="section-title space-y-4">
//                 <FadeInAnimation direction="up">
//                   <h3 className="text font-accent italic flex tracking-wide capitalize text-white align-middle items-center gap-2">
//                     <span className="w-2 h-2 rounded-2xl bg-accent"></span>
//                     Discover the power of premium
//                   </h3>
//                 </FadeInAnimation>

//                 <RevealInAniation delay={0.2} coverColor="#000">
//                   <h1 className="text-3xl sm:text-4xl lg:text-5xl font-default font-bold leading-tight text-white">
//                     Pure drops perfect precision{" "}
//                     <span className="font-light text--accent-color font-accent italic">
//                       care you can trust.
//                     </span>
//                   </h1>
//                 </RevealInAniation>

//               </div>

//               {/* Content Body */}
//               <FadeInAnimation direction="up">

//                 <div className="hero-content-body mt-8 flex flex-wrap items-center gap-6 lg:gap-10">
//                   <p className="max-w-xl text-sm sm:text-base text-white/90">
//                     Experience the perfect balance of purity and precision with
//                     our premium oil droppers Designed for effortless application,
//                     our high-quality droppers ensure accurate dispensing, minimal
//                     waste, and maximum potency.
//                   </p>
//                   {/* Button */}
//                   <div className="hero-btn">
//                     <Link href="/contact">
//                       <Button
//                         variant="accent"
//                         size="lg"
//                         className="!rounded-full shadow-md transition-transform duration-200 hover:translate-y-0.5 hover:shadow-lg"
//                       >
//                         Purchase Now
//                       </Button>
//                     </Link>
//                   </div>

//                   {/* Contact Now Box */}
//                   <Link
//                     href="tel:+91123468963"
//                     className="contact-now-box inline-flex items-center text-left group"
//                   >
//                     <div className="icon-box mr-4 flex h-12 w-12 items-center justify-center rounded-full bg--accent-color transition-all duration-300 group-hover:bg--accent-color/90">
//                       <i className="fa-solid fa-phone text-2xl text--white-color" />
//                     </div>

//                     <div className="contact-now-box-content flex ">
//                       <span className="bg-accent rounded-4xl w-12 h-12 text-white flex justify-center align-middle items-center mr-4 transition-colors duration-300 group-hover:bg--white-color group-hover:text--accent-color text-2xl">
//                         <FaPhone />
//                       </span>
//                       <div>
//                         <h3 className="text-[20px] font-semibold text--white-color mb-0.5 font-default">
//                           Call Us
//                         </h3>
//                         <p className="m-0 text--white-color">
//                           <span className="transition-colors duration-300 group-hover:text--accent-color font-default">
//                             +91 - 123 468 963
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               </FadeInAnimation>
//             </div>
//           </div>

//           {/* Right: Image */}
//           <div>
//             <div className="hero-image relative mx-6 lg:mx-14">
//               <figure className="block">
//                 <Image
//                   src="/images/hero-image.png"
//                   alt="Premium oil dropper"
//                   width={600}
//                   height={800}
//                   className="h-auto w-full object-cover aspect-[1/1.357]"
//                   priority
//                 />
//               </figure>

//               {/* Premium Quality Circle */}
//               <div className="premium-quality-circle absolute top-0 left-0">
//                 <Image
//                   src="/images/premium-quality-circle-1.png"
//                   alt="Premium quality seal"
//                   width={140}
//                   height={140}
//                   className="w-full max-w-[140px] animate-spin-slowly"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FadeInAnimation from "@/Hooks/FaderInAnimation";
import { FaPhone } from "react-icons/fa";
import RevealInAniation from "@/Hooks/RevealInAnimation";
import Button from "@/components/ui/Button";

export default function Hero({ data = {} }) {
  return (
    <section
      className="relative min-h-screen lg:h-screen flex flex-col lg:items-center lg:justify-center overflow-hidden bg-cover bg-center pt-8 pb-12 sm:pt-12 sm:pb-10 lg:pt-0 lg:pb-0 bg--secondary-color"
    >
      {/* Background Image Desktop */}
      <Image
        src="/images/new/main slider copy2.jpg.jpeg"
        alt="Hero Background Desktop"
        fill
        className="hidden md:block absolute inset-0 w-full h-full bg-fixed object-cover z-0"
        priority
      />
      
      {/* Background Image Mobile */}
      <Image
        src="/images/new/main hero banner mobile view copy.webp"
        alt="Hero Background Mobile"
        fill
        className="block md:hidden absolute inset-0 w-full h-full bg-fixed object-cover z-0"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-r from-(--primary-color)/85 via-(--primary-color)/60 to-transparent z-1" />

      <div className="relative z-2 container mx-auto px-4 w-full">
        <div className="grid items-center gap-10 lg:grid-cols-2">

          {/* Left: Content */}
          <div>
            <div className="hero-content text--white-color">

              <FadeInAnimation direction="up">
                <div className="mb-4 sm:mb-6">
                  <Image
                    src="/images/new/Apotheken.webp"
                    width={180}
                    height={90}
                    alt="Apotheken"
                    className="w-auto h-14 sm:h-18 lg:h-22 object-contain"
                  />
                </div>
              </FadeInAnimation>

              <FadeInAnimation direction="up">
                <h3 className="text-base sm:text-lg lg:text-xl font-accent italic tracking-wide text-white/90">
                  {data?.subtitle}
                </h3>
              </FadeInAnimation>

              <RevealInAniation delay={0.2} coverColor="#000">
                <h1 className="flex flex-col gap-1 sm:gap-2 leading-tight mt-4">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-accent italic text-accent drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                    {data?.title_line1}
                  </span>
                  <span className="text-2xl sm:text-4xl lg:text-5xl font-default text-white drop-shadow-md">
                    {data?.title_line2}
                  </span>
                  <span className="text-2xl sm:text-4xl lg:text-5xl font-accent italic text-accent drop-shadow-md">
                    {data?.title_line3}
                  </span>
                </h1>
              </RevealInAniation>

              <FadeInAnimation direction="up">
                <div className="hero-content-body mt-6 sm:mt-8 space-y-6">

                  <p className="max-w-xl text-sm sm:text-base text-white/90">
                    {data?.description}
                  </p>

                  {/* CTA row — stacks on mobile, side-by-side on desktop */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                    <Link href="/products">
                      <Button
                        variant="accent"
                        size="lg"
                        className="rounded-full! shadow-md transition-transform duration-200 hover:translate-y-0.5 hover:shadow-lg w-full sm:w-auto"
                      >
                        {data?.button_text}
                      </Button>
                    </Link>

                    <Link
                      href={`tel:${data?.phone_number}`}
                      className="inline-flex items-center text-left group"
                    >
                      <span className="bg-(--accent-color) rounded-full w-10 h-10 sm:w-12 sm:h-12 text-white flex justify-center items-center mr-3 sm:mr-4 shrink-0 transition-colors duration-300 group-hover:bg-white group-hover:text-(--accent-color) text-lg sm:text-2xl">
                        <FaPhone />
                      </span>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-0.5 font-default leading-tight">
                          {data?.phone_label}
                        </h3>
                        <p className="m-0 text-xs sm:text-sm text-white/70 font-default">
                          {data?.phone_sublabel}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </FadeInAnimation>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
