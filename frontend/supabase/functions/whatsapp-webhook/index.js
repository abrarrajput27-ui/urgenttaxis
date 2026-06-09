// MOCK WEBHOOK FOR WHATSAPP AUTOMATION (Meta / Interakt / Twilio)
// This function will be triggered by a Supabase Database Webhook when a new row is inserted into 'leads'.

export const handleWhatsAppWebhook = async (req) => {
  try {
    const { record } = req.body;
    
    if (!record || !record.phone) {
      return new Response("Missing lead details", { status: 400 });
    }

    // 1. MOCK: Format the phone number (assuming +91)
    const formattedPhone = record.phone.startsWith('+') ? record.phone : `+91${record.phone}`;

    // 2. MOCK: Construct the template payload
    // Example for Meta Cloud API or Interakt
    const payload = {
      messaging_product: "whatsapp",
      to: formattedPhone,
      type: "template",
      template: {
        name: "lead_welcome_message",
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: record.name },
              { type: "text", text: record.pickup_location },
              { type: "text", text: record.drop_location || 'Local' },
              { type: "text", text: record.vehicle_category }
            ]
          }
        ]
      }
    };

    console.log("MOCK: Sending WhatsApp template message to", formattedPhone);
    console.log("PAYLOAD:", JSON.stringify(payload, null, 2));

    /*
    // TODO: Uncomment and use actual API keys when ready
    const response = await fetch("https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.META_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    */

    return new Response(JSON.stringify({ success: true, message: "Mock WhatsApp message sent" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
