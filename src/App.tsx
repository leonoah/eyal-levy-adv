
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AccessibilityStatement from "./pages/AccessibilityStatement";

const queryClient = new QueryClient();

// Handle API routes for admin functions
const handleApiRoute = async (path: string, request: Request) => {
  const functionName = path.replace('/api/', '');
  const { data, error } = await supabase.functions.invoke(functionName, {
    body: await request.text(),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (error) throw error;
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};

// Intercept fetch requests for API routes
const originalFetch = window.fetch;
window.fetch = function(input: RequestInfo | URL, init?: RequestInit) {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  
  if (url.startsWith('/api/')) {
    const request = new Request(input, init);
    return handleApiRoute(url, request);
  }
  
  return originalFetch(input, init);
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
