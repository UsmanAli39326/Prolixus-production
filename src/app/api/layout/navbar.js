import { apiService } from "@/lib/api";

export async function getShopMenus() {
  try {
    const response = await apiService.get("/Configuration/shopmenus");

    if (!response?.success) return [];
    // Filter + Sort + Clean Data
    const menus = response.data
      .filter((m) => m.isActive) // only active
      .sort((a, b) => a.priority - b.priority) // priority wise
      .map((m) => {
        let finalUrl = m.url;
        if (finalUrl === "/products" || finalUrl === "/product") {
          finalUrl = "/subscribe";
        }
        return {
          id: m.id,
          label: m.name,
          url: finalUrl,
        };
      });

    return menus;

  } catch (error) {
    console.error("ShopMenus API Error:", error);
    return [];
  }
}