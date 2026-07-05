import { getLocalization } from "@/lib/getLocalization";
import SubscriptionsClient from "./SubscriptionsClient";

export async function generateMetadata() {
  const data = await getLocalization();
  return {
    title: `${data?.subscriptions_title || 'My Subscriptions'} | Dashboard`,
    description: data?.subscriptions_subtitle || 'Manage your active and cancelled subscriptions',
  };
}

export default async function SubscriptionsPage() {
  const data = await getLocalization();

  return <SubscriptionsClient localization={data} />;
}
