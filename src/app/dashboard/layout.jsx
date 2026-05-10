import { getLocalization } from "@/lib/getLocalization";
import DashboardLayoutClient from "./DashboardLayoutClient";

export const metadata = {
  title: {
    template: "%s | Dashboard",
    default: "Dashboard",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({ children }) {
  const localization = await getLocalization();
  return (
    <DashboardLayoutClient localization={localization}>
      {children}
    </DashboardLayoutClient>
  );
}
