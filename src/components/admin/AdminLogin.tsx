
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Attempting login with:', { username, password: '***' });
      
      const { data, error } = await supabase.functions.invoke('admin-login', {
        body: { username, password },
      });

      console.log('Response data:', data);
      console.log('Response error:', error);

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'שגיאה בהתחברות');
      }

      if (data && data.success) {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminUsername', username);
        onLogin(true);
        toast({
          title: "התחברות הצליחה",
          description: "ברוך הבא למערכת האדמין",
        });
      } else {
        toast({
          title: "שגיאה בהתחברות",
          description: data?.error || "שם משתמש או סיסמה שגויים",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "שגיאה בהתחברות",
        description: error instanceof Error ? error.message : "אנא נסה שוב מאוחר יותר",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-lawyer-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-lawyer-block border-lawyer-divider">
        <CardHeader className="text-center">
          <CardTitle className="text-lawyer-gold text-2xl">כניסה למערכת האדמין</CardTitle>
          <CardDescription className="text-lawyer-white">
            הכנס שם משתמש וסיסמה כדי להמשיך
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-lawyer-white">שם משתמש</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="lawyer-input bg-lawyer-black text-lawyer-white border-lawyer-divider"
                autoComplete="username"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lawyer-white">סיסמה</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="lawyer-input bg-lawyer-black text-lawyer-white border-lawyer-divider"
                autoComplete="current-password"
                required
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-lawyer-gold text-lawyer-black hover:bg-yellow-400"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  מתחבר...
                </>
              ) : (
                'התחבר'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
