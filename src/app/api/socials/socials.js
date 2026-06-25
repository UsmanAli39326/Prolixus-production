import { apiService } from "@/lib/api";

export async function getSocials() {
  try {
    const response = await apiService.get("/SocialMedias", {}, { next: { revalidate: 30 } });

    if (!response?.success || !response?.data) return [];

    return response.data;
  } catch (error) {
    console.error("Socials API Error:", error);
    return [];
  }
}
