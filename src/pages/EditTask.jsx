import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTasks } from '../context/TaskContext';

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();
  const { tasks, editTask } = useTasks();

  const task = tasks.find(t => t.id === id);

  const [title, setTitle] = useState('');
  const [courseName, setCourseName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCourseName(task.course);
      setDeadline(task.deadline);
      setDescription(task.description || '');
    }
  }, [id, tasks]);

  const handleSave = (e) => {
    e.preventDefault();
    editTask(id, {
      title,
      course: courseName,
      deadline,
      description
    });
    navigate(-1);
  };

  if (!task) {
    return (
      <div className="page-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p>Tugas tidak ditemukan.</p>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Kembali ke Dashboard</button>
      </div>
    );
  }

  return (
    <div className="page-container fade-in" style={{ padding: 0, background: 'var(--surface)' }}>
      {/* Top Bar */}
      <div className="top-bar">
        <button className="icon-btn" onClick={() => navigate(-1)} style={{ marginLeft: '-8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="top-bar-title" style={{ margin: '0 auto', paddingRight: '24px' }}>{t('editTask')}</h2>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <form onSubmit={handleSave} className="slide-up">
          
          <div className="input-group">
            <label className="input-label">{t('taskTitle')}</label>
            <input 
              type="text" 
              className="input-field" 
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
              value={courseName}
              onChange={e => setCourseName(e.target.value)}
            >
              <option value="Pemrograman Berorientasi Objek">Pemrograman Berorientasi Objek</option>
              <option value="Rekayasa Perangkat Lunak">Rekayasa Perangkat Lunak</option>
              <option value="Basis Data">Basis Data</option>
              <option value="Jaringan Komputer">Jaringan Komputer</option>
              <option value="Rekayasa Web">Rekayasa Web</option>
              <option value="Manajemen Proyek">Manajemen Proyek</option>
              <option value="Keamanan Jaringan">Keamanan Jaringan</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">{t('deadline')}</label>
            <div className="input-icon-wrapper">
              <input 
                type="text" 
                className="input-field" 
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

export default EditTask;

