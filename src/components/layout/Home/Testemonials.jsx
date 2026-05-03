// "use client";

// import FaderInAnimation from "@/Hooks/FaderInAnimation";
// import RevealInAnimation from "@/Hooks/RevealInAnimation";
// import { useMemo, useRef, useState } from "react";

// const testimonials = [
//   {
//     name: "Michael Carter",
//     role: "Aromatherapist",
//     avatar: "/images/author-3.jpg",
//     text:
//       "These oil droppers are perfect for my essential oil blends! The precision and outstanding of Highly recommend many dropper bottles, but these are by far the best. No leaks, no waste—just pure convenience!",
//   },
//   {
//     name: "Jenny Wilson",
//     role: "Aromatherapist",
//     avatar: "/images/author-1.jpg",
//     text:
//       "These oil droppers are perfect for my essential oil blends! The precision and outstanding of Highly recommend many dropper bottles, but these are by far the best. No leaks, no waste—just pure convenience!",
//   },
//   {
//     name: "Sophia Reynolds",
//     role: "Herbalist",
//     avatar: "/images/author-2.jpg",
//     text:
//       "These oil droppers are perfect for my essential oil blends! The precision and outstanding of Highly recommend many dropper bottles, but these are by far the best. No leaks, no waste—just pure convenience!",
//   },
//   {
//     name: "Olivia Brooks",
//     role: "Wellness Coach",
//     avatar: "/images/author-4.jpg",
//     text:
//       "These oil droppers are perfect for my essential oil blends! The precision and outstanding of Highly recommend many dropper bottles, but these are by far the best. No leaks, no waste—just pure convenience!",
//   },
// ];

// function StarRow() {
//   return (
//     <div className="flex items-center gap-1">
//       {Array.from({ length: 5 }).map((_, i) => (
//         <svg
//           key={i}
//           viewBox="0 0 24 24"
//           className="h-4 w-4 text-(--accent-color)"
//           fill="currentColor"
//           aria-hidden="true"
//         >
//           <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//         </svg>
//       ))}
//     </div>
//   );
// }

// function ArrowBtn({ dir = "left", onClick }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/90 transition hover:bg-white/10"
//       aria-label={dir === "left" ? "Previous" : "Next"}
//     >
//       <svg
//         viewBox="0 0 24 24"
//         className="h-5 w-5"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         aria-hidden="true"
//       >
//         {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
//       </svg>
//     </button>
//   );
// }

// function TestimonialCard({ t }) {
//   return (
//     <article className="text-white">
//       <StarRow />
//       <p className="mt-4 text-[15px] leading-7 text-white/90 font-default">“{t.text}”</p>
//       <div className="mt-6 h-px w-full bg-white/12" />
//       <div className="mt-5 flex items-center justify-between gap-6">
//         <div className="flex items-center gap-3">
//           <div className="h-11 w-11 overflow-hidden rounded-lg bg-white/10">
//             <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
//           </div>
//           <div>
//             <h3 className="text-[16px] font-semibold leading-tight font-default">{t.name}</h3>
//             <p className="mt-0.5 text-[13px] text-white/70 font-accent">{t.role}</p>
//           </div>
//         </div>
//         <span className="text-3xl leading-none text-white/90">”</span>
//       </div>
//     </article>
//   );
// }

// export default function OurTestimonials() {
//   const perPage = 2;

//   const pages = useMemo(() => {
//     const out = [];
//     for (let i = 0; i < testimonials.length; i += perPage) {
//       out.push(testimonials.slice(i, i + perPage));
//     }
//     return out;
//   }, []);

//   const total = pages.length;
//   const [index, setIndex] = useState(0);

//   // actual sliding: translate a track that contains ALL pages
//   const viewportRef = useRef(null);

//   const next = () => setIndex((i) => (i + 1) % total);
//   const prev = () => setIndex((i) => (i - 1 + total) % total);

//   return (
//     <section className="relative w-full overflow-hidden bg-primary py-20 sm:py-24">
//       {/* dotted background */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-30"
//         style={{
//           backgroundImage:
//             "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
//           backgroundSize: "16px 16px",
//         }}
//       />

//       <div className="relative w-full px-6 lg:px-16 xl:px-24">
//         {/* Header */}
//         <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <div className="mb-3 flex items-center gap-3">
//               <span className="h-2 w-2 rounded-full bg-(--accent-color)" />
//               <p className="font-serif text-sm italic text-white/90">Testimonials</p>
//             </div>
//             <RevealInAnimation >
//               <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl font-default">
//                 Real reviews trusted quality{" "}
//                 <span className="block font-accent font-light italic">happy customers</span>
//               </h2>
//             </RevealInAnimation>
//           </div>

//           <div className="flex items-center gap-6 lg:justify-end">
//             <img src="/images/google-img.svg" alt="Google" className="h-10 w-auto" />
//             <span className="h-10 w-px bg-white/15" />
//             <div>
//               <StarRow />
//               <p className="mt-2 text-sm text-white/70">1000+ Our Happy Customer Review</p>
//             </div>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-center">
//           {/* Left image box */}
//           <div className="w-full lg:w-[32%]">
//           <FaderInAnimation direction="left" duration ={0.6}>
//             <div className="overflow-hidden rounded-[28px] bg-white/10">
//               <img
//                 src="/images/testimonial-image.jpg"
//                 alt="Happy customers"
//                 className="w-full object-cover "
//                 style={{ aspectRatio: "386 / 430" }}
//               />
//             </div>
//           </FaderInAnimation>
//           </div>
//           {/* Right slider */}
//           <div className="w-full lg:w-[68%]">
//           <FaderInAnimation direction="right" duration={0.6}>
//             {/* viewport */}
//             <div ref={viewportRef} className="overflow-hidden">
//               {/* track: contains all pages side-by-side */}
//               <div
//                 className="flex transition-transform duration-500 ease-out will-change-transform"
//                 style={{ transform: `translateX(-${index * 100}%)` }}
//               >
//                 {pages.map((page, pIdx) => (
//                   <div
//                     key={pIdx}
//                     className="w-full shrink-0"
//                     style={{ width: "100%" }}
//                   >
//                     <div className="grid gap-10 md:grid-cols-2">
//                       {page.map((t, i) => (
//                         <TestimonialCard key={i} t={t} />
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Nav */}
//             <div className="mt-10 flex items-center justify-center gap-3">
//               <ArrowBtn dir="left" onClick={prev} />
//               <ArrowBtn dir="right" onClick={next} />
//             </div>
//           </FaderInAnimation>
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
import { useMemo, useRef, useState } from "react";

const testimonials = [
  {
    name: "Michael Carter",
    role: "Aromatherapist",
    avatar: "/images/author-3.jpg",
    text:
      "These oil droppers are perfect for my essential oil blends! The precision and outstanding of Highly recommend many dropper bottles, but these are by far the best. No leaks, no waste—just pure convenience!",
  },
  {
    name: "Jenny Wilson",
    role: "Aromatherapist",
    avatar: "/images/author-1.jpg",
    text:
      "These oil droppers are perfect for my essential oil blends! The precision and outstanding of Highly recommend many dropper bottles, but these are by far the best. No leaks, no waste—just pure convenience!",
  },
  {
    name: "Sophia Reynolds",
    role: "Herbalist",
    avatar: "/images/author-2.jpg",
    text:
      "These oil droppers are perfect for my essential oil blends! The precision and outstanding of Highly recommend many dropper bottles, but these are by far the best. No leaks, no waste—just pure convenience!",
  },
  {
    name: "Olivia Brooks",
    role: "Wellness Coach",
    avatar: "/images/author-4.jpg",
    text:
      "These oil droppers are perfect for my essential oil blends! The precision and outstanding of Highly recommend many dropper bottles, but these are by far the best. No leaks, no waste—just pure convenience!",
  },
];

function StarRow() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-4 w-4 text-(--accent-color)"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function ArrowBtn({ dir = "left", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/90 transition hover:bg-white/10"
      aria-label={dir === "left" ? "Previous" : "Next"}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

function TestimonialCard({ t }) {
  return (
    <article className="text-(--white-color)">
      <StarRow />
      <p className="mt-4 text-[15px] leading-7 text-(--white-color)/90 font-default">“{t.text}”</p>
      <div className="mt-6 h-px w-full bg-(--white-color)/12" />
      <div className="mt-5 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 overflow-hidden rounded-lg bg-(--white-color)/10">
            <Image src={t.avatar} alt={t.name} width={44} height={44} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-(--white-color) leading-tight font-default">{t.name}</h3>
            <p className="mt-0.5 text-[13px] text-(--white-color)/70 font-accent">{t.role}</p>
          </div>
        </div>
        <span className="text-3xl leading-none text-(--white-color)/90">”</span>
      </div>
    </article>
  );
}

export default function OurTestimonials() {
  const perPage = 2;

  const pages = useMemo(() => {
    const out = [];
    for (let i = 0; i < testimonials.length; i += perPage) {
      out.push(testimonials.slice(i, i + perPage));
    }
    return out;
  }, []);

  const total = pages.length;
  const [index, setIndex] = useState(0);

  // actual sliding: translate a track that contains ALL pages
  const viewportRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <section className="relative w-full overflow-hidden bg-(--primary-color) py-16 sm:py-20">
      {/* dotted background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative w-full px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-(--accent-color)" />
              <p className="font-serif text-sm italic text-(--white-color)/90">Kundenstimmen</p>
            </div>
            <RevealInAnimation >
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-(--white-color) sm:text-4xl lg:text-5xl font-default">
                Echte Bewertungen,{" "}
                <span className="block font-accent font-light italic">zufriedene Kunden</span>
              </h2>
            </RevealInAnimation>
          </div>

          <div className="flex items-center gap-6 lg:justify-end">
            <Image src="/images/google-img.svg" alt="Google" width={100} height={40} className="h-10 w-auto" />
            <span className="h-10 w-px bg-(--white-color)/15" />
            <div>
              <StarRow />
              <p className="mt-2 text-sm text-(--white-color)/70">Über 1000 zufriedene Kunden</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-center">
          {/* Left image box */}
          <div className="w-full lg:w-[32%]">
            <FaderInAnimation direction="left" duration={0.6}>
              <div className="overflow-hidden rounded-[28px] bg-white/10">
                <Image
                  src="/images/new/Testimonials-copy.webp"
                  alt="Happy customers"
                  width={800}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </FaderInAnimation>
          </div>
          {/* Right slider */}
          <div className="w-full lg:w-[68%]">
            <FaderInAnimation direction="right" duration={0.6}>
              {/* viewport */}
              <div ref={viewportRef} className="overflow-hidden">
                {/* track: contains all pages side-by-side */}
                <div
                  className="flex transition-transform duration-500 ease-out will-change-transform"
                  style={{ transform: `translateX(-${index * 100}%)` }}
                >
                  {pages.map((page, pIdx) => (
                    <div
                      key={pIdx}
                      className="w-full shrink-0"
                      style={{ width: "100%" }}
                    >
                      <div className="grid gap-10 md:grid-cols-2">
                        {page.map((t, i) => (
                          <TestimonialCard key={i} t={t} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nav */}
              <div className="mt-10 flex items-center justify-center gap-3">
                <ArrowBtn dir="left" onClick={prev} />
                <ArrowBtn dir="right" onClick={next} />
              </div>
            </FaderInAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}