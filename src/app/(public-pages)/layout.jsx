import MainFooter from "@/components/layout/Footer";
import CartFAB from "@/components/layout/CartFAB";

export default function PublicPageLayout({ children }) {
  return (
    <>
      <section className="company-pages-wrapper lg:pt-20 pt-18">
        {children}
      </section>
      <MainFooter />
      <CartFAB />
    </>
  )
}