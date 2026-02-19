import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { updateBeehiivTags, enrollInAutomation } from "@/lib/beehiiv";

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET!);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Stripe webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email =
      session.customer_email || session.customer_details?.email;
    const paymentId = session.payment_intent as string;

    if (!email) {
      console.error("No email in Stripe session:", session.id);
      return NextResponse.json({ received: true });
    }

    const supabase = createAdminClient();

    const { data: application } = await supabase
      .from("applications")
      .select("id, beehiiv_subscriber_id, status")
      .eq("email", email.toLowerCase())
      .in("status", ["accepted", "payment_sent"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!application) {
      console.error("Application not found for paid email:", email);
      return NextResponse.json({ received: true });
    }

    await supabase
      .from("applications")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        stripe_payment_id: paymentId,
      })
      .eq("id", application.id);

    if (application.beehiiv_subscriber_id) {
      try {
        await updateBeehiivTags(
          application.beehiiv_subscriber_id,
          ["status:paid"],
          [`status:${application.status}`]
        );
      } catch (beehiivError) {
        console.error("Beehiiv update after payment failed:", beehiivError);
      }

      // Enroll in "Paid / Welcome to Cohort" automation
      try {
        await enrollInAutomation(email, "paid");
      } catch (automationError) {
        console.error("Beehiiv paid automation enrollment failed:", automationError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
