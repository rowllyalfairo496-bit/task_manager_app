import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Bell, Globe, Lock, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LANGUAGES = [
  { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'zh', label: '中文 (简体)', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
];

const Settings = () => {
  const navigate = useNavigate();
  const { lang, t, changeLang } = useLanguage();

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [notifications, setNotifications] = useState(true);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const currentLang = LANGUAGES.find(l => l.code === lang);

  return (
    <div className="page-container fade-in bg-gradient" style={{ padding: 0 }}>
      <div className="top-bar">
        <button className="icon-btn hide-on-desktop" onClick={() => navigate(-1)} style={{ marginLeft: '-8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="top-bar-title" style={{ margin: '0 auto', paddingRight: '24px' }}>{t('settingsTitle')}</h2>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>

          {/* PREFERENSI */}
          <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', marginLeft: '8px' }}>
            {t('preferences')}
          </h3>

          <div className="card slide-up" style={{ padding: 0, marginBottom: '24px' }}>
            {/* Dark / Light Mode */}
            <div style={{ padding: '16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: darkMode ? 'rgba(251,191,36,0.15)' : 'rgba(99,56,240,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: darkMode ? '#fbbf24' : 'var(--primary)', marginRight: '16px', transition: '0.3s' }}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{darkMode ? t('darkMode') : t('lightMode')}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {darkMode ? t('darkActive') : t('lightActive')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setDarkMode(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '6px 12px', borderRadius: '20px', border: 'none',
                    background: !darkMode ? 'var(--primary)' : 'var(--border)',
                    color: !darkMode ? 'white' : 'var(--text-muted)',
                    fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: '700',
                    cursor: 'pointer', transition: '0.2s'
                  }}
                >
                  <Sun size={14} /> {t('light')}
                </button>
                <button
                  onClick={() => setDarkMode(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '6px 12px', borderRadius: '20px', border: 'none',
                    background: darkMode ? '#1e1e2d' : 'var(--border)',
                    color: darkMode ? '#fbbf24' : 'var(--text-muted)',
                    fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: '700',
                    cursor: 'pointer', transition: '0.2s'
                  }}
                >
                  <Moon size={14} /> {t('dark')}
                </button>
              </div>
            </div>

            {/* Notifications Toggle */}
            <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99,56,240,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginRight: '16px' }}>
                <Bell size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{t('pushNotif')}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {notifications ? t('notifOn') : t('notifOff')}
                </div>
              </div>
              <div
                onClick={() => setNotifications(!notifications)}
                style={{ width: '44px', height: '24px', borderRadius: '12px', background: notifications ? 'var(--success)' : 'var(--border)', position: 'relative', cursor: 'pointer', transition: '0.3s' }}
              >
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: notifications ? '22px' : '2px', transition: '0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
              </div>
            </div>
          </div>

          {/* AKUN & KEAMANAN */}
          <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', marginLeft: '8px' }}>
            {t('accountSecurity')}
          </h3>

          <div className="card slide-up" style={{ padding: 0, animationDelay: '0.1s', overflow: 'visible', position: 'relative' }}>
            {/* Language Selector */}
            <div style={{ padding: '16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)', position: 'relative' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99,56,240,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginRight: '16px' }}>
                <Globe size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{t('language')}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t('chooseLanguage')}</div>
              </div>

              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 14px', borderRadius: '20px',
                  border: '1.5px solid var(--border)',
                  background: 'var(--surface)', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: '600',
                  color: 'var(--text-main)', transition: '0.2s',
                }}
              >
                <span>{currentLang?.flag}</span>
                <span>{currentLang?.label}</span>
                <ChevronDown size={14} style={{ transition: '0.2s', transform: langOpen ? 'rotate(180deg)' : 'none' }} />
              </button>

              {langOpen && (
                <div style={{
                  position: 'absolute', right: '16px', top: 'calc(100% + 8px)',
                  background: 'var(--surface)', border: '1.5px solid var(--border)',
                  borderRadius: '16px', boxShadow: 'var(--shadow-md)',
                  zIndex: 200, minWidth: '200px', overflow: 'hidden'
                }}>
                  {LANGUAGES.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => { changeLang(language.code); setLangOpen(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        width: '100%', padding: '12px 16px', border: 'none',
                        background: lang === language.code ? 'rgba(99,56,240,0.07)' : 'transparent',
                        color: lang === language.code ? 'var(--primary)' : 'var(--text-main)',
                        fontFamily: 'inherit', fontSize: '0.9rem',
                        fontWeight: lang === language.code ? '700' : '500',
                        cursor: 'pointer', textAlign: 'left', transition: '0.15s'
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{language.flag}</span>
                      <span style={{ flex: 1 }}>{language.label}</span>
                      {lang === language.code && <Check size={16} color="var(--primary)" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Change Password */}
            <div style={{ padding: '16px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99,56,240,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginRight: '16px' }}>
                <Lock size={20} />
              </div>
              <div style={{ flex: 1, fontWeight: '600', color: 'var(--text-main)' }}>{t('changePassword')}</div>
            </div>
          </div>

        </div>
      </div>

      {langOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setLangOpen(false)} />
      )}
    </div>
  );
};

export default Settings;
