import { apiService } from "@/lib/api";

async function getLang() {
  let lang = "en";
  try {
    const { cookies } = require("next/headers");
    const cookieStore = await cookies();
    lang = cookieStore.get("appLanguage")?.value || "en";
  } catch (e) {
    if (typeof window !== "undefined") {
      lang = localStorage.getItem("appLanguage") || "en";
    }
  }
  return lang;
}

export async function getAboutPayload() {
  try {
    const lang = await getLang();
    const response = await apiService.get(
      `/Configuration/about?culture=${lang}&lang=${lang}&language=${lang}`,
      {},
      { next: { revalidate: 0 }, cache: 'no-store' }
    );

    if (!response?.success || !response?.data) return null;

    const about = response.data;

    return {
      companyName: about.companyName,
      title: about.title,
      shortDescription: about.shortDescription,
      description: about.description,
      address: about.address,
      email: about.email,
      mobile: about.mobile,
      phone: about.phone,
      activeTime: about.activeTime,
      currency: about.currency,
      currencySymbol: about.currencySymbol,
      shippingCost: about.shippingCost,
      freeShippingOnOrderPrice: about.freeShippingOnOrderPrice,
      googleMap: about.googleMapPinLocation,
      logoId: about.fileId,
      taxNumber: about.taxNumber,
      ustNumber: about.ustIdNr || about.ustNumber || about.vatNumber,
      demoVideoUrl: about.demoVideoUrl,
      triggerTimeInSeconds: about.triggerTimeInSeconds,
      isRenderVideoDisable: false,
    };

  } catch (error) {
    console.error("About API Error:", error);
    return null;
  }
}

export async function getTeamMembers() {
  try {
    const lang = await getLang();
    const response = await apiService.get(
      `/Configuration/team-members?culture=${lang}&lang=${lang}&language=${lang}`,
      {},
      { next: { revalidate: 0 }, cache: 'no-store' }
    );
    if (!response) return [];
    if (Array.isArray(response.data)) return response.data;
    if (Array.isArray(response)) return response;
    return [];
  } catch (error) {
    console.error("Team Members API Error:", error);
    return [];
  }
}
