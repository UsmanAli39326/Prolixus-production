import { apiService } from "@/lib/api";

export async function getShopMenus() {
  try {
    const response = await apiService.get("/Configuration/shopmenus");

    let menus = [];

    if (response?.success && Array.isArray(response.data)) {
      menus = response.data
        .filter((m) => m.isActive) // only active
        .sort((a, b) => a.priority - b.priority) // priority wise
        .map((m) => {
          let finalUrl = m.url;
          if (finalUrl === "/products" || finalUrl === "/product") {
            finalUrl = "/subscribe";
          }
          if (finalUrl === "/rewards") {
            finalUrl = "/conduct";
          }
          let finalLabel = m.name;
          if (finalUrl === "/conduct") {
            finalLabel = "Conduct";
          }
          return {
            id: m.id,
            label: finalLabel,
            url: finalUrl,
          };
        });
    }

    // Ensure Conduct page is present in navbar
    const hasConduct = menus.some(
      (m) => m.url === "/conduct" || m.label?.toLowerCase() === "conduct"
    );

    if (!hasConduct) {
      const contactIndex = menus.findIndex((m) =>
        m.label?.toLowerCase().includes("contact")
      );
      const conductItem = {
        id: "conduct-nav-item",
        label: "Conduct",
        url: "/conduct",
      };

      if (contactIndex !== -1) {
        menus.splice(contactIndex, 0, conductItem);
      } else {
        menus.push(conductItem);
      }
    }

    return menus;

  } catch (error) {
    console.error("ShopMenus API Error:", error);
    return [
      { id: "home-nav", label: "Home", url: "/" },
      { id: "about-nav", label: "About Us", url: "/about" },
      { id: "conduct-nav", label: "Conduct", url: "/conduct" },
      { id: "subscribe-nav", label: "Subscribe", url: "/subscribe" },
      { id: "contact-nav", label: "Contact Us", url: "/contact" },
    ];
  }
}