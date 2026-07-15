import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

/**
 * Fetches the PayPal payment method config from the backend API,
 * then extracts the credentials based on `isTestingEnvironment`.
 */
async function getPayPalCredentials() {
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

  // Find the PayPal method (case-insensitive)
  const paypalMethod = methods.find(
    (m) => m.name?.toLowerCase() === "paypal" && m.isActive === true
  );

  if (!paypalMethod) {
    throw new Error("PayPal payment method not found or not active");
  }

  // Toggle between test and live credentials based on isTestingEnvironment
  const clientId = paypalMethod.isTestingEnvironment
    ? paypalMethod.testPublishablekey
    : paypalMethod.livePublishablekey;

  const secretKey = paypalMethod.isTestingEnvironment
    ? paypalMethod.testSecretkey
    : paypalMethod.liveSecretkey;

  if (!clientId || !secretKey) {
    throw new Error(
      `PayPal ${paypalMethod.isTestingEnvironment ? "test" : "live"} credentials are missing`
    );
  }

  return {
    clientId,
    secretKey,
    isTestingEnvironment: paypalMethod.isTestingEnvironment,
  };
}

/**
 * Obtains an OAuth access token from PayPal using Client Credentials.
 */
async function getPayPalAccessToken(clientId, secretKey, isTesting) {
  const authUrl = isTesting 
    ? "https://api-m.sandbox.paypal.com/v1/oauth2/token" 
    : "https://api-m.paypal.com/v1/oauth2/token";
    
  const auth = Buffer.from(`${clientId}:${secretKey}`).toString("base64");

  const res = await fetch(authUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to authenticate with PayPal: ${errorText}`);
  }

  const data = await res.json();
  return data.access_token;
}

/**
 * Ensures a generic PayPal Subscription Product exists, creates one if not.
 */
async function getOrCreatePayPalProduct(accessToken, isTesting) {
  const baseUrl = isTesting 
    ? "https://api-m.sandbox.paypal.com" 
    : "https://api-m.paypal.com";

  // Check for existing products
  const getRes = await fetch(`${baseUrl}/v1/catalogs/products?page_size=20`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (getRes.ok) {
    const data = await getRes.json();
    if (data.products && data.products.length > 0) {
      // Find a generic subscription product
      const existingProduct = data.products.find(p => p.name === "Prolixus Subscription Product");
      if (existingProduct) {
        return existingProduct.id;
      }
    }
  }

  // Create new product
  const createRes = await fetch(`${baseUrl}/v1/catalogs/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "PayPal-Request-Id": `PROD-${Date.now()}` // optional but good practice
    },
    body: JSON.stringify({
      name: "Prolixus Subscription Product",
      description: "Generic product for Prolixus subscriptions",
      type: "SERVICE",
      category: "SOFTWARE"
    })
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Failed to create PayPal product: ${errorText}`);
  }

  const newProduct = await createRes.json();
  return newProduct.id;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { 
      name, 
      description, 
      price, 
      currency, 
      interval, // e.g., 'MONTH', 'YEAR'
      intervalCount // e.g., 1, 12
    } = body;

    if (!name || !price || !currency || !interval || !intervalCount) {
      return NextResponse.json({ error: "Missing required fields (name, price, currency, interval, intervalCount)" }, { status: 400 });
    }

    // 1. Fetch credentials
    const { clientId, secretKey, isTestingEnvironment } = await getPayPalCredentials();
    
    // 2. Get Access Token
    const accessToken = await getPayPalAccessToken(clientId, secretKey, isTestingEnvironment);
    
    // 3. Get or Create Product
    const productId = await getOrCreatePayPalProduct(accessToken, isTestingEnvironment);

    // 4. Create Billing Plan
    const baseUrl = isTestingEnvironment 
      ? "https://api-m.sandbox.paypal.com" 
      : "https://api-m.paypal.com";

    const planPayload = {
      product_id: productId,
      name: name,
      description: description || `Subscription plan for ${name}`,
      status: "ACTIVE",
      billing_cycles: [
        {
          frequency: {
            interval_unit: interval.toUpperCase(), 
            interval_count: parseInt(intervalCount, 10)
          },
          tenure_type: "REGULAR",
          sequence: 1,
          pricing_scheme: {
            fixed_price: {
              value: parseFloat(price).toFixed(2).toString(),
              currency_code: currency.toUpperCase()
            }
          }
        }
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee: {
          value: "0",
          currency_code: currency.toUpperCase()
        },
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 3
      }
    };

    const planRes = await fetch(`${baseUrl}/v1/billing/plans`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "PayPal-Request-Id": `PLAN-${Date.now()}` // optional but good practice
      },
      body: JSON.stringify(planPayload)
    });

    if (!planRes.ok) {
      const errorText = await planRes.text();
      throw new Error(`Failed to create PayPal plan: ${errorText}`);
    }

    const planData = await planRes.json();

    // 5. Return Plan ID
    return NextResponse.json({ planId: planData.id });

  } catch (error) {
    console.error("PayPal Create Plan Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
