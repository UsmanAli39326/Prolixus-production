import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaGlobe,
  FaGooglePay,
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex
} from "react-icons/fa";
import { SiKlarna } from "react-icons/si";
import { getAboutPayload } from "@/app/api/about/about";
import { getSocials } from "@/app/api/socials/socials";
import { getLocalization } from "@/lib/getLocalization";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { formatDate } from "@/utitlis/formatters";

const getSocialIcon = (iconClass) => {
  if (!iconClass) return <FaGlobe />;
  const lowerClass = iconClass.toLowerCase();
  if (lowerClass.includes("facebook")) return <FaFacebook />;
  if (lowerClass.includes("twitter")) return <FaTwitter />;
  if (lowerClass.includes("instagram")) return <FaInstagram />;
  if (lowerClass.includes("linkedin")) return <FaLinkedin />;
  if (lowerClass.includes("youtube")) return <FaYoutube />;
  if (lowerClass.includes("tiktok")) return <FaTiktok />;
  if (lowerClass.includes("pinterest")) return <FaPinterest />;
  return <FaGlobe />;
};

export default async function MainFooter() {
  const about = await getAboutPayload();
  const socials = await getSocials();
  const loc = await getLocalization();

  const get = (key, fallback) => {
    const k = key?.toLowerCase();
    const val = loc?.[k] ?? loc?.[key];
    return (val && typeof val === "string" && val.trim() !== "") ? val : fallback;
  };

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
                const desc = about?.shortDescription || get("footer_desc_fallback", "Crafting exceptional experiences with a focus on innovation and sustainable growth.");
                const limit = 1000;
                if (desc.length <= limit) return desc;
                return (
                  <>
                    {desc.substring(0, limit)}...{" "}
                    <Link href="/about" className="text-(--accent-color) hover:underline font-semibold">
                      {get("footer_learn_more", "learn more")}
                    </Link>
                  </>
                );
              })()}
            </div>
            
            {/* Payment Methods */}
            <div className="pt-4">
              <div className="flex items-center gap-4 text-(--white-color)/60 text-3xl">
                <FaGooglePay title="Google Pay" className="hover:text-(--white-color) transition-colors cursor-pointer text-4xl -mx-2" />
                <SiKlarna title="Klarna" className="hover:text-[#FFB3C7] transition-colors cursor-pointer text-2xl mx-1" />
                <FaPaypal title="PayPal" className="hover:text-[#00457C] transition-colors cursor-pointer text-[22px] mx-1" />
                <FaCcVisa title="Visa" className="hover:text-[#1A1F71] transition-colors cursor-pointer" />
                <FaCcMastercard title="Mastercard" className="hover:text-[#EB001B] transition-colors cursor-pointer" />
                <FaCcAmex title="American Express" className="hover:text-[#002663] transition-colors cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-(--white-color) font-accent font-bold text-xl mb-8">
              {get("footer_quick_links", "Quick Links")}
            </h3>
            <ul className="space-y-4">
              {[
                { name: get("footer_link_login", "Login"), href: "/login" },
                { name: get("footer_link_certificates", "Certificates"), href: "/certificates" },
                { name: get("footer_link_terms", "Terms & Conditions"), href: "/terms" },
                { name: get("footer_link_privacy", "Privacy Policy"), href: "/privacy-policy" },
                { name: get("footer_link_return", "Return & Refund Policy"), href: "/return-and-refund" },
                { name: get("footer_link_faqs", "FAQ's"), href: "/faqs" },
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
            <h3 className="text-(--white-color) font-accent font-bold text-xl mb-8">
              {get("footer_contact_us", "Contact Us")}
            </h3>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <FaMapMarkerAlt className="text-(--accent-color) text-lg" />
                </div>
                <p className="text-(--white-color)/70 font-default text-[15px] leading-relaxed">
                  {about?.address || get("footer_address_unavailable", "Address info unavailable")}
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-(--accent-color) text-lg" />
                <a
                  href={`tel:${about?.phone}`}
                  className="text-(--white-color)/70 hover:text-(--accent-color) transition duration-300 font-default text-[15px]"
                >
                  {about?.phone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-(--accent-color) text-lg" />
                <a
                  href={`mailto:${about?.email}`}
                  className="text-(--white-color)/70 hover:text-(--accent-color) transition duration-300 font-default text-[15px]"
                >
                  {about?.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Stay Updated */}
          <div>
            <h3 className="text-(--white-color) font-accent font-bold text-xl mb-8">
              {get("footer_stay_updated", "Stay Updated")}
            </h3>
            <div className="space-y-6">
              <p className="text-(--white-color)/60 font-default text-[15px] leading-relaxed text-justify">
                {get("footer_newsletter_text", "Join our newsletter to receive the latest updates and health insights.")}
              </p>

              <NewsletterForm />

              {socials && socials.length > 0 && (
                <div className="pt-4">
                  <h4 className="text-(--white-color) font-accent font-bold text-lg mb-4">
                    {get("footer_follow_us", "Follow Us")}
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {socials.filter(s => s.isActive).sort((a, b) => a.sortOrder - b.sortOrder).map((social) => (
                      <Link
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-(--white-color)/60 hover:text-(--accent-color) transition-colors group"
                      >
                        <div className="text-xl group-hover:scale-110 transition-transform">
                          {getSocialIcon(social.icon)}
                        </div>
                        <span className="font-default text-[15px]">{social.displayName}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ================= BOTTOM BAR =================  */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-(--white-color)/40 font-default text-sm text-center md:text-left">
            © {formatDate(new Date(), 'year')} {about?.companyName || "Prolixus"}. {get("footer_all_rights", "All rights reserved.")} | Powered by <Link href="https://devtechnoz.com/" target="_blank" className="hover:text-(--accent-color) transition-colors font-semibold">DevTechNoz</Link>
          </p>

          <div className="flex items-center gap-8 font-default">
            <Link href="/privacy-policy" className="text-(--white-color)/40 hover:text-(--white-color) transition text-sm">
              {get("footer_privacy_short", "Privacy")}
            </Link>
            <Link href="/terms" className="text-(--white-color)/40 hover:text-(--white-color) transition text-sm">
              {get("footer_terms_short", "Terms")}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}