import { getLocalization } from "@/lib/getLocalization";
import DashboardOverviewClient from "./DashboardOverviewClient";

export default async function DashboardOverviewPage() {
    const localization = await getLocalization();
    return <DashboardOverviewClient localization={localization} />;
}
