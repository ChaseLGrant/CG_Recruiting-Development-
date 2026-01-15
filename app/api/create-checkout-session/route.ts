import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  try {
    const { service, price, type, customerInfo } = await req.json();

    // Extract numeric price (remove $ and commas)
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ""));

    if (!service || !numericPrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: service,
              description: `${type === "course" ? "Course" : "Recruiting Service"}: ${service}`,
            },
            unit_amount: numericPrice * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/checkout?service=${encodeURIComponent(service)}&price=${encodeURIComponent(price)}&type=${type}`,
      customer_email: customerInfo.email,
      metadata: {
        service,
        type,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
