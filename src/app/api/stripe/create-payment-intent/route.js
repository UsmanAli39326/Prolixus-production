import Stripe from "stripe";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

/**
 * Fetches the Stripe payment method config from the backend API,
 * then extracts the correct secret key based on `isTestingEnvironment`.
 */
async function getStripeSecretKey() {
  const res = await fetch(`${BASE_URL}/Configuration/paymentmethods`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch payment methods from API");
  }

  const data = await res.json();
  const methods = Array.isArray(data) ? data : data?.data ?? data?.result ?? [];

  // Find the Stripe method (case-insensitive)
  const stripeMethod = methods.find(
    (m) => m.name?.toLowerCase() === "stripe" && m.isActive === true
  );

  if (!stripeMethod) {
    throw new Error("Stripe payment method not found or not active");
  }

  // Toggle between test and live secret key based on isTestingEnvironment
  const secretKey = stripeMethod.isTestingEnvironment
    ? stripeMethod.testSecretkey
    : stripeMethod.liveSecretkey;

  if (!secretKey) {
    throw new Error(
      `Stripe ${stripeMethod.isTestingEnvironment ? "test" : "live"} secret key is missing`
    );
  }

  return secretKey;
}

export async function POST(req) {
  const { amount, currency } = await req.json();

  try {
    const parsedAmount = Number(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      return Response.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Dynamically fetch the secret key from the payment methods API
    const secretKey = await getStripeSecretKey();

    const stripe = new Stripe(secretKey, {
      apiVersion: "2024-06-20",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parsedAmount * 100),
      currency: (currency || "eur").toLowerCase(),
      payment_method_types: ["card", "klarna"],
      metadata: {
        integration: "nextjs_checkout",
      },
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}