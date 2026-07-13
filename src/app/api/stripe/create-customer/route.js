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

  if (!res.ok) {
    throw new Error("Failed to fetch payment methods from API");
  }

  const data = await res.json();
  const methods = Array.isArray(data) ? data : data?.data ?? data?.result ?? [];

  const stripeMethod = methods.find(
    (m) => m.name?.toLowerCase() === "stripe" && m.isActive === true
  );

  if (!stripeMethod) {
    throw new Error("Stripe payment method not found or not active");
  }

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
  try {
    const { email, name } = await req.json();

    if (!email) {
      return Response.json({ error: "Email is required to create a Stripe customer" }, { status: 400 });
    }

    const secretKey = await getStripeSecretKey();

    const stripe = new Stripe(secretKey, {
      apiVersion: "2024-06-20",
    });

    // Create the customer on Stripe
    const customer = await stripe.customers.create({
      email,
      name,
    });

    return Response.json({
      customerId: customer.id,
    });
  } catch (error) {
    console.error("Stripe Create Customer Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
