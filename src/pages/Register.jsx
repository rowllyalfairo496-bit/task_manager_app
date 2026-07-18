import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowLeft, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { updateProfilePic } = useUser();
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // Controlled Input States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Floating Labels Focus States
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (preview) {
      updateProfilePic(preview);
    }
    navigate('/');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(145deg, #0d0c1d 0%, #1a1060 50%, #0d1a3a 100%)',
      position: 'relative',
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px 16px',
    }}>
      {/* Animated Blobs Background */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-10%',
        width: '450px', height: '450px',
        background: 'radial-gradient(circle, rgba(99,56,240,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'blobMove 8s ease-in-out infinite',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%',
        width: '350px', height: '350px',
        background: 'radial-gradient(circle, rgba(79,142,247,0.25) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'blobMove 10s ease-in-out infinite reverse',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      <div className="login-form-panel" style={{
        width: '100%',
        maxWidth: '460px',
        background: 'rgba(255,255,255,0.96)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '36px 32px',
        borderRadius: '32px',
        position: 'relative',
        zIndex: 2,
        boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
      }}>
        <style>{`[data-theme="dark"] .login-form-panel { background: rgba(22,20,44,0.97) !important; }`}</style>
        
        {/* Top Header Row with Back Button */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <button 
            className="icon-btn" 
            onClick={() => navigate(-1)} 
            style={{ 
              marginLeft: '-8px', 
              color: 'var(--text-main)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px', height: '36px',
              borderRadius: '50%',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <ArrowLeft size={20} />
          </button>
          <h2 style={{ margin: '0 auto', paddingRight: '36px', fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>
            {t('register')}
          </h2>
        </div>

        {/* Profile Image Picker */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div 
            onClick={() => fileInputRef.current.click()}
            style={{ 
              width: '90px', height: '90px', borderRadius: '50%', 
              background: 'var(--primary-gradient)', 
              margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center',
              color: 'white', position: 'relative', boxShadow: 'var(--shadow-md)',
              cursor: 'pointer', overflow: 'hidden', border: '3px solid var(--surface)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {preview ? (
              <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={36} />
            )}
            <div style={{
              position: 'absolute', bottom: 0, right: 0, background: 'var(--surface)',
              borderRadius: '50%', width: '28px', height: '28px', display: 'flex',
              justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border)',
              color: 'var(--primary)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <Camera size={14} />
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px', fontWeight: '600' }}>PILIH FOTO PROFIL</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="slide-up">
          <div className={`floating-group ${fullName !== '' || isNameFocused ? 'active' : ''}`}>
            <div className="input-icon-wrapper">
              <User className="icon" size={18} />
              <input 
                type="text" 
                className="input-field" 
                placeholder="" 
                value={fullName}
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
                onChange={e => setFullName(e.target.value)}
                required 
              />
              <label className="floating-label">{t('fullName')}</label>
            </div>
          </div>

          <div className={`floating-group ${email !== '' || isEmailFocused ? 'active' : ''}`}>
            <div className="input-icon-wrapper">
              <Mail className="icon" size={18} />
              <input 
                type="email" 
                className="input-field" 
                placeholder="" 
                value={email}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                onChange={e => setEmail(e.target.value)}
                required 
              />
              <label className="floating-label">Email</label>
            </div>
          </div>

          <div className={`floating-group ${password !== '' || isPasswordFocused ? 'active' : ''}`}>
            <div className="input-icon-wrapper">
              <Lock className="icon" size={18} />
              <input 
                type="password" 
                className="input-field" 
                placeholder="" 
                value={password}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                onChange={e => setPassword(e.target.value)}
                required 
              />
              <label className="floating-label">Password</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary ripple" style={{ marginTop: '16px' }}>
            {t('register')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>{t('alreadyHaveAccount')} </span>
          <Link to="/" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>
            {t('loginHere')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
