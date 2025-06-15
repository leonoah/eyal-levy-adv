
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
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
    console.log('Starting send-contact-email function');
    
    const { name, phone, email, message }: ContactFormData = await req.json();

    console.log('Received contact form data:', { name, email, phone });

    // Validate required fields
    if (!name || !phone || !email || !message) {
      console.log('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'כל השדות נדרשים' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Create Supabase client to fetch admin contact email
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return new Response(
        JSON.stringify({ error: 'שגיאה בהגדרת השרת' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get contact email from admin settings
    console.log('Fetching admin contact email from database...');
    let targetEmail = 'eyal@miloen.co.il'; // Default fallback
    
    try {
      const { data: contactData, error: contactError } = await supabase
        .from('site_content')
        .select('content')
        .eq('section_name', 'contact')
        .single();

      if (!contactError && contactData?.content?.email) {
        targetEmail = contactData.content.email;
        console.log('Using admin email from database:', targetEmail);
      } else {
        console.log('Using fallback email:', targetEmail);
      }
    } catch (dbError) {
      console.log('Error fetching contact data, using fallback email:', dbError);
    }

    // Check for Resend API key
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('Resend API key not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'שגיאה בהגדרת השרת - חסר מפתח Resend' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('Resend API key found, preparing email...');
    console.log('Sending email to:', targetEmail);

    // Initialize Resend
    const resend = new Resend(resendApiKey);

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

    // Send email using Resend
    try {
      const emailResponse = await resend.emails.send({
        from: 'Lawyer Website <onboarding@resend.dev>',
        to: [targetEmail],
        subject: `הודעה חדשה מאתר עורך הדין - ${name}`,
        html: emailContent,
      });

      console.log('Email sent successfully via Resend:', emailResponse);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'האימייל נשלח בהצלחה',
          timestamp: new Date().toISOString(),
          sentTo: targetEmail,
          emailId: emailResponse.data?.id
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
      
    } catch (emailError) {
      console.error('Error sending email via Resend:', emailError);
      return new Response(
        JSON.stringify({ 
          error: 'שגיאה בשליחת האימייל',
          details: emailError.message
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

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
