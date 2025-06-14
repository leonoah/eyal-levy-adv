
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Star, Save, X } from 'lucide-react';
import { useTestimonials, Testimonial } from '@/hooks/useTestimonials';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const TestimonialsSection = () => {
  const { testimonials, isLoading, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    text: '',
    rating: 5,
    image_url: '',
    display_order: 0,
    is_active: true
  });

  const resetForm = () => {
    setFormData({
      name: '',
      text: '',
      rating: 5,
      image_url: '',
      display_order: testimonials.length + 1,
      is_active: true
    });
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name,
      text: testimonial.text,
      rating: testimonial.rating,
      image_url: testimonial.image_url || '',
      display_order: testimonial.display_order,
      is_active: testimonial.is_active
    });
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateTestimonial(editingId, formData);
        toast({
          title: "ההמלצה עודכנה בהצלחה",
          description: "השינויים נשמרו במסד הנתונים",
        });
        setEditingId(null);
      } else {
        await addTestimonial(formData);
        toast({
          title: "ההמלצה נוספה בהצלחה",
          description: "ההמלצה החדשה נשמרה במסד הנתונים",
        });
        setShowAddForm(false);
      }
      resetForm();
    } catch (error) {
      toast({
        title: "שגיאה בשמירת ההמלצה",
        description: "אנא נסה שוב",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את ההמלצה?')) {
      try {
        await deleteTestimonial(id);
        toast({
          title: "ההמלצה נמחקה בהצלחה",
          description: "ההמלצה הוסרה ממסד הנתונים",
        });
      } catch (error) {
        toast({
          title: "שגיאה במחיקת ההמלצה",
          description: "אנא נסה שוב",
          variant: "destructive"
        });
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    resetForm();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-lawyer-block rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-lawyer-block rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Star className="text-lawyer-gold" size={24} />
          <h2 className="text-2xl font-bold text-lawyer-gold">ניהול המלצות</h2>
        </div>
        <Button
          onClick={() => {
            setShowAddForm(true);
            resetForm();
          }}
          className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400"
        >
          <Plus className="ml-2" size={16} />
          הוספת המלצה חדשה
        </Button>
      </div>

      {(showAddForm || editingId) && (
        <Card className="bg-lawyer-block border-lawyer-divider">
          <CardHeader>
            <CardTitle className="text-lawyer-gold">
              {editingId ? 'עריכת המלצה' : 'הוספת המלצה חדשה'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-lawyer-white">שם המליץ</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="lawyer-input"
                  placeholder="שם המליץ"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-lawyer-white">דירוג</Label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                  className="lawyer-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lawyer-white">תוכן ההמלצה</Label>
              <Textarea
                value={formData.text}
                onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                className="lawyer-input min-h-[100px]"
                placeholder="תוכן ההמלצה..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-lawyer-white">URL תמונה (אופציונלי)</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  className="lawyer-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-lawyer-white">סדר תצוגה</Label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) }))}
                  className="lawyer-input"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is-active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is-active" className="text-lawyer-white">פעיל</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400">
                <Save className="ml-2" size={16} />
                שמירה
              </Button>
              <Button onClick={handleCancel} variant="outline" className="border-lawyer-divider text-lawyer-silver hover:bg-lawyer-block hover:text-lawyer-white">
                <X className="ml-2" size={16} />
                ביטול
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-lawyer-block border-lawyer-divider">
        <CardHeader>
          <CardTitle className="text-lawyer-gold">רשימת המלצות</CardTitle>
          <CardDescription className="text-lawyer-silver">
            נהל את כל ההמלצות באתר
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-lawyer-divider">
                <TableHead className="text-lawyer-white">שם</TableHead>
                <TableHead className="text-lawyer-white">המלצה</TableHead>
                <TableHead className="text-lawyer-white">דירוג</TableHead>
                <TableHead className="text-lawyer-white">סדר</TableHead>
                <TableHead className="text-lawyer-white">סטטוס</TableHead>
                <TableHead className="text-lawyer-white">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id} className="border-lawyer-divider">
                  <TableCell className="text-lawyer-white font-medium">
                    {testimonial.name}
                  </TableCell>
                  <TableCell className="text-lawyer-silver max-w-xs truncate">
                    {testimonial.text}
                  </TableCell>
                  <TableCell className="text-lawyer-silver">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} className="text-lawyer-gold fill-current" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-lawyer-silver">
                    {testimonial.display_order}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      testimonial.is_active 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-red-900 text-red-300'
                    }`}>
                      {testimonial.is_active ? 'פעיל' : 'לא פעיל'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(testimonial)}
                        size="sm"
                        variant="outline"
                        className="border-lawyer-divider text-lawyer-silver hover:bg-lawyer-charcoal hover:text-lawyer-white"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        onClick={() => handleDelete(testimonial.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-900 hover:text-red-300"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialsSection;
