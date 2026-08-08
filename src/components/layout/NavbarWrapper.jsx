import { getShopMenus } from "@/app/api/layout/navbar";
import Navbar from "./Navbar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NavbarWrapper() {
  const menus = await getShopMenus();
  return <Navbar menus={menus} />;
}
