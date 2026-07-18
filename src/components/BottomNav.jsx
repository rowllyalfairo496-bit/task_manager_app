import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Bell, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTasks } from '../context/TaskContext';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { notifications } = useTasks();

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { labelKey: 'home',          icon: <Home size={22} />,     path: '/dashboard' },
    { labelKey: 'calendar',      icon: <Calendar size={22} />, path: '/calendar' },
    { labelKey: 'notifications', icon: <Bell size={22} />,     path: '/notifications', badge: unreadCount > 0 },
    { labelKey: 'profile',       icon: <User size={22} />,     path: '/profile' },
  ];

  const getActiveIndex = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard') || path.startsWith('/task') || path === '/add-task' || path.startsWith('/edit-task')) return 0;
    if (path.startsWith('/calendar')) return 1;
    if (path.startsWith('/notifications')) return 2;
    if (path.startsWith('/profile') || path.startsWith('/settings') || path.startsWith('/help')) return 3;
    return 0;
  };
  const activeIndex = getActiveIndex();

  return (
    <div className="bottom-nav fade-in" style={{ '--active-index': activeIndex }}>
      {/* Sliding Pill Indicator */}
      <div className="nav-sliding-pill">
        <div className="nav-sliding-pill-inner" />
      </div>

      {navItems.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={index}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <div className="nav-icon-wrap">
              {/* White icon when active, muted otherwise */}
              <span style={{ color: isActive ? 'white' : 'var(--text-muted)', display: 'flex', transition: 'color 0.2s' }}>
                {item.icon}
              </span>
              {item.badge && !isActive && (
                <span className="nav-badge" />
              )}
            </div>
            <span style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)', transition: 'color 0.2s' }}>
              {t(item.labelKey)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BottomNav;
