import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import { getAboutPayload } from "@/app/api/about/about";
import Image from "next/image";

export default async function AboutSection({ variant = "full", localization = {} }) {
  const about = await getAboutPayload();

  if (!about) return null;

  return (
    <section className="about-us relative overflow-x-clip bg-white py-12 sm:py-16 lg:py-20">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 hidden h-96 w-96 rounded-full bg-accent/5 blur-3xl sm:block" />
      <div className="absolute -bottom-24 -left-24 hidden h-96 w-96 rounded-full bg-primary/5 blur-3xl sm:block" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-24">

          {/* Left: Dynamic Image Arrangement */}
          <div className="relative lg:col-span-5 lg:sticky lg:top-32">
            <FaderInAnimation direction="right">
              <div className="relative">
                {/* Main Image */}
                <div className="relative z-10 overflow-hidden rounded-2xl sm:rounded-4xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                  <Image
                    src="/images/new/about-us.webp"
                    alt={localization?.image_alt}
                    width={560}
                    height={602}
                    className="w-full object-cover"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-primary/20 via-transparent to-transparent" />
                </div>

                {/* Floating Highlight Card */}
                <div className="absolute -bottom-6 -right-6 z-20 hidden rounded-2xl bg-white p-6 shadow-xl sm:block lg:-right-8 animate-bounce-subtle">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30">
                      <span className="text-xl font-black leading-none tracking-tighter">100%</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary/60">{localization?.natural_origin_label}</p>
                      <p className="font-accent text-lg font-bold text-primary">{localization?.pure_vitality_label}</p>
                    </div>
                  </div>
                </div>

                {/* Decorative border/accent */}
                <div className="absolute -top-6 -left-6 z-0 hidden h-32 w-32 rounded-full border-r-4 border-t-4 border-accent sm:block" />
              </div>
            </FaderInAnimation>
          </div>

          {/* Right: Refined Content */}
          <div className="lg:col-span-7">
            <div className="max-w-2xl space-y-8 sm:space-y-10">

              {/* Header Group */}
              <div className="space-y-4 sm:space-y-6">
                <FaderInAnimation direction="up" delay={0.1}>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-accent" />
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{localization?.label}</span>
                    <span className="h-px w-8 bg-accent" />
                  </div>
                </FaderInAnimation>

                <RevealInAnimation direction="left" delay={0.2}>
                  <h2 className="font-accent text-2xl font-bold leading-[1.15] text-primary sm:text-4xl lg:text-6xl">
                    {about.title}
                  </h2>
                </RevealInAnimation>

                {/* Short description — only on home page */}
                {variant === "short" && (
                  <FaderInAnimation direction="up" delay={0.3}>
                    <p className="text-base leading-relaxed text-text/80 sm:text-lg lg:text-xl">
                      {about.shortDescription}
                    </p>
                  </FaderInAnimation>
                )}
              </div>

              {/* Rich Description Body — only shown on the full About page */}
              {variant === "full" && (
                <FaderInAnimation direction="up" delay={0.4}>
                  <div
                    className="about-description-content max-w-none text-sm leading-relaxed text-text/75 sm:text-base sm:leading-loose"
                    dangerouslySetInnerHTML={{ __html: about.description }}
                  />
                </FaderInAnimation>
              )}


              {/* Action Button — only on the home (short) variant */}
              {variant === "short" && (
                <FaderInAnimation direction="up" delay={0.9}>
                  <div className="pt-2 sm:pt-4">
                    <a
                      href="/about"
                      className="group relative inline-flex items-center gap-3 sm:gap-4 overflow-hidden rounded-full bg-primary px-8 py-4 sm:px-10 sm:py-5 text-xs sm:text-sm font-bold tracking-widest text-white transition-all hover:bg-accent hover:px-10 sm:hover:px-12 active:scale-95"
                    >
                      <span>{localization?.explore_button}</span>
                      <div className="translate-x-0 transition-transform group-hover:translate-x-2">
                        →
                      </div>
                    </a>
                  </div>
                </FaderInAnimation>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
