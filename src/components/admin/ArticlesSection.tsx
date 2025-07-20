
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowRight, Edit, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SiteContent } from '@/types/admin';

interface ArticlesSectionProps {
  content: SiteContent;
  addArticle: (article: { title: string; excerpt: string; date: string; category: string }) => void;
  deleteArticle: (id: string) => void;
  updateArticle: (id: string, article: { title: string; excerpt: string; date: string; category: string }) => void;
}

export const ArticlesSection = ({ content, addArticle, deleteArticle, updateArticle }: ArticlesSectionProps) => {
  const [newArticle, setNewArticle] = useState({
    title: '',
    excerpt: '',
    date: '',
    category: ''
  });
  const [editingArticle, setEditingArticle] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    excerpt: '',
    date: '',
    category: ''
  });
  const { toast } = useToast();

  const handleAddArticle = () => {
    if (!newArticle.title || !newArticle.excerpt || !newArticle.category) {
      toast({
        title: "שגיאה",
        description: "אנא מלאו את כל השדות הנדרשים",
        variant: "destructive"
      });
      return;
    }

    addArticle(newArticle);
    setNewArticle({ title: '', excerpt: '', date: '', category: '' });
    toast({
      title: "מאמר נוסף בהצלחה",
      description: "המאמר נוסף לרשימה"
    });
  };

  const handleDeleteArticle = (id: string) => {
    deleteArticle(id);
    toast({
      title: "מאמר נמחק",
      description: "המאמר הוסר מהרשימה"
    });
  };

  const startEditing = (article: any) => {
    setEditingArticle(article.id);
    setEditForm({
      title: article.title,
      excerpt: article.excerpt,
      date: article.date,
      category: article.category
    });
  };

  const cancelEditing = () => {
    setEditingArticle(null);
    setEditForm({ title: '', excerpt: '', date: '', category: '' });
  };

  const saveEdit = () => {
    if (!editForm.title || !editForm.excerpt || !editForm.category) {
      toast({
        title: "שגיאה",
        description: "אנא מלאו את כל השדות הנדרשים",
        variant: "destructive"
      });
      return;
    }

    updateArticle(editingArticle!, editForm);
    setEditingArticle(null);
    setEditForm({ title: '', excerpt: '', date: '', category: '' });
    toast({
      title: "מאמר עודכן בהצלחה",
      description: "השינויים נשמרו"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-lawyer-block border-lawyer-divider">
        <h2 className="text-2xl font-bold text-lawyer-gold mb-6">הוספת מאמר חדש</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-lawyer-white text-base font-medium mb-2 block">כותרת המאמר</Label>
            <Input
              value={newArticle.title}
              onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
              className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
              placeholder="הכניסו כותרת"
            />
          </div>
          <div>
            <Label className="text-lawyer-white text-base font-medium mb-2 block">קטגוריה</Label>
            <Input
              value={newArticle.category}
              onChange={(e) => setNewArticle(prev => ({ ...prev, category: e.target.value }))}
              className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
              placeholder="דיני עבודה, נדל״ן, וכו׳"
            />
          </div>
          <div>
            <Label className="text-lawyer-white text-base font-medium mb-2 block">תאריך (אופציונלי)</Label>
            <Input
              value={newArticle.date}
              onChange={(e) => setNewArticle(prev => ({ ...prev, date: e.target.value }))}
              className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
              placeholder="1 במאי 2024"
            />
          </div>
        </div>
        <div className="mt-4">
          <Label className="text-lawyer-white text-base font-medium mb-2 block">תקציר המאמר</Label>
          <Textarea
            value={newArticle.excerpt}
            onChange={(e) => setNewArticle(prev => ({ ...prev, excerpt: e.target.value }))}
            className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
            rows={3}
            placeholder="תיאור קצר של המאמר"
          />
        </div>
        <Button onClick={handleAddArticle} className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400 px-6 py-3 font-semibold mt-4">
          <ArrowRight className="ml-2" size={16} />
          הוספת מאמר
        </Button>
      </Card>

      <Card className="p-6 bg-lawyer-block border-lawyer-divider">
        <h2 className="text-2xl font-bold text-lawyer-gold mb-6">מאמרים קיימים</h2>
        <div className="space-y-4">
          {content.articles.map((article) => (
            <div key={article.id} className="border border-lawyer-divider rounded-lg p-4 bg-lawyer-black">
              {editingArticle === article.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-lawyer-white text-sm font-medium mb-1 block">כותרת המאמר</Label>
                      <Input
                        value={editForm.title}
                        onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                        className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                      />
                    </div>
                    <div>
                      <Label className="text-lawyer-white text-sm font-medium mb-1 block">קטגוריה</Label>
                      <Input
                        value={editForm.category}
                        onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                        className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-lawyer-white text-sm font-medium mb-1 block">תאריך</Label>
                    <Input
                      value={editForm.date}
                      onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                      className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                    />
                  </div>
                  <div>
                    <Label className="text-lawyer-white text-sm font-medium mb-1 block">תקציר המאמר</Label>
                    <Textarea
                      value={editForm.excerpt}
                      onChange={(e) => setEditForm(prev => ({ ...prev, excerpt: e.target.value }))}
                      className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveEdit} className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400">
                      שמירה
                    </Button>
                    <Button onClick={cancelEditing} variant="outline" className="border-lawyer-silver text-lawyer-white hover:bg-lawyer-silver hover:text-lawyer-black">
                      <X className="mr-1" size={16} />
                      ביטול
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-lawyer-gold">{article.title}</h3>
                    <p className="text-lawyer-silver text-sm mt-1">{article.category} • {article.date}</p>
                    <p className="text-lawyer-white mt-2">{article.excerpt}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => startEditing(article)}
                      size="sm"
                      className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400"
                    >
                      <Edit className="mr-1" size={14} />
                      עריכה
                    </Button>
                    <Button
                      onClick={() => handleDeleteArticle(article.id)}
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      מחיקה
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
