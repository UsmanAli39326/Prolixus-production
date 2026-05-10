import { getLocalization } from "@/lib/getLocalization";
import CartClient from "@/components/layout/Ecommerce/CartPage/CartClient";

export async function generateMetadata() {
  const data = await getLocalization();
  return {
    title: `${data?.cart_title} | Ecomm Store`,
    description: data?.cart_empty_desc,
  };
}

export default async function CartPage() {
  const data = await getLocalization();

  return <CartClient localization={data} />;
}
