import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { getAboutPayload } from "@/app/api/about/about";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { formatDate } from "@/utitlis/formatters";

export default async function MainFooter() {
  const about = await getAboutPayload();

  return (
    <footer className="bg-(--primary-color) text-(--white-color) pt-24 pb-12">
      <div className="container mx-auto px-6">

        {/* ================= MAIN GRID (4 Columns) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 pb-20 border-b border-white/10">

          {/* Column 1: Logo & Description */}
          <div className="space-y-8 -mt-4">
            <div className="logo">
              <Image
                src="/images/new/logo-font-size-big.gif"
                alt="Prolixus Logo"
                width={240}
                height={66}
                className="h-12 w-auto object-contain scale-[1.5] origin-left"
              />
            </div>
            <div className="text-(--white-color)/60 font-default text-[15px] leading-[1.6] max-w-sm text-justify">
              {(() => {
                const desc = about?.shortDescription || "Crafting exceptional experiences with a focus on innovation and sustainable growth.";
                const limit = 1000;
                if (desc.length <= limit) return desc;
                return (
                  <>
                    {desc.substring(0, limit)}...{" "}
                    <Link href="/about" className="text-(--accent-color) hover:underline font-semibold">
                      learn more
                    </Link>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-(--white-color) font-accent font-bold text-xl mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Login", href: "/login" },
                { name: "Terms & Conditions", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Return & Refund Policy", href: "/return-and-refund" },
                { name: "FAQ's", href: "/faqs" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-(--white-color)/60 hover:text-(--accent-color) transition duration-300 font-default text-[15px]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-(--white-color) font-accent font-bold text-xl mb-8">Contact Us</h3>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <FaMapMarkerAlt className="text-(--accent-color) text-lg" />
                </div>
                <p className="text-(--white-color)/70 font-default text-[15px] leading-relaxed">
                  {about?.address || "Address info unavailable"}
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-(--accent-color) text-lg" />
                <a
                  href={`tel:${about?.phone}`}
                  className="text-(--white-color)/70 hover:text-(--accent-color) transition duration-300 font-default text-[15px]"
                >
                  {about?.phone || "+1 (555) 000-1234"}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-(--accent-color) text-lg" />
                <a
                  href={`mailto:${about?.email}`}
                  className="text-(--white-color)/70 hover:text-(--accent-color) transition duration-300 font-default text-[15px]"
                >
                  {about?.email || "contact@prolixus.com"}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Stay Updated */}
          <div>
            <h3 className="text-(--white-color) font-accent font-bold text-xl mb-8">Stay Updated</h3>
            <div className="space-y-6">
              <p className="text-(--white-color)/60 font-default text-[15px] leading-relaxed text-justify">
                Join our newsletter to receive the latest updates and health insights.
              </p>

              <NewsletterForm />
            </div>
          </div>

        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-(--white-color)/40 font-default text-sm">
            © {formatDate(new Date(), 'year')} {about?.companyName || "Prolixus"}. All rights reserved. | Powered by <Link href="https://devtechnoz.com/" target="_blank" className="hover:text-(--accent-color) transition-colors font-semibold">DevTechNoz</Link>
          </p>

          <div className="flex items-center gap-8 font-default">
            <Link href="/privacy-policy" className="text-(--white-color)/40 hover:text-(--white-color) transition text-sm">Privacy</Link>
            <Link href="/terms" className="text-(--white-color)/40 hover:text-(--white-color) transition text-sm">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
