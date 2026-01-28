import axios from "axios";
import https from "https";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const BASE_URL = process.env.NODE_ENV === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

let cachedAccessToken: string | null = null;
let tokenExpiry: number | null = null;

// Create axios instance with longer timeout and forced IPv4
const client = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // 30 seconds
    family: 4, // Force IPv4
    httpsAgent: new https.Agent({ keepAlive: true, family: 4 })
});

/**
 * Generate an OAuth 2.0 access token for PayPal API calls.
 */
export async function generateAccessToken() {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("Missing PayPal credentials");
    }

    // Return cached token if valid (with 60s buffer)
    if (cachedAccessToken && tokenExpiry && Date.now() < tokenExpiry - 60000) {
        return cachedAccessToken;
    }

    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");

    try {
        const response = await client.post("/v1/oauth2/token",
            "grant_type=client_credentials",
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const data = response.data;
        if (data.access_token) {
            cachedAccessToken = data.access_token;
            tokenExpiry = Date.now() + (data.expires_in * 1000);
            return data.access_token;
        } else {
            throw new Error("Failed to generate access token");
        }
    } catch (error: any) {
        console.error("PayPal Token Error:", error.message);
        throw new Error(error.response?.data?.error_description || error.message);
    }
}

/**
 * Create a PayPal order.
 */
export async function createPayPalOrder(amount: string, description: string = "Donation to OFHM") {
    // Validate amount
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        throw new Error("Invalid donation amount");
    }

    const accessToken = await generateAccessToken();

    try {
        const response = await client.post("/v2/checkout/orders",
            {
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
                payment_source: {
                    paypal: {
                        experience_context: {
                            landing_page: "LOGIN",
                            shipping_preference: "NO_SHIPPING",
                            user_action: "PAY_NOW",
                            brand_name: "Our Father Home Ministries"
                        }
                    }
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("PayPal Create Order Error:", error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
}

/**
 * Capture a PayPal order.
 */
export async function capturePayPalOrder(orderId: string) {
    const accessToken = await generateAccessToken();

    try {
        const response = await client.post(`/v2/checkout/orders/${orderId}/capture`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("PayPal Capture Order Error:", error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
}

/**
 * Get client token for SDK v6
 */
export async function generateClientToken() {
    const accessToken = await generateAccessToken();

    try {
        const response = await client.post("/v1/identity/generate-token",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data.client_token;
    } catch (error: any) {
        console.error("PayPal Generate Client Token Error:", error.message);
        throw new Error(error.response?.data?.message || error.message);
    }
}
