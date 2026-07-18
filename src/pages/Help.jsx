import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Help = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Bagaimana cara mengumpulkan tugas?',
      a: 'Buka halaman Detail Tugas dari tugas yang berstatus "Belum Selesai". Anda akan melihat area tombol untuk mengunggah file. Klik tombol tersebut, pilih file yang ingin diunggah (PDF/ZIP), dan sistem otomatis akan mengubah status menjadi Selesai.'
    },
    {
      q: 'Bagaimana jika saya salah upload file?',
      a: 'Jika tugas sudah dikumpulkan, buka halaman Detail Tugas tersebut. Anda akan melihat opsi "Batalkan Pengumpulan". Klik opsi tersebut, lalu Anda bisa mengunggah ulang file yang benar sebelum deadline berakhir.'
    },
    {
      q: 'Apakah aplikasi ini akan memberi tahu jika deadline sudah dekat?',
      a: 'Ya! Sistem notifikasi akan mengirimkan peringatan (push notification) 1 hari dan 1 jam sebelum deadline tugas berakhir, selama Anda tidak mematikan fitur notifikasi di Pengaturan.'
    },
    {
      q: 'Bagaimana cara menambahkan mata kuliah baru?',
      a: 'Saat ini mata kuliah ditambahkan langsung oleh admin kampus. Jika ada mata kuliah yang tidak ada di pilihan, silakan hubungi BAAK atau dosen terkait.'
    }
  ];

  return (
    <div className="page-container fade-in bg-gradient" style={{ padding: 0 }}>
      {/* Top Bar */}
      <div className="top-bar">
        <button className="icon-btn hide-on-desktop" onClick={() => navigate(-1)} style={{ marginLeft: '-8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="top-bar-title" style={{ margin: '0 auto', paddingRight: '24px' }}>{t('helpTitle')}</h2>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }} className="slide-up">
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '24px', 
              background: 'rgba(99, 56, 240, 0.1)', color: 'var(--primary)', 
              display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 16px'
            }}>
              <HelpCircle size={40} />
            </div>
            <h2 style={{ fontSize: '1.4rem', margin: '0 0 8px' }}>{t('helpTitle')}</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Find answers to your questions</p>
          </div>

          <h3 style={{ fontSize: '1rem', marginBottom: '16px' }} className="slide-up">Pertanyaan Sering Diajukan (FAQ)</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="slide-up">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="card" 
                style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }}
              >
                <div 
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  style={{ 
                    padding: '16px', display: 'flex', justifyContent: 'space-between', 
                    alignItems: 'center', fontWeight: '600', color: 'var(--text-main)',
                    background: openIndex === index ? 'rgba(99, 56, 240, 0.03)' : 'transparent'
                  }}
                >
                  <span style={{ paddingRight: '16px', lineHeight: '1.4' }}>{faq.q}</span>
                  {openIndex === index ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                </div>
                {openIndex === index && (
                  <div style={{ 
                    padding: '0 16px 16px', color: 'var(--text-muted)', 
                    fontSize: '0.9rem', lineHeight: '1.6', borderTop: '1px solid rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ paddingTop: '12px' }}>{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="card slide-up" style={{ marginTop: '32px', textAlign: 'center', animationDelay: '0.2s' }}>
            <p style={{ margin: '0 0 16px', color: 'var(--text-main)', fontWeight: '600' }}>Masih butuh bantuan?</p>
            <button className="btn btn-primary" onClick={() => window.location.href = 'mailto:support@taskmanager.com'}>
              Hubungi Tim Support
            </button>
            <div style={{ marginTop: '24px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Task Manager App v1.0.0
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Help;
