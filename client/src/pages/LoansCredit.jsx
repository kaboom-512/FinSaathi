import React, { useState } from 'react';
import { Search, Landmark, ArrowRight, ShieldCheck, Banknote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { useTranslation } from 'react-i18next';
import { useSupabase } from '../context/SupabaseContext';

const LoansCredit = () => {
  const { supabase } = useSupabase();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [loans, setLoans] = useState([]);

  React.useEffect(() => {
    const fetchLoans = async () => {
      if (!supabase) return;
      const { data } = await supabase.from('loans').select('*');
      if (data) setLoans(data);
    };
    fetchLoans();
  }, [supabase]);

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{t("Loans & Credit")}</h1>
          <p className="text-muted mt-2">{t("Find and apply for loans tailored to your needs.")}</p>
        </div>
        <Button variant="primary">{t("Apply for Loan")}</Button>
      </div>

      <div className="flex gap-4">
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: 12, top: 10, color: 'var(--color-text-muted)' }} />
          <input 
            type="text" 
            placeholder={t("Search loans, schemes...")}
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
        <Button variant="secondary">{t("Filters")}</Button>
      </div>

      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {loans.map(loan => (
          <Card key={loan.id} className="hover:shadow-md transition-all">
            <CardHeader className="flex justify-between items-start" style={{ flexDirection: 'row' }}>
              <div>
                <Badge variant={loan.type === 'Agriculture' ? 'success' : loan.type === 'Business' ? 'warning' : 'primary'}>
                  {t(loan.type)}
                </Badge>
                <CardTitle className="mt-3 text-lg">{loan.title}</CardTitle>
                <p className="text-sm text-muted mt-1">{loan.provider}</p>
              </div>
              <div style={{ background: 'var(--color-primary-subtle)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
                <Landmark size={24} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-xs text-muted">{t("Amount")}</p>
                  <p className="font-semibold">{loan.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">{t("Interest Rate")}</p>
                  <p className="font-semibold text-danger">{loan.interest_rate}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2 text-sm text-success font-medium">
                  {loan.is_verified && <><ShieldCheck size={16} /> {t("Verified")}</>}
                </div>
                <Button variant="primary" size="sm" className="flex items-center gap-2">
                  {t("Apply")} <ArrowRight size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoansCredit;
