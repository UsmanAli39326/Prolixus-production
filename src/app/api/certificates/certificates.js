import { apiService } from "@/lib/api";

export async function getCertificates() {
  try {
    const response = await apiService.get("/Certificates", {}, { next: { revalidate: 30 } });
    
    if (!response?.success || !response?.data) return [];
    
    return response.data;
  } catch (error) {
    console.error("Certificates API Error:", error);
    return [];
  }
}
