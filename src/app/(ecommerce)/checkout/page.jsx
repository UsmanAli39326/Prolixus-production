import { getLocalization } from "@/lib/getLocalization";
import CheckoutWizard from "@/components/layout/Ecommerce/CheckoutPage/CheckoutWizard";

export async function generateMetadata() {
  const data = await getLocalization();
  return {
    title: `${data?.checkout_breadcrumb_info} | Ecomm Store`,
    description: data?.checkout_contact_info_title,
  };
}

export default async function CheckoutPage() {
  const data = await getLocalization();

  return <CheckoutWizard localization={data} />;
}