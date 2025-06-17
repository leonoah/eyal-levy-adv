
import { Button } from '@/components/ui/button';
import { Save, Eye, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  onSaveContent: () => void;
  onLogout: () => void;
}

const AdminHeader = ({ onSaveContent, onLogout }: AdminHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold text-lawyer-gold">ניהול תוכן האתר</h1>
      <div className="flex gap-4">
        <Button 
          onClick={onSaveContent}
          className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400 px-6 py-3 font-semibold"
        >
          <Save className="ml-2" size={20} />
          שמירת שינויים
        </Button>
        <Button 
          onClick={() => window.open('/', '_blank')}
          className="bg-lawyer-silver text-lawyer-black hover:bg-gray-300 px-6 py-3 font-semibold"
        >
          <Eye className="ml-2" size={20} />
          צפייה באתר
        </Button>
        <Button 
          onClick={onLogout}
          className="bg-red-600 text-white hover:bg-red-700 px-6 py-3 font-semibold"
        >
          <LogOut className="ml-2" size={20} />
          התנתק
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
