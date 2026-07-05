import { apiService } from "@/lib/api";

const SUBSCRIPTIONS_ENDPOINT = "/Subscriptions/my";

/**
 * Fetch the current user's subscriptions.
 * GET /Subscriptions/my
 * @param {boolean} cancelledOnly - If true, fetches only cancelled subscriptions.
 */
export async function getSubscriptions(cancelledOnly = false) {
    const url = cancelledOnly ? `${SUBSCRIPTIONS_ENDPOINT}?cancelledOnly=true` : SUBSCRIPTIONS_ENDPOINT;
    return apiService.get(url);
}

/**
 * Fetch order history for a specific subscription/product.
 * GET /Subscriptions/my/{product_Id}/orders
 * @param {string|number} productId - The ID of the subscribed product.
 */
export async function getSubscriptionOrders(productId) {
    return apiService.get(`${SUBSCRIPTIONS_ENDPOINT}/${productId}/orders`);
}
