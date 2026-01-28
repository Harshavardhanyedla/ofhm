const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const BASE_URL = process.env.NODE_ENV === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

/**
 * Generate an OAuth 2.0 access token for PayPal API calls.
 */
export async function generateAccessToken() {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("Missing PayPal credentials");
    }

    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");

    const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    const data = await response.json();
    return data.access_token;
}

/**
 * Handle response from PayPal API
 */
async function handleResponse(response: Response) {
    if (response.status === 200 || response.status === 201) {
        return response.json();
    }

    const errorMessage = await response.text();
    throw new Error(errorMessage);
}

/**
 * Create a PayPal order.
 */
export async function createPayPalOrder(amount: string, description: string = "Donation to OFHM") {
    const accessToken = await generateAccessToken();
    const url = `${BASE_URL}/v2/checkout/orders`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: amount,
                    },
                    description: description,
                },
            ],
        }),
    });

    return handleResponse(response);
}

/**
 * Capture a PayPal order.
 */
export async function capturePayPalOrder(orderId: string) {
    const accessToken = await generateAccessToken();
    const url = `${BASE_URL}/v2/checkout/orders/${orderId}/capture`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return handleResponse(response);
}

/**
 * Get client token for SDK v6
 */
export async function generateClientToken() {
    const accessToken = await generateAccessToken();
    const url = `${BASE_URL}/v1/identity/generate-token`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();
    return data.client_token;
}
