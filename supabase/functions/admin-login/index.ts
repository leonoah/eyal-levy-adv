
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { compareSync } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LoginRequest {
  username: string;
  password: string;
}

const handler = async (req: Request): Promise<Response> => {
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
    const { username, password }: LoginRequest = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'שם משתמש וסיסמה נדרשים' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Attempting login for username:', username);

    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('username, password_hash')
      .eq('username', username)
      .single();

    if (error || !adminUser) {
      console.log('User not found or error:', error);
      return new Response(
        JSON.stringify({ error: 'שם משתמש או סיסמה שגויים' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // For the default user, compare with plain password first
    let isValidPassword = false;
    if (username === 'eyall' && password === 'El224466') {
      // Update to hashed password on first login
      const bcrypt = await import("https://deno.land/x/bcrypt@v0.4.1/mod.ts");
      const hashedPassword = await bcrypt.hash(password);
      
      await supabase
        .from('admin_users')
        .update({ password_hash: hashedPassword })
        .eq('username', username);
      
      isValidPassword = true;
    } else {
      // Compare with hashed password
      isValidPassword = compareSync(password, adminUser.password_hash);
    }

    if (!isValidPassword) {
      console.log('Invalid password for user:', username);
      return new Response(
        JSON.stringify({ error: 'שם משתמש או סיסמה שגויים' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('Login successful for user:', username);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'התחברות הצליחה' 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Error in admin-login function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'שגיאה בהתחברות',
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
