import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="language-selector">
      <Globe size={18} className="lang-icon" />
      <select 
        className="lang-dropdown"
        value={i18n.resolvedLanguage || 'en'}
        onChange={changeLanguage}
      >
        <option value="en">English</option>
        <option value="hi">हिंदी (Hindi)</option>
        <option value="kn">ಕನ್ನಡ (Kannada)</option>
        <option value="ta">தமிழ் (Tamil)</option>
        <option value="te">తెలుగు (Telugu)</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
