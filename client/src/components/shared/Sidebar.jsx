import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSupabase } from '../../context/SupabaseContext';
import { 
  LayoutDashboard, 
  Wallet, 
  Users, 
  Landmark, 
  GraduationCap, 
  BookOpen, 
  Settings,
  LogOut,
  X 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useSupabase();

  const handleLogout = () => {
    logout();
    if (window.innerWidth < 768) onClose();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Money', path: '/my-money', icon: Wallet },
    { name: 'SHG Connect', path: '/shg', icon: Users },
    { name: 'Loans & Credit', path: '/loans', icon: Landmark },
    { name: 'Govt Schemes', path: '/schemes', icon: BookOpen },
    { name: 'Learn & Earn', path: '/learn', icon: GraduationCap },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <span className="logo-icon">🌱</span>
            <h1 className="logo-text">FinSaathi</h1>
          </div>
          <button className="sidebar-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="sidebar-content">
          <nav className="sidebar-nav">
            <div className="nav-group">
              <span className="nav-label">{t('MENU')}</span>
              {navItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => { if (window.innerWidth < 768) onClose(); }}
                >
                  <item.icon className="nav-icon" size={20} />
                  <span>{t(item.name)}</span>
                </NavLink>
              ))}
            </div>
          </nav>
        </div>

        <div className="sidebar-footer">
          <NavLink 
            to="/settings" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => { if (window.innerWidth < 768) onClose(); }}
          >
            <Settings className="nav-icon" size={20} />
            <span>{t('Settings')}</span>
          </NavLink>

          <button 
            onClick={handleLogout}
            className="nav-link logout-nav-btn"
            style={{ 
              background: 'none', 
              border: 'none', 
              width: '100%', 
              textAlign: 'left', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '4px'
            }}
          >
            <LogOut className="nav-icon" size={20} />
            <span>{t('Logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
