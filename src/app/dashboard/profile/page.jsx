import { getLocalization } from "@/lib/getLocalization";
import ProfileClient from "./ProfileClient";

export async function generateMetadata() {
  return {
    title: "Profile Settings | Dashboard",
  };
}

export default async function ProfilePage() {
    const localization = await getLocalization();
    return <ProfileClient localization={localization} />;
}
