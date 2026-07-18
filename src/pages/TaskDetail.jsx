import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, AlertCircle, FileText, Edit2, Trash2, Upload, CheckCircle, X, Users, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useTasks } from '../context/TaskContext';

const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const { user } = useUser();
  const { tasks, submissions, submitTask, cancelSubmission, gradeSubmission, deleteTask } = useTasks();
  const isAdmin = user?.role === 'admin';

  const [activeGradingNim, setActiveGradingNim] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('A');

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return (
      <div className="page-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p>{lang === 'id' ? 'Tugas tidak ditemukan.' : 'Task not found.'}</p>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
          {lang === 'id' ? 'Kembali ke Dashboard' : 'Back to Dashboard'}
        </button>
      </div>
    );
  }

  const taskSubmissions = submissions[task.id] || [];

  const handleUpload = () => {
    const generatedFileName = `TUGAS_${task.title.replace(/\s+/g, '_')}_Rowlly.pdf`;
    submitTask(task.id, generatedFileName);
  };

  const handleCancelSubmit = () => {
    cancelSubmission(task.id);
  };

  const handleDelete = () => {
    if (window.confirm(lang === 'id' ? 'Apakah Anda yakin ingin menghapus tugas ini?' : 'Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      navigate('/dashboard');
    }
  };

  return (
    <div className="page-container fade-in" style={{ padding: 0, background: 'var(--surface)' }}>
      {/* Top Bar */}
      <div className="top-bar" style={{ background: 'transparent' }}>
        <button className="icon-btn hide-on-desktop" onClick={() => navigate(-1)} style={{ marginLeft: '-8px' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="top-bar-title" style={{ margin: '0 auto', paddingRight: '24px' }}>{t('taskTitle')}</h2>
      </div>

      <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <div className="slide-up">
            {/* Header Icon */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '24px', 
                background: task.status === 'done' ? 'var(--success)' : 'var(--primary)', 
                color: 'white', display: 'flex', 
                justifyContent: 'center', alignItems: 'center', margin: '0 auto 16px',
                boxShadow: 'var(--shadow-md)'
              }}>
                <FileText size={40} />
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{task.title}</h2>
            </div>

            {/* Details Card */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px', boxShadow: 'none', border: '1px solid var(--border)' }}>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <BookOpen size={20} color="var(--primary)" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>{t('courseName')}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{task.course}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <Clock size={20} color="var(--primary)" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>{t('deadline')}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{task.deadline}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <AlertCircle size={20} color="var(--primary)" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>Status</div>
                  <div style={{ 
                    fontSize: '0.85rem', fontWeight: '700', 
                    color: task.status === 'done' ? 'var(--success)' : 'var(--error)',
                    background: task.status === 'done' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                    display: 'inline-block',
                    padding: '4px 12px', borderRadius: '12px'
                  }}>
                    {task.status === 'done' ? t('statusDone') : t('statusPending')}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <FileText size={20} color="var(--primary)" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>{t('description')}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {task.description}
                  </div>
                </div>
              </div>

            </div>

            {/* ===== ADMIN VIEW: Daftar Pengumpulan Mahasiswa ===== */}
            {isAdmin ? (
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Users size={18} color="var(--primary)" />
                  <h3 style={{ fontSize: '1rem', margin: 0 }}>{lang === 'id' ? 'Pengumpulan Mahasiswa' : 'Student Submissions'}</h3>
                  <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                    {taskSubmissions.filter(s => s.submittedAt !== null).length}/{taskSubmissions.length} mengumpulkan
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {taskSubmissions.map((s, idx) => {
                    const isCurrentlyGrading = activeGradingNim === s.nim;
                    return (
                      <div key={idx} className="card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px',
                        borderLeft: `4px solid ${ s.status === 'graded' ? 'var(--success)' : s.status === 'ungraded' ? 'var(--warning)' : 'var(--error)' }` }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', color: 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem', flexShrink: 0 }}>
                          {s.name.charAt(0)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-main)' }}>{s.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {s.nim} • {s.submittedAt ?? (lang === 'id' ? 'Belum mengumpulkan' : 'No submission')}
                          </div>
                          {s.fileName && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--primary)', marginTop: '4px', fontWeight: '600' }}>
                              <FileText size={12} /> {s.fileName}
                            </div>
                          )}
                        </div>
                        
                        {s.submittedAt ? (
                          isCurrentlyGrading ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <select 
                                value={selectedGrade}
                                onChange={e => setSelectedGrade(e.target.value)}
                                style={{
                                  padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--border)',
                                  fontSize: '0.8rem', background: 'var(--surface)', color: 'var(--text-main)', outline: 'none'
                                }}
                              >
                                <option value="A">A</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="B-">B-</option>
                                <option value="C+">C+</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                              </select>
                              <button 
                                onClick={() => {
                                  gradeSubmission(task.id, s.nim, selectedGrade);
                                  setActiveGradingNim(null);
                                }}
                                style={{
                                  background: 'var(--success)', color: 'white', border: 'none', borderRadius: '8px',
                                  padding: '6px 12px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer'
                                }}
                              >
                                {lang === 'id' ? 'Simpan' : 'Save'}
                              </button>
                              <button 
                                onClick={() => setActiveGradingNim(null)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem' }}
                              >
                                {lang === 'id' ? 'Batal' : 'Cancel'}
                              </button>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {s.status === 'graded' ? (
                                <span style={{ fontSize: '0.7rem', fontWeight: '800', padding: '4px 10px', borderRadius: 'var(--radius-full)',
                                  background: 'rgba(16,185,129,0.1)', color: 'var(--success)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                  <Award size={10} /> {s.grade}
                                </span>
                              ) : (
                                <span style={{ fontSize: '0.7rem', fontWeight: '800', padding: '4px 10px', borderRadius: 'var(--radius-full)',
                                  background: 'rgba(251,191,36,0.1)', color: '#d97706' }}>{lang === 'id' ? 'Belum Dinilai' : 'Ungraded'}</span>
                              )}
                              <button 
                                onClick={() => {
                                  setActiveGradingNim(s.nim);
                                  setSelectedGrade(s.grade || 'A');
                                }}
                                style={{
                                  background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px',
                                  padding: '4px 12px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer'
                                }}
                              >
                                {s.status === 'graded' ? (lang === 'id' ? 'Ubah' : 'Edit') : (lang === 'id' ? 'Nilai' : 'Grade')}
                              </button>
                            </div>
                          )
                        ) : (
                          <span style={{ fontSize: '0.7rem', fontWeight: '800', padding: '4px 10px', borderRadius: 'var(--radius-full)',
                            background: 'rgba(239,68,68,0.1)', color: 'var(--error)' }}>{lang === 'id' ? 'Kosong' : 'Missing'}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* ===== USER VIEW: Upload File Tugas ===== */
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>{lang === 'id' ? 'Pengumpulan Tugas' : 'Task Submission'}</h3>
                {task.status === 'done' ? (
                  <div className="card" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--success)', fontWeight: '700' }}>
                      <CheckCircle size={20} /> {lang === 'id' ? 'Sudah Dikumpulkan' : 'Submitted'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lang === 'id' ? 'Dikirim pada' : 'Submitted at'}: {task.submitTime}</div>
                    <div style={{ padding: '12px', background: 'var(--surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <FileText size={20} color="var(--primary)" />
                      <div style={{ flex: 1, fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {task.fileName}
                      </div>
                    </div>
                    
                    {task.grade && (
                      <div className="card" style={{ 
                        marginTop: '4px', background: 'rgba(16, 185, 129, 0.08)', 
                        border: '1.5px solid rgba(16, 185, 129, 0.2)', padding: '16px',
                        display: 'flex', alignItems: 'center', gap: '16px', boxShadow: 'none'
                      }}>
                        <div style={{ 
                          width: '44px', height: '44px', borderRadius: '50%', background: 'var(--success)', 
                          color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' 
                        }}>
                          <Award size={22} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                            {lang === 'id' ? 'Nilai Tugas' : 'Grade'}
                          </div>
                          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--success)' }}>{task.grade}</div>
                        </div>
                      </div>
                    )}

                    {!task.grade && (
                      <button className="btn btn-danger-outline" onClick={handleCancelSubmit} style={{ padding: '12px', fontSize: '0.85rem', marginTop: '8px' }}>
                        <X size={16} /> {lang === 'id' ? 'Batalkan Pengumpulan' : 'Cancel Submission'}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="card" style={{ border: '2px dashed var(--border)', background: 'transparent', textAlign: 'center', padding: '32px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(99, 56, 240, 0.1)', color: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Upload size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '4px' }}>{lang === 'id' ? 'Unggah File Tugas' : 'Upload Assignment'}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lang === 'id' ? 'Format PDF atau ZIP (Maks 10MB)' : 'PDF or ZIP format (Max 10MB)'}</div>
                    </div>
                    <button className="btn btn-primary" onClick={handleUpload} style={{ padding: '10px 24px', width: 'auto', marginTop: '8px' }}>
                      {lang === 'id' ? 'Simulasi Unggah & Kumpul' : 'Simulate Upload & Submit'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons — Hanya untuk Admin */}
            {isAdmin && (
              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => navigate(`/edit-task/${id}`)}>
                  <Edit2 size={18} /> {t('edit')}
                </button>
                <button className="btn btn-danger-outline" style={{ flex: 1 }} onClick={handleDelete}>
                  <Trash2 size={18} /> {t('delete')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;

