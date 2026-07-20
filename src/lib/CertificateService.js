import { apiService } from "@/lib/api";

const CERTIFICATES_ENDPOINT = "/Certificates";

/**
 * Fetch a specific certificate by its ID.
 * GET /api/Certificates/{id}
 * @param {string|number} id - The ID of the certificate.
 */
export async function getCertificateById(id) {
    try {
        const response = await apiService.get(`${CERTIFICATES_ENDPOINT}/${id}`, {}, { next: { revalidate: 30 } });
        
        console.log(`getCertificateById API Response for id ${id}:`, response);
        
        return response?.data || response;
    } catch (error) {
        console.error(`Failed to fetch certificate with id ${id}:`, error);
        return null;
    }
}
