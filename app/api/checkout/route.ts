import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-08-26.dahlia", // Use the latest stable version
});

export async function POST(req: Request) {
  try {
    const { items, userId } = await req.json();

    if (!items || items.length === 0) {
      return new NextResponse("No items in checkout", { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: any) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'usd', // This should be dynamic based on siteConfig if needed
        product_data: {
          name: item.title,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
      },
    }));

    // Dynamic and Flat-rate shipping options
    const shipping_options: Stripe.Checkout.SessionCreateParams.ShippingOption[] = [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'usd' },
          display_name: 'Free Standard Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 1500, currency: 'usd' }, // $15.00
          display_name: 'Express Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 1 },
            maximum: { unit: 'business_day', value: 2 },
          },
        },
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'], // Configure as needed
      },
      shipping_options,
      metadata: {
        userId: userId || 'guest',
        // Storing basic item info to recreate the order in the webhook
        items: JSON.stringify(items.map((i: any) => ({ id: i.id, quantity: i.quantity }))),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("STRIPE CHECKOUT ERROR:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
