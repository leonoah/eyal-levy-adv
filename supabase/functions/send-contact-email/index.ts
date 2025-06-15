
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

    // Create Supabase client to fetch admin contact email
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get contact email from admin settings
    console.log('Fetching admin contact email from database...');
    const { data: contactData, error: contactError } = await supabase
      .from('site_content')
      .select('content')
      .eq('section_name', 'contact')
      .single();

    if (contactError) {
      console.error('Error fetching contact data:', contactError);
      return new Response(
        JSON.stringify({ error: 'שגיאה בטעינת הגדרות המערכת' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const targetEmail = contactData?.content?.email || 'eyal@miloen.co.il';
    console.log('Target email from admin settings:', targetEmail);

    // Gmail configuration
    const GMAIL_USER = Deno.env.get('GMAIL_USER');
    const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD');
    
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      console.error('Gmail credentials not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'שגיאה בהגדרת השרת - חסרים פרטי Gmail' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('Gmail credentials found, preparing email...');
    console.log('Sending email to:', targetEmail);

    // Create SMTP client
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 587,
        tls: true,
        auth: {
          username: GMAIL_USER,
          password: GMAIL_APP_PASSWORD,
        },
      },
    });

    // Prepare email content
    const emailContent = `
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
    `;

    console.log('Connecting to Gmail SMTP...');

    // Send email
    await client.send({
      from: GMAIL_USER,
      to: targetEmail,
      subject: `הודעה חדשה מאתר עורך הדין - ${name}`,
      content: emailContent,
      html: emailContent,
    });

    console.log('Email sent successfully via Gmail SMTP to:', targetEmail);

    // Close the connection
    await client.close();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'האימייל נשלח בהצלחה',
        timestamp: new Date().toISOString(),
        sentTo: targetEmail
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'שגיאה בשליחת האימייל',
        details: error.message
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
