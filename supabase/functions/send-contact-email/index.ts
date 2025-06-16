
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

    // For production, change this to eyal@miloen.co.il after verifying a domain
    // Currently sending to verified email for testing
    const emailResponse = await resend.emails.send({
      from: "טופס יצירת קשר <onboarding@resend.dev>",
      to: ["leon.noah@gmail.com"], // CHANGE TO: ["eyal@miloen.co.il"] after domain verification
      subject: `🚨 [TESTING MODE] הודעה חדשה מאתר מילון - מאת ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #ff6b6b; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
            <h3 style="margin: 0; color: white;">⚠️ מצב בדיקה - האימייל הזה צריך להגיע לעיאל ⚠️</h3>
            <p style="margin: 5px 0; color: white;">כדי לתקן: יש לוודא דומיין ב-Resend ולשנות את הכתובת בקוד</p>
          </div>
          
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
          
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #856404; margin-top: 0;">מה צריך לעשות לייצור:</h4>
            <ol style="color: #856404; margin: 0;">
              <li>לכו ל-<a href="https://resend.com/domains" style="color: #856404;">resend.com/domains</a></li>
              <li>וודאו את הדומיין של עיאל (miloen.co.il)</li>
              <li>שנו את ה-from address ל: noreply@miloen.co.il</li>
              <li>שנו את ה-to address ל: eyal@miloen.co.il</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
            <p>הודעה זו נשלחה מאתר משרד עורכי הדין מילון</p>
            <p><strong style="color: #ff6b6b;">האימייל הזה אמור להגיע ל-eyal@miloen.co.il אבל נשלח לכאן לבדיקה</strong></p>
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
