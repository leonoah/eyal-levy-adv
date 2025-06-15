
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Key } from 'lucide-react';

const PasswordChangeSection = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "שגיאה",
        description: "הסיסמאות החדשות אינן תואמות",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "שגיאה",
        description: "הסיסמה החדשה חייבת להכיל לפחות 6 תווים",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const username = localStorage.getItem('adminUsername');
      const response = await fetch('/api/admin-change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username,
          currentPassword, 
          newPassword 
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "הסיסמה שונתה בהצלחה",
          description: "הסיסמה החדשה נשמרה במערכת",
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast({
          title: "שגיאה בשינוי הסיסמה",
          description: data.error || "אנא בדוק את הסיסמה הנוכחית",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "שגיאה בשינוי הסיסמה",
        description: "אנא נסה שוב מאוחר יותר",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-lawyer-block border-lawyer-divider">
      <CardHeader>
        <CardTitle className="text-lawyer-gold flex items-center gap-2">
          <Key size={20} />
          שינוי סיסמה
        </CardTitle>
        <CardDescription className="text-lawyer-white">
          שנה את סיסמת האדמין שלך
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-lawyer-white">סיסמה נוכחית</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="lawyer-input bg-lawyer-black text-lawyer-white border-lawyer-divider"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-lawyer-white">סיסמה חדשה</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="lawyer-input bg-lawyer-black text-lawyer-white border-lawyer-divider"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-lawyer-white">אישור סיסמה חדשה</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="lawyer-input bg-lawyer-black text-lawyer-white border-lawyer-divider"
              required
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                שומר...
              </>
            ) : (
              'שמור סיסמה חדשה'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PasswordChangeSection;
