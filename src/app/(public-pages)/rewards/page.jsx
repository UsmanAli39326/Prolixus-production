import { getLocalization } from "@/lib/getLocalization";
import RewardsClient from "./RewardsClient";

export async function generateMetadata() {
    return {
        title: "Rewards & Affiliate Tutorial",
        description: "Learn how to earn and spend your affiliate rewards wallet balance.",
    };
}

export default async function RewardsPage() {
  const data = await getLocalization();

  return (
    <RewardsClient localization={data} />
  );
}
