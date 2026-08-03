import Link from "next/link";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import { getCertificates } from "@/app/api/certificates/certificates";
import { getImageUrl } from "@/lib/ImageService";

export default async function ({ localization = {} }) {
  const certificates = await getCertificates();

  const hasCertificates = Array.isArray(certificates) && certificates.length > 0;

  return (
    <section className="certificates-section relative bg-white py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 hidden h-96 w-96 rounded-full bg-accent/5 blur-3xl sm:block" />
      <div className="absolute -bottom-24 -left-24 hidden h-96 w-96 rounded-full bg-primary/5 blur-3xl sm:block" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealInAnimation direction="up" delay={0.1}>
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="font-accent text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl mb-4">
              {localization?.certificates_title || "Our Certifications"}
            </h2>
            <p className="text-text/70 max-w-2xl mx-auto text-sm sm:text-base">
              {localization?.certificates_subtitle || "Committed to the highest standards of quality, safety, and excellence."}
            </p>
          </div>
        </RevealInAnimation>

        {!hasCertificates ? (
          <FaderInAnimation direction="up" delay={0.2}>
            <div className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-accent text-xl font-bold text-primary mb-2">
                {localization?.certificates_empty_title || "No Certificates Available"}
              </h3>
              <p className="text-text/70 text-sm leading-relaxed mb-6">
                {localization?.certificates_empty_desc || "There are currently no certificates to display. Please check back later."}
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 no-underline"
              >
                {localization?.cart_continue_shopping || "Back to Home"}
              </Link>
            </div>
          </FaderInAnimation>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {certificates.map((cert, index) => (
              <FaderInAnimation key={cert.id} direction="up" delay={0.2 + (index * 0.1)}>
                <Link
                  href={`/certificate/${cert.id}`}
                  className="group h-full flex flex-col bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden border border-gray-100"
                >

                  {/* Image Container */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-50/50 p-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {cert.imageUrl ? (
                      <img
                        src={getImageUrl(cert.imageUrl)}
                        alt={cert.title || "Certificate"}
                        className="max-h-full max-w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="text-gray-300 font-medium">No Image Available</div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="p-8 flex flex-col flex-1 bg-white relative overflow-hidden break-words">
                    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                    <h3 className="font-accent text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                      {cert.title}
                    </h3>

                    {cert.shortDescription && (
                      <p className="text-sm font-semibold text-text/80 mb-4 uppercase tracking-wider">
                        {cert.shortDescription}
                      </p>
                    )}

                    {cert.description && (
                      <div
                        className="text-text/70 text-sm leading-relaxed prose prose-sm prose-primary line-clamp-4 mt-auto overflow-hidden break-words"
                        dangerouslySetInnerHTML={{ __html: cert.description }}
                      />
                    )}
                  </div>
                </Link>
              </FaderInAnimation>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
