import React from 'react';
import { useTranslation } from 'react-i18next';

const Savings = () => {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in">
      <h1 className="dashboard-title">{t("Savings Goals")}</h1>
      <p className="text-muted">{t("Set and track your financial milestones.")}</p>
      <div className="card mt-4">
        <p>{t("Your savings goals will appear here.")}</p>
      </div>
    </div>
  );
};

export default Savings;
