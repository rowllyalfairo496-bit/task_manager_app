import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, CheckCircle2, Info, AlertTriangle, Trash2, CheckCheck } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useLanguage } from '../context/LanguageContext';
import { useTasks } from '../context/TaskContext';

const Notifications = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { notifications, markAllAsRead, clearNotifications } = useTasks();

  const getStyle = (type) => {
    switch (type) {
      case 'warning': return { icon: <AlertTriangle size={18} />, bg: 'var(--error-light)',   color: 'var(--error)',   iconBg: '#fef2f2' };
      case 'alert':   return { icon: <Bell size={18} />,          bg: 'var(--warning-light)', color: '#b45309',        iconBg: '#fffbeb' };
      case 'success': return { icon: <CheckCircle2 size={18} />,  bg: 'var(--success-light)', color: 'var(--success)', iconBg: '#f0fdf4' };
      case 'info':
      default:        return { icon: <Info size={18} />,          bg: 'var(--info-light)',    color: 'var(--info)',    iconBg: '#eff6ff' };
    }
  };

  // Group notifications: today vs earlier
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  const grouped = notifications.reduce((acc, notif) => {
    // Try to parse notif.timestamp; fall back to notif.id if it is a millisecond timestamp
    const notifTime = notif.timestamp || (notif.id > 1000000000000 ? notif.id : null);
    const isToday = notifTime ? notifTime >= startOfToday : false;
    const key = isToday ? 'today' : 'earlier';
    if (!acc[key]) acc[key] = [];
    acc[key].push(notif);
    return acc;
  }, {});

  const groupLabels = {
    today:   lang === 'id' ? 'HARI INI' : 'TODAY',
    earlier: lang === 'id' ? 'SEBELUMNYA' : 'EARLIER',
  };

  return (
    <div className="page-container fade-in bg-gradient" style={{ padding: 0 }}>
      <div className="top-bar-wrapper">
        <div className="top-bar">
          <button className="icon-btn hide-on-desktop" onClick={() => navigate(-1)} style={{ marginLeft: '-4px' }}>
            <ArrowLeft size={22} />
          </button>
          <h2 className="top-bar-title" style={{ margin: '0 auto', paddingRight: '40px' }}>{t('notifTitle')}</h2>
        </div>
      </div>

      <div style={{ padding: '0 20px', flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>

          {/* Action buttons */}
          {notifications.length > 0 && (
            <div className="slide-up" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '16px', marginBottom: '4px' }}>
              <button
                onClick={markAllAsRead}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  fontSize: '0.78rem', fontWeight: '700', color: 'var(--primary)',
                  background: 'var(--primary-light)', border: 'none',
                  padding: '6px 12px', borderRadius: 'var(--radius-full)',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <CheckCheck size={13} />
                {t('markAllRead')}
              </button>
              <button
                onClick={clearNotifications}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  fontSize: '0.78rem', fontWeight: '700', color: 'var(--error)',
                  background: 'var(--error-light)', border: 'none',
                  padding: '6px 12px', borderRadius: 'var(--radius-full)',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <Trash2 size={13} />
                {lang === 'id' ? 'Hapus Semua' : 'Clear All'}
              </button>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '32px', paddingTop: '8px' }}>
            {/* Empty State */}
            {notifications.length === 0 && (
              <div className="card slide-up" style={{
                padding: '60px 24px', textAlign: 'center',
                border: '1.5px dashed var(--border)',
                background: 'transparent', marginTop: '16px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
              }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: 'var(--primary-light)', color: 'var(--primary)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  animation: 'float 3s ease-in-out infinite',
                }}>
                  <Bell size={30} />
                </div>
                <div>
                  <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-main)', marginBottom: '6px' }}>
                    {t('emptyNotif')}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {lang === 'id' ? 'Semua pemberitahuan baru akan muncul di sini.' : 'All new notifications will appear here.'}
                  </div>
                </div>
              </div>
            )}

            {/* Grouped Notifications */}
            {['today', 'earlier'].map(group => {
              const items = grouped[group];
              if (!items || items.length === 0) return null;
              return (
                <div key={group}>
                  <div className="notif-group-label" style={{ marginTop: '16px' }}>
                    {groupLabels[group]}
                  </div>
                  {items.map((notif, index) => {
                    const s = getStyle(notif.type);
                    return (
                      <div
                        key={notif.id}
                        className="card slide-up"
                        style={{
                          display: 'flex', gap: '14px', alignItems: 'flex-start',
                          animationDelay: `${index * 0.05}s`,
                          marginBottom: '10px',
                          opacity: notif.read ? 0.75 : 1,
                          borderLeft: `4px solid ${s.color}`,
                          background: notif.read ? 'var(--surface)' : 'var(--surface-2)',
                          boxShadow: notif.read ? 'var(--shadow-xs)' : 'var(--shadow-sm)',
                          transition: 'all 0.2s ease',
                          padding: '14px 16px',
                        }}
                      >
                        <div style={{
                          width: '38px', height: '38px', borderRadius: '12px',
                          background: notif.read ? 'var(--surface-2)' : s.iconBg, 
                          color: s.color,
                          display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0,
                          border: `1px solid ${s.color}22`,
                        }}>
                          {s.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{
                            margin: '0 0 4px', fontSize: '0.88rem', lineHeight: '1.45',
                            fontWeight: notif.read ? '500' : '700', color: 'var(--text-main)',
                          }}>
                            {notif.title}
                          </h4>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                            {notif.time}
                          </div>
                        </div>
                        {!notif.read && (
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0, marginTop: '4px' }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Notifications;
