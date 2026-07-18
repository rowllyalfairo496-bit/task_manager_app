import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Book, Settings, Info, LogOut, Camera, ChevronRight, Shield, GraduationCap, CheckCircle2, Clock } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useTasks } from '../context/TaskContext';

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, updateProfilePic, logout } = useUser();
  const { tasks } = useTasks();
  const fileInputRef = useRef(null);
  const isAdmin = user?.role === 'admin';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const doneTasks    = tasks.filter(t => t.status === 'done').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;

  const menuItems = [
    { icon: <Book size={20} />,     label: t('myCourses'), color: '#6338f0', onClick: () => {} },
    { icon: <Settings size={20} />, label: t('settings'),  color: '#06b6d4', onClick: () => navigate('/settings') },
    { icon: <Info size={20} />,     label: t('help'),       color: '#10b981', onClick: () => navigate('/help') },
  ];

  return (
    <div className="page-container fade-in bg-gradient" style={{ padding: 0 }}>
      <div className="top-bar-wrapper">
        <div className="top-bar">
          <button className="icon-btn hide-on-desktop" onClick={() => navigate(-1)} style={{ marginLeft: '-4px' }}>
            <ArrowLeft size={22} />
          </button>
          <h2 className="top-bar-title" style={{ margin: '0 auto' }}>{t('profileTitle')}</h2>
          <button className="icon-btn" onClick={() => navigate('/settings')}>
            <Settings size={22} />
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 20px', flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>

          {/* Profile Hero Card */}
          <div className="profile-hero slide-up" style={{ marginBottom: '20px' }}>
            {/* Avatar */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
              <div
                onClick={triggerFileInput}
                style={{
                  width: '90px', height: '90px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  fontSize: '36px', fontWeight: '800', color: 'white',
                  overflow: 'hidden', cursor: 'pointer',
                  border: '3px solid rgba(255,255,255,0.5)',
                  margin: '0 auto',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                }}
              >
                {user.profilePic ? (
                  <img src={user.profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  user.name?.charAt(0)
                )}
              </div>
              <div
                onClick={triggerFileInput}
                style={{
                  position: 'absolute', bottom: 2, right: -2,
                  background: 'white', borderRadius: '50%',
                  width: '28px', height: '28px',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  color: 'var(--primary)', cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                <Camera size={14} />
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
            </div>

            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'white', margin: '0 0 4px' }}>{user.name}</h2>
            <p style={{ margin: '0 0 14px', color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem' }}>{user.email}</p>

            {/* Role badge */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontSize: '0.68rem', fontWeight: '800', padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.25)',
              backdropFilter: 'blur(8px)',
            }}>
              {isAdmin ? <><Shield size={10} /> Dosen / Admin</> : <><GraduationCap size={10} /> Mahasiswa</>}
            </span>
          </div>

          {/* Stats Row */}
          {!isAdmin && (
            <div className="slide-up-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                  <CheckCircle2 size={16} color="var(--success)" />
                  <span style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--success)' }}>{doneTasks}</span>
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Selesai
                </div>
              </div>
              <div className="card" style={{ textAlign: 'center', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Clock size={16} color="var(--error)" />
                  <span style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--error)' }}>{pendingTasks}</span>
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Belum Selesai
                </div>
              </div>
            </div>
          )}

          {/* Menu List */}
          <div className="card slide-up-2" style={{ padding: 0, overflow: 'hidden', marginBottom: '20px' }}>
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={item.onClick}
                style={{
                  padding: '15px 18px',
                  display: 'flex', alignItems: 'center',
                  cursor: 'pointer',
                  borderBottom: index < menuItems.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.18s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: '38px', height: '38px', borderRadius: '12px',
                  background: `${item.color}14`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.color, marginRight: '14px', flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, fontWeight: '600', color: 'var(--text-main)', fontSize: '0.92rem' }}>{item.label}</div>
                <ChevronRight size={18} color="var(--text-muted)" />
              </div>
            ))}
          </div>

          {/* Logout */}
          <div
            className="slide-up-3"
            onClick={handleLogout}
            style={{
              padding: '15px 18px', display: 'flex', alignItems: 'center',
              cursor: 'pointer', background: 'var(--error-light)',
              borderRadius: 'var(--radius-md)', border: '1px solid rgba(239,68,68,0.15)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <div style={{
              width: '38px', height: '38px', borderRadius: '12px',
              background: 'rgba(239,68,68,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--error)', marginRight: '14px',
            }}>
              <LogOut size={20} />
            </div>
            <div style={{ flex: 1, fontWeight: '700', color: 'var(--error)', fontSize: '0.92rem' }}>{t('logout')}</div>
          </div>

        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
