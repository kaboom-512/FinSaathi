import React from 'react';
import { Users, FileText, ArrowRight, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

const SHG = () => {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{t("Women & SHG Connect")}</h1>
          <p className="text-muted mt-2">{t("Manage your Self-Help Group ledgers and meetings.")}</p>
        </div>
        <Button variant="primary">{t("Create New SHG")}</Button>
      </div>

      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div style={{ background: 'var(--color-primary-subtle)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-primary)' }}>
                <Users size={24} />
              </div>
              <CardTitle>{t("My Groups")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted text-sm mb-4">{t("View your active Self-Help Groups, track attendance, and member contributions.")}</p>
            <Button variant="secondary" className="w-full flex items-center justify-between">
              {t("View Groups")} <ArrowRight size={16} />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div style={{ background: 'var(--color-secondary-subtle)', padding: '0.75rem', borderRadius: '50%', color: 'var(--color-secondary)' }}>
                <FileText size={24} />
              </div>
              <CardTitle>{t("Digital Ledger")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted text-sm mb-4">{t("Record meeting minutes, track loan repayments, and manage chit fund rotations.")}</p>
            <Button variant="secondary" className="w-full flex items-center justify-between">
              {t("Open Ledger")} <ArrowRight size={16} />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div style={{ background: '#fef3c7', padding: '0.75rem', borderRadius: '50%', color: '#d97706' }}>
                <Shield size={24} />
              </div>
              <CardTitle>{t("Verify Documents")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted text-sm mb-4">{t("Scan and verify Aadhaar and PAN cards for KYC compliance securely.")}</p>
            <Button variant="secondary" className="w-full flex items-center justify-between">
              {t("Start Verification")} <ArrowRight size={16} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SHG;
