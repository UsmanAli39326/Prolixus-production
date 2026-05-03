import { apiService } from "@/lib/api";

const ORDERS_ENDPOINT = "/Dashboard/customer-orders";

/**
 * Fetch the current user customer orders.
 * GET /api/Dashboard/customer-orders
 */
export async function getCustomerOrders() {
    return apiService.get(ORDERS_ENDPOINT);
}

/**
 * Fetch details of a specific order by ID.
 * GET /api/Dashboard/order/{orderId}
 */
export async function getOrderDetails(orderId) {
    return apiService.get(`/Dashboard/order/${orderId}`);
}
/**
 * Fetch order statuses.
 * GET /api/Configuration/order-status
 */
export async function getOrderStatuses() {
    return apiService.get("/Configuration/order-status");
}

/**
 * Fetch the invoice HTML (base64-encoded) for a given invoice number.
 * GET /api/Configuration/order-invoice-html-base64?invoiceNumber={invoiceNumber}
 */
export async function getOrderInvoiceHtml(invoiceNumber) {
    return apiService.get(`/Configuration/order-invoice-html-base64?invoiceNumber=${encodeURIComponent(invoiceNumber)}`);
}
