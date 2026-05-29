import React from 'react';
import { Menu, Bell, Search, Mic, LogOut } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useSupabase } from '../../context/SupabaseContext';
import { useNavigate } from 'react-router-dom';
import './Topbar.css';

const Topbar = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const { logout, user } = useSupabase();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder={t("Search resources, schemes...")} 
            className="search-input"
          />
          <button className="voice-btn" title={t("Voice Search")}>
            <Mic size={18} />
          </button>
        </div>
      </div>

      <div className="topbar-right">
        <LanguageSelector />
        <button className="icon-btn notification-btn">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            <span className="avatar-text">{user?.email ? user.email[0].toUpperCase() : 'U'}</span>
          </div>
          <div className="user-info">
            <span className="user-name" title={user?.email}>
              {user?.email ? user.email.split('@')[0] : t("Welcome")}
            </span>
            <span className="user-role">{t(user?.role || "User")}</span>
          </div>
        </div>

        <button 
          className="icon-btn logout-btn" 
          onClick={handleLogout}
          title={t("Logout")}
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
