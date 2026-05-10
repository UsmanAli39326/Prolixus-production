import { getLocalization } from "@/lib/getLocalization";
import SecurityClient from "./SecurityClient";

export async function generateMetadata() {
  return {
    title: "Security Settings | Dashboard",
  };
}

export default async function SecurityPage() {
    const localization = await getLocalization();
    return <SecurityClient localization={localization} />;
}
