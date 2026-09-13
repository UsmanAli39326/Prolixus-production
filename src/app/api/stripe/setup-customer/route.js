import Stripe from "stripe";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

async function getStripeSecretKey() {
  const res = await fetch(`${BASE_URL}/Configuration/paymentmethods`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch payment methods from API");
  const data = await res.json();
  const methods = Array.isArray(data) ? data : data?.data ?? data?.result ?? [];

  const stripeMethod = methods.find((m) => m.name?.toLowerCase() === "stripe" && m.isActive === true);
  if (!stripeMethod) throw new Error("Stripe payment method not found or not active");

  const secretKey = stripeMethod.isTestingEnvironment ? stripeMethod.testSecretkey : stripeMethod.liveSecretkey;
  if (!secretKey) throw new Error(`Stripe ${stripeMethod.isTestingEnvironment ? "test" : "live"} secret key is missing`);

  return secretKey;
}

export async function POST(req) {
  try {
    const { email, name, paymentMethodId, customerId } = await req.json();

    if (!email && !customerId) {
      return Response.json({ error: "Email or customerId is required" }, { status: 400 });
    }

    const secretKey = await getStripeSecretKey();
    const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });

    let finalCustomerId = customerId;

    if (!finalCustomerId) {
      // 1. Check if customer already exists for this email
      if (email) {
        const existingList = await stripe.customers.list({ email, limit: 1 });
        if (existingList.data && existingList.data.length > 0) {
          finalCustomerId = existingList.data[0].id;
        }
      }

      // 2. If still no customer, create a new one
      if (!finalCustomerId) {
        const customer = await stripe.customers.create({
          email,
          name,
        });
        finalCustomerId = customer.id;
      }
    }

    // 3. Attach payment method if provided
    if (paymentMethodId && finalCustomerId) {
      try {
        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: finalCustomerId,
        });
      } catch (attachErr) {
        console.warn("Payment method attach notice:", attachErr.message);
      }

      try {
        await stripe.customers.update(finalCustomerId, {
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });
      } catch (updateErr) {
        console.warn("Customer update notice:", updateErr.message);
      }
    }

    console.log("[Stripe setup-customer] Successfully resolved customerId:", finalCustomerId);

    return Response.json({
      customerId: finalCustomerId,
    });
  } catch (error) {
    console.error("Stripe Setup Customer Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
