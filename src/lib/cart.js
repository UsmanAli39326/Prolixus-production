/**
 * Shared pricing calculation utility.
 * All price-displaying components (Cart, OrderSummary, payload builder)
 * must import from here to guarantee consistent numbers site-wide.
 */

/**
 * Derives all cart totals from a list of cart items.
 * VAT is calculated per item using the vatPercentage from the API
 * (provided as a decimal, e.g. 0.06 = 6%).
 *
 * @param {Array} cartItems  – items from CartContext ({ price,   quantity, vatPercentage, … })
 * @returns {{ subtotal, vatAmount, shipping, total, vatPercentage }}
 */
/**
 * Normalizes a VAT rate from the API into a decimal multiplier.
 * The API is inconsistent: sometimes it sends 0.05 (decimal) and
 * sometimes 19 (whole percentage). This function always returns
 * the decimal form (e.g. 0.05 or 0.19).
 */
function normalizeVatRate(raw) {
    const v = raw ?? 0;
    if (v === 0) return 0;
    // If the value is >= 1 it's already a whole percentage (e.g. 19 → 0.19)
    return v >= 1 ? v / 100 : v;
}

export function calcCartTotals(cartItems = []) {
    // Truncate to 2 decimal places — never round up
    const r = (n) => Math.trunc((n ?? 0) * 100) / 100;

    const subtotal = r(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0));

    // Calculate VAT per rate
    const vatMap = cartItems.reduce((acc, item) => {
        const rate = normalizeVatRate(item.vatPercentage);
        const percentage = r(rate * 100);
        const amount = item.price * item.quantity * rate;

        if (!acc[percentage]) {
            acc[percentage] = 0;
        }
        acc[percentage] += amount;
        return acc;
    }, {});

    const vatDetails = Object.entries(vatMap)
        .map(([percentage, amount]) => ({
            percentage: parseFloat(percentage),
            amount: r(amount),
        }))
        .sort((a, b) => a.percentage - b.percentage);

    const vatAmount = r(vatDetails.reduce((sum, v) => sum + v.amount, 0));

    // Collect all unique VAT percentages (as whole numbers)
    const allVatPercentages = vatDetails.map(v => v.percentage);

    // Combined VAT percentage (sum of unique percentages as per user request)
    const combinedVatPercentage = allVatPercentages.reduce((sum, p) => sum + p, 0);

    // Derive a display-friendly VAT percentage (keep for backward compatibility)
    const vatPercentage = allVatPercentages.length > 0 ? allVatPercentages[0] : 0;

    const shipping = 0; // Shipping is always free
    const total = r(subtotal + shipping);

    const result = {
        subtotal,
        vatAmount,
        shipping,
        total: r(subtotal + shipping),
        vatPercentage,
        allVatPercentages,
        combinedVatPercentage,
        vatDetails,
    };
    console.log("[calcCartTotals] Calculated totals:", result, "for cartItems:", cartItems);
    return result;
}
