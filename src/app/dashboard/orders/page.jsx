import { getLocalization } from "@/lib/getLocalization";
import OrderHistoryClient from "./OrderHistoryClient";

export async function generateMetadata() {
  const data = await getLocalization();
  return {
    title: `${data?.order_history_title} | Dashboard`,
    description: data?.order_history_subtitle,
  };
}

export default async function OrderHistoryPage() {
  const data = await getLocalization();

  return <OrderHistoryClient localization={data} />;
}
