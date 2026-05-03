// "use client";

// import FaderInAnimation from "@/Hooks/FaderInAnimation";
// import RevealInAnimation from "@/Hooks/RevealInAnimation";
// import { useState } from "react";

// const faqs = [
//   {
//     question: "What is an oil dropper used for?",
//     answer:
//       "Oil droppers are used to measure and dispense small amounts of liquid accurately. Perfect for essential oils or lab liquids.",
//   },
//   {
//     question: "Are your dropper bottles leak-proof?",
//     answer:  
//       "Yes, our dropper bottles are designed with secure, leak-proof seals to prevent spills and maintain product integrity.",
//   },
//   {
//     question: "How do I clean my oil dropper bottle?",
//     answer:
//       "Clean your dropper bottle with warm water and mild soap. Rinse thoroughly and allow it to dry completely before reuse.",
//   },
//   {
//     question: "Do you offer bulk or wholesale options?",
//     answer:
//       "Yes, we offer bulk and wholesale options. Please contact our sales team for custom orders.",
//   },
// ];

// function Chevron({ open }) {
//   return (
//     <svg
//       className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180 text-white" : "rotate-0 text-[#1C2B1E]"
//         }`}
//       viewBox="0 0 24 24"
//       fill="none"
//       aria-hidden="true"
//     >
//       <path
//         d="M6 9l6 6 6-6"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// export default function OurFaqs() {
//   const [openIndex, setOpenIndex] = useState(1);

//   const toggleAccordion = (index) => {
//     setOpenIndex((prev) => (prev === index ? null : index));
//   };

//   return (
//     <section className="bg-[#F6F1EA] py-20 sm:py-24 w-full">
//       <div className="mx-auto px-4">
//         <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
//           {/* Left visual */}
//           <div className="w-full lg:w-1/2">
//             <div className="relative overflow-hidden rounded-[28px] bg-primary shadow-sm">
//               {/* Use your actual image here (or keep a solid block like the screenshot) */}
//               <img
//                 src="/images/faq-image.jpg"
//                 alt="FAQ"
//                 className="h-full w-full object-cover " // set to opacity-0 if you want the solid green block look
//               />

//               {/* CTA badge */}
//               <div className="absolute bottom-6 right-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
//                 <span className="grid h-10 w-10 place-items-center rounded-xl bg-(--primary-color)/15">
//                   <svg
//                     width="18"
//                     height="18"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     aria-hidden="true"
//                     className="text-[#C89A2B]"
//                   >
//                     <path
//                       d="M12 17h.01"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                     />
//                     <path
//                       d="M9.09 9a3 3 0 1 1 5.82 1c-.8 1.2-1.91 1.6-2.41 2.5-.22.4-.32.84-.32 1.5"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </span>
//                 <div className="leading-tight">
//                   <div className="font-semibold text-primary">Answers You</div>
//                   <div className="font-semibold text-primary">Need !</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right FAQ */}
//           <div className="w-full lg:w-1/2">
//             <RevealInAnimation >
//               <div className="mb-6">
//                 <div className="mb-3 flex items-center gap-3">
//                   <span className="h-2 w-2 rounded-full bg-(--accent-color)" />
//                   <p className="text-sm font-semibold text-primary">FAQ&apos;s</p>
//                 </div>

//                 <h2 className="text-4xl font-semibold font-default tracking-tight text-primary sm:text-5xl">
//                   Your questions,{" "}
//                   <span className="block font-serif font-light italic text-[#17301F]">
//                     our expert <br className="hidden sm:block" />
//                     answers
//                   </span>
//                 </h2>
//               </div>
//             </RevealInAnimation>

//             <div className="flex flex-col gap-4">
//               {faqs.map((faq, index) => {
//                 const open = openIndex === index;

//                 return (
//                   <div
//                     key={index}
//                     className={`overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)]`}
//                   >
//                     <FaderInAnimation direction="up" key={index} delay={`${index * 0.1}s`}>
//                       <button
//                         type="button"
//                         onClick={() => toggleAccordion(index)}
//                         className={`flex w-full items-center justify-between px-6 py-5 text-left transition-colors ${open
//                           ? "bg-[#C89A2B] text-white"
//                           : "bg-white text-primary"
//                           }`}
//                         aria-expanded={open}
//                       >
//                         <span className="text-base font-semibold">
//                           {faq.question}
//                         </span>
//                         <Chevron open={open} />
//                       </button>

//                       <div
//                         className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
//                           } ${open ? "bg-[#C89A2B]" : "bg-white"}`}
//                       >
//                         <div className="overflow-hidden">
//                           <p
//                             className={`px-6 pb-6 text-sm leading-relaxed ${open ? "text-white/90" : "text-[#4A5A4E]"
//                               }`}
//                           >
//                             {faq.answer}
//                           </p>
//                         </div>
//                       </div>
//                     </FaderInAnimation>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// =====================
//    NEW CODE
// =====================

"use client";

import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import Image from "next/image";
import { useState } from "react";

const faqs = [
  {
    question: "Was ist Prolixus?",
    answer:
      "Prolixus ist ein Nahrungsergänzungsmittel mit einer ausgewogenen Kombination aus Vitamin C, Eisen, Calcium und Magnesium zur täglichen Unterstützung Ihres Energiestoffwechsels.",
  },
  {
    question: "Wie wird Prolixus eingenommen?",
    answer:
      "Die empfohlene Einnahme beträgt drei Portionen täglich. Bitte beachten Sie die Angaben auf der Verpackung und überschreiten Sie die empfohlene Tagesdosis nicht.",
  },
  {
    question: "Ist Prolixus für jeden geeignet?",
    answer:
      "Prolixus ist vegan, glutenfrei sowie frei von Farb-, Aroma- und Konservierungsstoffen. Bei bestehenden Erkrankungen oder während der Schwangerschaft empfehlen wir Rücksprache mit Ihrem Arzt.",
  },
  {
    question: "Ist Prolixus in Apotheken erhältlich?",
    answer:
      "Ja, Prolixus ist in Apotheken gelistet (PZN: 17879717). Weitere Informationen erhalten Sie bei Ihrer Apotheke.",
  },
];


function Chevron({ open }) {
  return (
    <svg
      className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180 text-white" : "rotate-0 text-[#1C2B1E]"
        }`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function OurFaqs() {
  const [openIndex, setOpenIndex] = useState(1);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-(--secondary-color) py-20 sm:py-24 w-full">
      <div className="mx-auto px-4">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          {/* Left visual */}
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-[28px] bg-(--primary-color) shadow-sm">
              {/* Use your actual image here (or keep a solid block like the screenshot) */}
              <Image
                src="/images/new/prolixus-hero-banner.jpeg"
                alt="FAQ"
                width={800}
                height={800}
                className="h-full w-full object-cover"
              />

              <div className="absolute bottom-6 right-6 flex items-center gap-3 rounded-2xl bg-(--white-color) px-4 py-3 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-(--accent-color)/15">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="text-(--accent-color)"
                  >
                    <path
                      d="M12 17h.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.09 9a3 3 0 1 1 5.82 1c-.8 1.2-1.91 1.6-2.41 2.5-.22.4-.32.84-.32 1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="leading-tight">
                  <div className="font-semibold text-(--primary-color)">Häufige</div>
                  <div className="font-semibold text-(--primary-color)">Fragen</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right FAQ */}
          <div className="w-full lg:w-1/2">
            <RevealInAnimation >
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-(--accent-color)" />
                  <p className="text-sm font-semibold text-(--primary-color)">FAQ&apos;s</p>
                </div>

                <h2 className="text-4xl font-semibold font-default tracking-tight text-(--primary-color) sm:text-5xl">
                  Ihre Fragen,{" "}
                  <span className="block font-accent font-light italic text-(--primary-color)/80 shadow-[0_0_15px_rgba(0,194,255,0.2)]">
                    unsere kompetenten <br className="hidden sm:block" />
                    Antworten
                  </span>
                </h2>
              </div>
            </RevealInAnimation>

            <div className="flex flex-col gap-4">
              {faqs.map((faq, index) => {
                const open = openIndex === index;

                return (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)]`}
                  >
                    <FaderInAnimation direction="up" key={index} delay={`${index * 0.1}s`}>
                      <button
                        type="button"
                        onClick={() => toggleAccordion(index)}
                        className={`flex w-full items-center justify-between px-6 py-5 text-left transition-colors ${open
                          ? "bg-(--accent-color) text-(--white-color)"
                          : "bg-(--white-color) text-(--primary-color)"
                          }`}
                        aria-expanded={open}
                      >
                        <span className="text-base font-semibold">
                          {faq.question}
                        </span>
                        <Chevron open={open} />
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          } ${open ? "bg-(--accent-color)" : "bg-(--white-color)"}`}
                      >
                        <div className="overflow-hidden">
                          <p
                            className={`px-6 pb-6 text-sm leading-relaxed ${open ? "text-(--white-color)/90" : "text-(--text-color)/80"
                              }`}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </FaderInAnimation>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}