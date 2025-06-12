
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Save, Eye, ArrowRight, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    title: string;
    description1: string;
    description2: string;
    image?: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  articles: Array<{
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
  }>;
}

const defaultContent: SiteContent = {
  hero: {
    title: 'עו"ד אייל לוי',
    subtitle: 'משרד עורכי דין – דיני עבודה, נדל"ן, ליטיגציה',
    description: 'ייעוץ משפטי מקצועי ומסור עם ניסיון רב בתחומי הדין השונים. אנו מתמחים במתן פתרונות משפטיים יעילים ומותאמים אישית לכל לקוח.'
  },
  about: {
    title: 'אודות עו"ד אייל לוי',
    description1: 'עו"ד אייל לוי הוא עורך דין מנוסה עם ניסיון רב שנים בתחומי הדין השונים. הוא מתמחה במתן ייעוץ משפטי מקצועי ומסור, תוך הקפדה על שירות אישי ומותאם לכל לקוח.',
    description2: 'המשרד מתמחה בדיני עבודה, נדל"ן, ליטיגציה ודיני משפחה. אנו גאים בשירות המקצועי והאמין שאנו מעניקים ללקוחותינו ובשיעור ההצלחה הגבוה שלנו בתיקים השונים.'
  },
  contact: {
    phone: '03-1234567',
    email: 'eyal@lawyer.co.il',
    address: 'תל אביב, ישראל'
  },
  articles: [
    {
      id: '1',
      title: 'זכויות עובדים בישראל - מדריך מקיף',
      excerpt: 'הכירו את זכויותיכם כעובדים והבינו איך להגן עליהן. מדריך מפורט לזכויות עובדים בחוק העבודה הישראלי.',
      date: '15 במאי 2024',
      category: 'דיני עבודה'
    },
    {
      id: '2',
      title: 'קניית דירה - מה חשוב לדעת לפני החתימה',
      excerpt: 'טיפים חשובים לקונים מתחילים ומנוסים. הכירו את החוזים, הבדיקות הנדרשות והמלכודות הנפוצות.',
      date: '8 במאי 2024',
      category: 'דיני נדל"ן'
    },
    {
      id: '3',
      title: 'הליכי גירושין - מדריך שלב אחר שלב',
      excerpt: 'המדריך המלא להליכי גירושין בישראל. הכל על חלוקת רכוש, מזונות, משמורת ילדים והליכים משפטיים.',
      date: '1 במאי 2024',
      category: 'דיני משפחה'
    }
  ]
};

const Admin = () => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [newArticle, setNewArticle] = useState({
    title: '',
    excerpt: '',
    date: '',
    category: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const saveContent = () => {
    localStorage.setItem('siteContent', JSON.stringify(content));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('contentUpdated', { detail: content }));
    toast({
      title: "התוכן נשמר בהצלחה",
      description: "השינויים יופיעו באתר אחרי רענון העמוד",
    });
  };

  const updateHero = (field: keyof SiteContent['hero'], value: string) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateAbout = (field: keyof SiteContent['about'], value: string) => {
    setContent(prev => ({
      ...prev,
      about: { ...prev.about, [field]: value }
    }));
  };

  const updateContact = (field: keyof SiteContent['contact'], value: string) => {
    setContent(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateAbout('image', result);
        toast({
          title: "התמונה הועלתה בהצלחה",
          description: "התמונה נשמרה ותופיע בסקשן האודות"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addArticle = () => {
    if (!newArticle.title || !newArticle.excerpt || !newArticle.category) {
      toast({
        title: "שגיאה",
        description: "אנא מלאו את כל השדות הנדרשים",
        variant: "destructive"
      });
      return;
    }

    const article = {
      ...newArticle,
      id: Date.now().toString(),
      date: newArticle.date || new Date().toLocaleDateString('he-IL')
    };

    setContent(prev => ({
      ...prev,
      articles: [article, ...prev.articles]
    }));

    setNewArticle({ title: '', excerpt: '', date: '', category: '' });
    toast({
      title: "מאמר נוסף בהצלחה",
      description: "המאמר נוסף לרשימה"
    });
  };

  const deleteArticle = (id: string) => {
    setContent(prev => ({
      ...prev,
      articles: prev.articles.filter(article => article.id !== id)
    }));
    toast({
      title: "מאמר נמחק",
      description: "המאמר הוסר מהרשימה"
    });
  };

  return (
    <div className="min-h-screen bg-lawyer-black text-lawyer-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-lawyer-gold">ניהול תוכן האתר</h1>
          <div className="flex gap-4">
            <Button 
              onClick={saveContent}
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
          </div>
        </div>

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-lawyer-block border border-lawyer-divider">
            <TabsTrigger value="hero" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">עמוד ראשי</TabsTrigger>
            <TabsTrigger value="about" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">אודות</TabsTrigger>
            <TabsTrigger value="articles" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">מאמרים</TabsTrigger>
            <TabsTrigger value="contact" className="text-lawyer-white data-[state=active]:bg-lawyer-gold data-[state=active]:text-lawyer-black">יצירת קשר</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card className="p-6 bg-lawyer-block border-lawyer-divider">
              <h2 className="text-2xl font-bold text-lawyer-gold mb-6">עריכת עמוד ראשי</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="hero-title" className="text-lawyer-white text-base font-medium mb-2 block">כותרת ראשית</Label>
                  <Input
                    id="hero-title"
                    value={content.hero.title}
                    onChange={(e) => updateHero('title', e.target.value)}
                    className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                  />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle" className="text-lawyer-white text-base font-medium mb-2 block">כותרת משנה</Label>
                  <Input
                    id="hero-subtitle"
                    value={content.hero.subtitle}
                    onChange={(e) => updateHero('subtitle', e.target.value)}
                    className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                  />
                </div>
                <div>
                  <Label htmlFor="hero-description" className="text-lawyer-white text-base font-medium mb-2 block">תיאור</Label>
                  <Textarea
                    id="hero-description"
                    value={content.hero.description}
                    onChange={(e) => updateHero('description', e.target.value)}
                    className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                    rows={4}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card className="p-6 bg-lawyer-block border-lawyer-divider">
              <h2 className="text-2xl font-bold text-lawyer-gold mb-6">עריכת עמוד אודות</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="about-title" className="text-lawyer-white text-base font-medium mb-2 block">כותרת</Label>
                  <Input
                    id="about-title"
                    value={content.about.title}
                    onChange={(e) => updateAbout('title', e.target.value)}
                    className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                  />
                </div>
                <div>
                  <Label htmlFor="about-desc1" className="text-lawyer-white text-base font-medium mb-2 block">פסקה ראשונה</Label>
                  <Textarea
                    id="about-desc1"
                    value={content.about.description1}
                    onChange={(e) => updateAbout('description1', e.target.value)}
                    className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="about-desc2" className="text-lawyer-white text-base font-medium mb-2 block">פסקה שנייה</Label>
                  <Textarea
                    id="about-desc2"
                    value={content.about.description2}
                    onChange={(e) => updateAbout('description2', e.target.value)}
                    className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                    rows={4}
                  />
                </div>
                <div>
                  <Label className="text-lawyer-white text-base font-medium mb-2 block">תמונה אישית</Label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Button 
                        onClick={() => document.getElementById('image-upload')?.click()}
                        className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400 px-6 py-3 font-semibold"
                      >
                        <Upload className="ml-2" size={20} />
                        העלאת תמונה
                      </Button>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      {content.about.image && (
                        <span className="text-lawyer-silver text-sm">תמונה הועלתה בהצלחה</span>
                      )}
                    </div>
                    {content.about.image && (
                      <div>
                        <p className="text-lawyer-silver text-sm mb-2">תצוגה מקדימה:</p>
                        <img 
                          src={content.about.image} 
                          alt="תצוגה מקדימה" 
                          className="w-32 h-32 object-cover rounded border border-lawyer-gold"
                        />
                        <Button 
                          onClick={() => updateAbout('image', '')}
                          variant="destructive"
                          size="sm"
                          className="mt-2"
                        >
                          הסרת תמונה
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="articles">
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
                <Button onClick={addArticle} className="bg-lawyer-gold text-lawyer-black hover:bg-yellow-400 px-6 py-3 font-semibold mt-4">
                  <ArrowRight className="ml-2" size={16} />
                  הוספת מאמר
                </Button>
              </Card>

              <Card className="p-6 bg-lawyer-block border-lawyer-divider">
                <h2 className="text-2xl font-bold text-lawyer-gold mb-6">מאמרים קיימים</h2>
                <div className="space-y-4">
                  {content.articles.map((article) => (
                    <div key={article.id} className="border border-lawyer-divider rounded-lg p-4 bg-lawyer-black">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-lawyer-gold">{article.title}</h3>
                          <p className="text-lawyer-silver text-sm mt-1">{article.category} • {article.date}</p>
                          <p className="text-lawyer-white mt-2">{article.excerpt}</p>
                        </div>
                        <Button
                          onClick={() => deleteArticle(article.id)}
                          variant="destructive"
                          size="sm"
                          className="ml-4 bg-red-600 text-white hover:bg-red-700"
                        >
                          מחיקה
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="p-6 bg-lawyer-block border-lawyer-divider">
              <h2 className="text-2xl font-bold text-lawyer-gold mb-6">עריכת פרטי קשר</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="contact-phone" className="text-lawyer-white text-base font-medium mb-2 block">טלפון</Label>
                  <Input
                    id="contact-phone"
                    value={content.contact.phone}
                    onChange={(e) => updateContact('phone', e.target.value)}
                    className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email" className="text-lawyer-white text-base font-medium mb-2 block">אימייל</Label>
                  <Input
                    id="contact-email"
                    value={content.contact.email}
                    onChange={(e) => updateContact('email', e.target.value)}
                    className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-address" className="text-lawyer-white text-base font-medium mb-2 block">כתובת</Label>
                  <Input
                    id="contact-address"
                    value={content.contact.address}
                    onChange={(e) => updateContact('address', e.target.value)}
                    className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
