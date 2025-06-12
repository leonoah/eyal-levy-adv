
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const { name, phone, email, message }: ContactFormData = await req.json();

    console.log('Received contact form:', { name, email, phone });

    // Validate required fields
    if (!name || !phone || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'כל השדות נדרשים' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
    if (!SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY not found');
      return new Response(
        JSON.stringify({ error: 'שגיאה בהגדרת השרת' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Prepare email data
    const emailData = {
      personalizations: [
        {
          to: [{ email: 'office@lawyer-example.com' }], // Replace with your actual email
          subject: `הודעה חדשה מאתר עורך הדין - ${name}`
        }
      ],
      from: { email: 'noreply@lawyer-example.com' }, // Replace with your verified SendGrid sender
      content: [
        {
          type: 'text/html',
          value: `
            <div dir="rtl" style="font-family: Arial, sans-serif;">
              <h2>הודעה חדשה מטופס יצירת הקשר</h2>
              <p><strong>שם:</strong> ${name}</p>
              <p><strong>טלפון:</strong> ${phone}</p>
              <p><strong>אימייל:</strong> ${email}</p>
              <p><strong>הודעה:</strong></p>
              <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
              <hr>
              <p style="color: #666; font-size: 12px;">הודעה זו נשלחה מאתר עורך הדין</p>
            </div>
          `
        }
      ]
    };

    // Send email via SendGrid
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SendGrid error:', response.status, errorText);
      
      return new Response(
        JSON.stringify({ error: 'שגיאה בשליחת האימייל' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('Email sent successfully via SendGrid');

    return new Response(
      JSON.stringify({ success: true, message: 'האימייל נשלח בהצלחה' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ error: 'שגיאה בשליחת האימייל' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
