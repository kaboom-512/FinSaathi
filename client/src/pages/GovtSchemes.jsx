import React, { useState } from 'react';
import { Search, Filter, Sprout, Landmark, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useTranslation } from 'react-i18next';
import { useSupabase } from '../context/SupabaseContext';

const GovtSchemes = () => {
  const { supabase } = useSupabase();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [schemes, setSchemes] = useState([]);

  React.useEffect(() => {
    const fetchSchemes = async () => {
      if (!supabase) return;
      const { data } = await supabase.from('schemes').select('*');
      if (data) setSchemes(data);
    };
    fetchSchemes();
  }, [supabase]);

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("Government Schemes")}</h1>
          <p className="text-muted mt-2">{t("Discover state and central subsidies tailored to your profile.")}</p>
        </div>
        <Button variant="primary">{t("Check Eligibility")}</Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div style={{ flex: '1 1 300px', position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: 12, top: 10, color: 'var(--color-text-muted)' }} />
          <input 
            type="text" 
            placeholder={t("Search schemes...")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.625rem 1rem 0.625rem 2.5rem', 
              borderRadius: 'var(--radius-full)', 
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              outline: 'none'
            }}
          />
        </div>
        <Button variant="secondary" className="flex items-center gap-2"><Filter size={18} /> {t("Filters")}</Button>
      </div>

      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {schemes.map(scheme => (
          <Card key={scheme.id} className="hover:shadow-md transition-all">
            <CardHeader className="flex justify-between items-start" style={{ flexDirection: 'row' }}>
              <div>
                <Badge variant={scheme.match_score > 90 ? 'success' : 'primary'}>
                  {scheme.match_score}% {t("Match")}
                </Badge>
                <CardTitle className="mt-3 text-lg">{scheme.title}</CardTitle>
                <p className="text-sm text-muted mt-1">{scheme.department}</p>
              </div>
              <div style={{ background: 'var(--color-surface-hover)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
                {scheme.category === 'Farming' ? <Sprout size={24} /> : <Landmark size={24} />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 rounded-md" style={{ background: 'var(--color-surface-hover)' }}>
                <p className="text-xs text-muted mb-1">{t("Key Benefit")}</p>
                <p className="font-semibold text-success flex items-center gap-2">
                  <CheckCircle2 size={16} /> {scheme.benefit}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Badge variant="secondary">{t(scheme.category)}</Badge>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-primary">
                  {t("View Details")} <ArrowRight size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GovtSchemes;
