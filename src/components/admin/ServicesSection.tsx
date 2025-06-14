
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SiteContent } from '@/types/admin';

interface ServicesSectionProps {
  content: SiteContent;
  updateServices: (services: SiteContent['services']) => void;
}

const iconOptions = [
  { value: 'Scale', label: 'מאזניים (Scale)' },
  { value: 'Home', label: 'בית (Home)' },
  { value: 'FileText', label: 'מסמך (FileText)' },
  { value: 'Users', label: 'אנשים (Users)' },
  { value: 'Briefcase', label: 'תיק (Briefcase)' },
  { value: 'Shield', label: 'מגן (Shield)' },
  { value: 'Gavel', label: 'פטיש שופט (Gavel)' },
  { value: 'Building', label: 'בניין (Building)' }
];

export const ServicesSection = ({ content, updateServices }: ServicesSectionProps) => {
  const handleServiceChange = (index: number, field: keyof SiteContent['services'][0], value: string) => {
    if (!content.services) return;
    
    const updatedServices = [...content.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    updateServices(updatedServices);
  };

  // אם אין services, נציג הודעה
  if (!content.services || content.services.length === 0) {
    return (
      <Card className="p-6 bg-lawyer-block border-lawyer-divider">
        <h2 className="text-2xl font-bold text-lawyer-gold mb-6">עריכת תחומי התמחות</h2>
        <p className="text-lawyer-white">אין תחומי התמחות להצגה</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-lawyer-block border-lawyer-divider">
      <h2 className="text-2xl font-bold text-lawyer-gold mb-6">עריכת תחומי התמחות</h2>
      <div className="space-y-8">
        {content.services.map((service, index) => (
          <div key={`service-edit-${index}`} className="p-4 border border-lawyer-divider rounded-lg bg-lawyer-black">
            <h3 className="text-lg font-semibold text-lawyer-gold mb-4">תחום התמחות {index + 1}</h3>
            
            <div className="space-y-4">
              {/* Icon Selection */}
              <div>
                <Label htmlFor={`service-icon-${index}`} className="text-lawyer-white text-base font-medium mb-2 block">
                  אייקון
                </Label>
                <Select 
                  value={service.icon} 
                  onValueChange={(value) => handleServiceChange(index, 'icon', value)}
                >
                  <SelectTrigger className="bg-lawyer-black border-lawyer-silver text-lawyer-white">
                    <SelectValue placeholder="בחר אייקון" />
                  </SelectTrigger>
                  <SelectContent className="bg-lawyer-black border-lawyer-silver">
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-lawyer-white hover:bg-lawyer-gold hover:text-lawyer-black">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div>
                <Label htmlFor={`service-title-${index}`} className="text-lawyer-white text-base font-medium mb-2 block">
                  כותרת
                </Label>
                <Input
                  id={`service-title-${index}`}
                  value={service.title}
                  onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                  className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor={`service-description-${index}`} className="text-lawyer-white text-base font-medium mb-2 block">
                  תיאור
                </Label>
                <Textarea
                  id={`service-description-${index}`}
                  value={service.description}
                  onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                  className="bg-lawyer-black border-lawyer-silver text-lawyer-white placeholder-lawyer-silver focus:border-lawyer-gold min-h-[100px]"
                  rows={4}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
