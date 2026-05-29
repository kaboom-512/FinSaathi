import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useTranslation } from 'react-i18next';
import { useSupabase } from '../context/SupabaseContext';

const LearnEarn = () => {
  const { supabase } = useSupabase();
  const { t } = useTranslation();
  const [modules, setModules] = useState([]);
  
  React.useEffect(() => {
    const fetchModules = async () => {
      if (!supabase) return;
      const { data } = await supabase.from('learn_modules').select('*');
      if (data) setModules(data);
    };
    fetchModules();
  }, [supabase]);


  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div className="flex justify-between items-center" style={{ background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))', padding: '2rem', borderRadius: 'var(--radius-lg)', color: 'white' }}>
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">{t("Learn & Earn")}</h1>
          <p className="opacity-90">{t("Improve financial literacy and earn reward points.")}</p>
        </div>
        <div className="text-center" style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(10px)' }}>
          <p className="text-sm uppercase tracking-wider font-semibold opacity-90">{t("Your Points")}</p>
          <div className="flex items-center gap-2 justify-center mt-1">
            <Icons.Trophy size={24} color="#fcd34d" />
            <span className="text-3xl font-bold">250</span>
          </div>
        </div>
      </div>

      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {modules.map(mod => {
          const IconComponent = Icons[mod.icon] || Icons.BookOpen;
          return (
          <Card key={mod.id} className="hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div style={{ background: `var(--color-${mod.color}-subtle)`, padding: '0.75rem', borderRadius: 'var(--radius-md)', color: `var(--color-${mod.color})` }}>
                  <IconComponent size={28} />
                </div>
                <Badge variant={mod.category === 'Beginner' ? 'success' : 'primary'}>+{mod.points} {t("pts")}</Badge>
              </div>
              <h3 className="text-lg font-bold mb-1">{mod.title}</h3>
              <p className="text-sm text-muted mb-4">{t(mod.category)} • {mod.duration}</p>
              
              <div style={{ width: '100%', height: '6px', background: 'var(--color-surface-hover)', borderRadius: '3px', marginBottom: '1rem', overflow: 'hidden' }}>
                <div style={{ width: `${mod.progress}%`, height: '100%', background: `var(--color-${mod.color})` }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-muted">{mod.progress}% {t("completed")}</span>
                <Button variant={mod.progress === 100 ? 'secondary' : 'primary'} size="sm" className="flex items-center gap-2">
                  {mod.progress === 100 ? t('Review') : mod.progress > 0 ? t('Continue') : t('Start')} <Icons.ArrowRight size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        )})}
      </div>
    </div>
  );
};

export default LearnEarn;
