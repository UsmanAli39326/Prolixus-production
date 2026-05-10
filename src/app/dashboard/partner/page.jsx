import { getLocalization } from "@/lib/getLocalization";
import PartnerClient from "./PartnerClient";

export async function generateMetadata() {
  return {
    title: "Partner Program | Dashboard",
  };
}

export default async function PartnerPage() {
    const localization = await getLocalization();
    return <PartnerClient localization={localization} />;
}
