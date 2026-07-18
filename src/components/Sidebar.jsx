import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Bell, User, CheckSquare, Settings, Info, LogOut, Shield, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { user, logout } = useUser();
  const isAdmin = user?.role === 'admin';

  const mainNavItems = [
    { labelKey: 'home', icon: <Home size={20} />, path: '/dashboard' },
    { labelKey: 'calendar', icon: <Calendar size={20} />, path: '/calendar' },
    { labelKey: 'notifications', icon: <Bell size={20} />, path: '/notifications' },
    { labelKey: 'profile', icon: <User size={20} />, path: '/profile' }
  ];

  const secondaryNavItems = [
    { labelKey: 'settings', icon: <Settings size={20} />, action: () => navigate('/settings') },
    { labelKey: 'help', icon: <Info size={20} />, action: () => navigate('/help') }
  ];

  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  useEffect(() => {
    if (!isAuthPage && !user) {
      navigate('/');
    }
  }, [user, isAuthPage, navigate]);

  if (isAuthPage) return null;
  if (!user) return null;

  return (
    <aside className="sidebar fade-in">
      <div className="sidebar-header">
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'var(--primary)', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <CheckSquare size={20} />
        </div>
        {t('taskManager')}
      </div>

      <div className="sidebar-nav">
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, paddingLeft: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {t('mainMenu')}
        </div>
        {mainNavItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <div
              key={index}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{t(item.labelKey)}</span>
            </div>
          );
        })}

        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginTop: 24, marginBottom: 8, paddingLeft: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {t('others')}
        </div>
        {secondaryNavItems.map((item, index) => (
          <div key={index} className="sidebar-item" onClick={item.action}>
            {item.icon}
            <span>{t(item.labelKey)}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        {/* Profile preview in sidebar footer */}
        <div 
          onClick={() => navigate('/profile')}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px',
            marginBottom: '8px', cursor: 'pointer', borderRadius: 'var(--radius-md)',
            transition: '0.2s'
          }}
          className="sidebar-item-preview"
        >
          <div style={{ 
            width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white',
            fontSize: '12px', fontWeight: 'bold', overflow: 'hidden'
          }}>
            {user.profilePic ? (
              <img src={user.profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              user.name.charAt(0)
            )}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name}
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '3px',
              fontSize: '0.6rem', fontWeight: '800', padding: '2px 7px',
              borderRadius: 'var(--radius-full)', marginTop: '4px',
              background: isAdmin ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
              color: isAdmin ? 'var(--error)' : 'var(--success)',
            }}>
              {isAdmin ? <><Shield size={9}/> Admin</> : <><GraduationCap size={9}/> Mahasiswa</>}
            </span>
          </div>
        </div>

        <div className="sidebar-item" onClick={() => { logout(); navigate('/'); }} style={{ color: 'var(--error)' }}>
          <LogOut size={20} />
          <span>{t('logout')}</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
