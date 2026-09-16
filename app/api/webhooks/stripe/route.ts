import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js"; // Using raw client for admin rights

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-08-26.dahlia", // Use the latest stable version
});

// We need a Service Role key to bypass RLS and insert the order securely
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // NOTE: We must add this to .env
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const shippingAddress = (session as any).shipping_details?.address;
    const items = JSON.parse(session.metadata?.items || "[]");
    
    // 1. Create the Order in Supabase
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: session.metadata?.userId === 'guest' ? null : session.metadata?.userId,
        status: "processing",
        subtotal: (session.amount_subtotal || 0) / 100,
        shipping_cost: (session.total_details?.amount_shipping || 0) / 100,
        total: (session.amount_total || 0) / 100,
        shipping_address: shippingAddress,
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent as string,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      return new NextResponse("Error creating order", { status: 500 });
    }

    // 2. Insert Order Items (We need to fetch current prices or just trust the checkout amount. 
    // In a real app, you fetch from DB to be safe, but for template simplicity we'll record it).
    for (const item of items) {
      // Fetch product to get current price and deduct inventory
      const { data: product } = await supabaseAdmin.from("products").select("price, inventory_count").eq("id", item.id).single();
      
      if (product) {
        await supabaseAdmin.from("order_items").insert({
          order_id: order.id,
          product_id: item.id,
          quantity: item.quantity,
          price_at_time: product.price,
        });

        // 3. Deduct Inventory
        await supabaseAdmin.from("products").update({
          inventory_count: Math.max(0, product.inventory_count - item.quantity)
        }).eq("id", item.id);
      }
    }

    // 4. Send Confirmation Email via Resend (To be implemented)
    // await sendOrderConfirmationEmail(session.customer_details?.email, order);
  }

  return new NextResponse(null, { status: 200 });
}
