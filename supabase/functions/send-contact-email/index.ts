
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting send-contact-email function');
    
    const { name, phone, email, message }: ContactEmailRequest = await req.json();

    console.log('Received contact form data:', { name, email, phone });

    // Check if RESEND_API_KEY is available
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: "שגיאה בהגדרת השרת - חסר מפתח Resend" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log('Sending email via Resend...');

    // Send email to verified email address (temporary fix for testing)
    const emailResponse = await resend.emails.send({
      from: "טופס יצירת קשר <onboarding@resend.dev>",
      to: ["leon.noah@gmail.com"], // Changed to your verified email for testing
      subject: `הודעה חדשה מאתר מילון - מאת ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            הודעה חדשה מטופס יצירת קשר
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">פרטי הפונה:</h3>
            <p><strong>שם:</strong> ${name}</p>
            <p><strong>טלפון:</strong> ${phone}</p>
            <p><strong>אימייל:</strong> ${email}</p>
          </div>
          
          <div style="background-color: #fff; border-right: 4px solid #D4AF37; padding: 20px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">ההודעה:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
            <p>הודעה זו נשלחה מאתר משרד עורכי הדין מילון</p>
            <p><strong>הודעה זו נשלחה ל-${email} במקום ל-eyal@miloen.co.il לצורכי בדיקה</strong></p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    
    // Handle specific Resend errors
    if (error.message?.includes('API key')) {
      return new Response(
        JSON.stringify({ error: "שגיאה בהגדרת השרת - בעיה במפתח ה-API" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "שגיאה בשליחת האימייל. אנא נסו שוב מאוחר יותר." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
