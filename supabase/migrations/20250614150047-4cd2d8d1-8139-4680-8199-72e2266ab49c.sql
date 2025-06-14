
-- Create a table for site content
CREATE TABLE public.site_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name text NOT NULL UNIQUE,
  content jsonb NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default content sections
INSERT INTO public.site_content (section_name, content) VALUES
('hero', '{
  "title": "עו\"ד אייל לוי",
  "subtitle": "משרד עורכי דין – דיני עבודה, נדל\"ן, ליטיגציה",
  "description": "ייעוץ משפטי מקצועי ומסור עם ניסיון רב בתחומי הדין השונים. אנו מתמחים במתן פתרונות משפטיים יעילים ומותאמים אישית לכל לקוח."
}'::jsonb),
('about', '{
  "title": "אודות עו\"ד אייל לוי",
  "description1": "עו\"ד אייל לוי הוא עורך דין מנוסה עם ניסיון רב שנים בתחומי הדין השונים. הוא מתמחה במתן ייעוץ משפטי מקצועי ומסור, תוך הקפדה על שירות אישי ומותאם לכל לקוח.",
  "description2": "המשרד מתמחה בדיני עבודה, נדל\"ן, ליטיגציה ודיני משפחה. אנו גאים בשירות המקצועי והאמין שאנו מעניקים ללקוחותינו ובשיעור ההצלחה הגבוה שלנו בתיקים השונים.",
  "image": "/lovable-uploads/2e50d3be-b4db-4bf9-a1df-a4f54e34d9eb.png"
}'::jsonb),
('contact', '{
  "phone": "03-1234567",
  "email": "eyal@lawyer.co.il",
  "address": "תל אביב, ישראל"
}'::jsonb),
('achievements', '[
  {"icon": "Award", "text": "יותר מ-15 שנות ניסיון"},
  {"icon": "Users", "text": "מאות לקוחות מרוצים"},
  {"icon": "CheckCircle", "text": "שיעור הצלחה גבוה"},
  {"icon": "Clock", "text": "זמינות 24/7"}
]'::jsonb),
('services', '[
  {"icon": "Scale", "title": "דיני עבודה", "description": "ייצוג עובדים ומעסיקים, הסכמי עבודה, פיטורים ותביעות עבודה"},
  {"icon": "Home", "title": "דיני נדל\"ן", "description": "עסקאות קנייה ומכירה, חוזי שכירות, יעוץ במקרקעין והסכמי בנייה"},
  {"icon": "FileText", "title": "ליטיגציה", "description": "ייצוג בבתי משפט, הגשת תביעות אזרחיות וטיפול בסכסוכים משפטיים"},
  {"icon": "Users", "title": "דיני משפחה", "description": "גירושין, הסכמי מזונות, משמורת ילדים וחלוקת רכוש משותף"}
]'::jsonb),
('articles', '[
  {
    "id": "1",
    "title": "זכויות עובדים בישראל - מדריך מקיף",
    "excerpt": "הכירו את זכויותיכם כעובדים והבינו איך להגן עליהן. מדריך מפורט לזכויות עובדים בחוק העבודה הישראלי.",
    "date": "15 במאי 2024",
    "category": "דיני עבודה"
  },
  {
    "id": "2",
    "title": "קניית דירה - מה חשוב לדעת לפני החתימה",
    "excerpt": "טיפים חשובים לקונים מתחילים ומנוסים. הכירו את החוזים, הבדיקות הנדרשות והמלכודות הנפוצות.",
    "date": "8 במאי 2024",
    "category": "דיני נדל\"ן"
  },
  {
    "id": "3",
    "title": "הליכי גירושין - מדריך שלב אחר שלב",
    "excerpt": "המדריך המלא להליכי גירושין בישראל. הכל על חלוקת רכוש, מזונות, משמורת ילדים והליכים משפטיים.",
    "date": "1 במאי 2024",
    "category": "דיני משפחה"
  }
]'::jsonb);

-- Add Row Level Security (RLS)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view site content" 
  ON public.site_content 
  FOR SELECT 
  USING (true);

-- Create policy for admin update access
CREATE POLICY "Allow all updates for now" 
  ON public.site_content 
  FOR UPDATE 
  USING (true);

-- Create policy for admin insert access
CREATE POLICY "Allow all inserts for now" 
  ON public.site_content 
  FOR INSERT 
  WITH CHECK (true);
