
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminLogin from './AdminLogin';
import AdminContent from './AdminContent';

const AdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('adminAuth');
      setIsAuthenticated(authStatus === 'true');
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUsername');
    setIsAuthenticated(false);
    toast({
      title: "התנתקת בהצלחה",
      description: "תוכל להתחבר שוב בכל עת",
    });
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-lawyer-black text-lawyer-white flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          <span>בודק הרשאות...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminContent onLogout={handleLogout} />;
};

export default AdminAuth;
