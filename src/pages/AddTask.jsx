import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTasks } from '../context/TaskContext';

const AddTask = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [courseKey, setCourseKey] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  const courseNames = {
    pbo: 'Pemrograman Berorientasi Objek',
    rpl: 'Rekayasa Perangkat Lunak',
    bd: 'Basis Data',
    jk: 'Jaringan Komputer',
    rw: 'Rekayasa Web',
    mp: 'Manajemen Proyek',
    kj: 'Keamanan Jaringan',
  };

  const handleSave = (e) => {
    e.preventDefault();
    addTask({
      title,
      courseKey,
      courseName: courseNames[courseKey] || 'Mata Kuliah',
      deadline,
      description
    });
    navigate('/dashboard');
  };

  return (
    <div className="page-container fade-in" style={{ padding: 0, background: 'var(--surface)' }}>
      {/* Top Bar */}
      <div className="top-bar">
        <button className="icon-btn" onClick={() => navigate(-1)} style={{ marginLeft: '-8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="top-bar-title" style={{ margin: '0 auto', paddingRight: '24px' }}>{t('addTask')}</h2>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
          <form onSubmit={handleSave} className="slide-up">

            <div className="input-group">
              <label className="input-label">{t('taskTitle')}</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder={t('taskTitle')} 
                value={title}
                onChange={e => setTitle(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label className="input-label">{t('courseName')}</label>
              <select 
                className="input-field" 
                required 
                style={{ appearance: 'none', backgroundColor: 'var(--surface)' }} 
                value={courseKey}
                onChange={e => setCourseKey(e.target.value)}
              >
                <option value="" disabled>{t('selectCourse')}</option>
                <option value="pbo">Pemrograman Berorientasi Objek</option>
                <option value="rpl">Rekayasa Perangkat Lunak</option>
                <option value="bd">Basis Data</option>
                <option value="jk">Jaringan Komputer</option>
                <option value="rw">Rekayasa Web</option>
                <option value="mp">Manajemen Proyek</option>
                <option value="kj">Keamanan Jaringan</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">{t('deadline')}</label>
              <div className="input-icon-wrapper">
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder={t('deadline')} 
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  required 
                  style={{ paddingRight: '48px', paddingLeft: '16px' }} 
                />
                <Calendar size={20} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="input-group" style={{ marginBottom: '32px' }}>
              <label className="input-label">{t('description')}</label>
              <textarea
                className="input-field"
                placeholder={t('description')}
                rows="4"
                style={{ resize: 'none' }}
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              <span style={{ marginRight: '8px' }}>💾</span> {t('save')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;

