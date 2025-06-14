
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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

    // Get admin email from site_content
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: contactData, error: contactError } = await supabase
      .from('site_content')
      .select('content')
      .eq('section_name', 'contact')
      .single();

    let adminEmail = 'leon.noah@gmail.com'; // fallback
    
    if (!contactError && contactData?.content?.email) {
      adminEmail = contactData.content.email;
      console.log('Using admin email from database:', adminEmail);
    } else {
      console.log('Could not fetch admin email, using fallback:', adminEmail);
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'שגיאה בהגדרת השרת - חסר מפתח API' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('Resend API key found, preparing email...');

    // Prepare email data for Resend
    const emailData = {
      from: 'מאתר עורך הדין <onboarding@resend.dev>',
      to: [adminEmail],
      subject: `הודעה חדשה מאתר עורך הדין - ${name}`,
      html: `
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
    };

    console.log('Sending email via Resend to:', adminEmail);

    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    console.log('Resend response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend error:', response.status, errorText);
      
      return new Response(
        JSON.stringify({ 
          error: 'שגיאה בשליחת האימייל',
          details: `Resend error: ${response.status}`,
          resendError: errorText
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const responseData = await response.json();
    console.log('Email sent successfully via Resend:', responseData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'האימייל נשלח בהצלחה',
        timestamp: new Date().toISOString(),
        sentTo: adminEmail
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
