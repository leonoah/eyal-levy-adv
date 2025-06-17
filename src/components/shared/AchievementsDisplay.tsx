
import { Award, Users, TrendingUp, Clock, CheckCircle, Star, Shield, Heart } from 'lucide-react';

interface Achievement {
  icon: string;
  text: string;
}

interface AchievementsDisplayProps {
  achievements: Achievement[];
  variant?: 'hero' | 'testimonials';
  className?: string;
}

const AchievementsDisplay = ({ achievements, variant = 'hero', className = '' }: AchievementsDisplayProps) => {
  const iconMap = {
    Award,
    Users,
    TrendingUp,
    Clock,
    CheckCircle,
    Star,
    Shield,
    Heart
  };

  const baseClasses = variant === 'hero' 
    ? "grid grid-cols-2 gap-3 text-sm"
    : "flex flex-wrap justify-center gap-6";

  const itemClasses = variant === 'hero'
    ? "flex items-center justify-center gap-2 text-[#c5a56d] font-semibold"
    : "trust-badge";

  return (
    <div className={`${baseClasses} ${className}`}>
      {achievements && achievements.length > 0 ? achievements.map((achievement, index) => {
        const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Award;
        return (
          <div key={`achievement-${index}`} className={itemClasses}>
            <IconComponent size={variant === 'hero' ? 16 : 20} className={variant === 'hero' ? '' : 'legal-icon'} />
            <span>{achievement.text}</span>
          </div>
        );
      }) : (
        // Fallback if no achievements are set
        <>
          <div className={itemClasses}>
            <Award size={variant === 'hero' ? 16 : 20} className={variant === 'hero' ? '' : 'legal-icon'} />
            <span>ניסיון עשיר +15 שנים</span>
          </div>
          <div className={itemClasses}>
            <Users size={variant === 'hero' ? 16 : 20} className={variant === 'hero' ? '' : 'legal-icon'} />
            <span>לקוחות מרוצים</span>
          </div>
          <div className={itemClasses}>
            <TrendingUp size={variant === 'hero' ? 16 : 20} className={variant === 'hero' ? '' : 'legal-icon'} />
            <span>שיעור הצלחה גבוה</span>
          </div>
          <div className={itemClasses}>
            <Clock size={variant === 'hero' ? 16 : 20} className={variant === 'hero' ? '' : 'legal-icon'} />
            <span>זמינות 24/7</span>
          </div>
        </>
      )}
    </div>
  );
};

export default AchievementsDisplay;
