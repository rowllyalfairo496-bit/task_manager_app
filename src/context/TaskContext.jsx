import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from './UserContext';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

// Initial mock tasks
const INITIAL_TASKS = [
  { id: '1', title: 'Analisis Vulnerability SQL Injection', course: 'Keamanan Jaringan', deadline: '8 Mei 2025, 23:59', status: 'done', color: 'var(--color-kj)', description: 'Menganalisis kerentanan SQL Injection pada web e-commerce dummy dan membuat laporan.', fileName: 'Tugas_Keamanan_Jaringan_Rowlly.pdf', submitTime: '7 Mei 2025, 14:30' },
  { id: '2', title: 'Membuat API Autentikasi', course: 'Rekayasa Web', deadline: '11 Mei 2025, 23:59', status: 'pending', color: 'var(--color-rw)', description: 'Membuat endpoint login dan register menggunakan JWT dengan Node.js.' },
  { id: '3', title: 'Tugas PBO', course: 'Pemrograman Berorientasi Objek', deadline: '12 Mei 2025, 23:59', status: 'pending', color: 'var(--color-pbo)', description: 'Mengerjakan latihan membuat program CRUD menggunakan Java.' },
  { id: '4', title: 'Tugas RPL', course: 'Rekayasa Perangkat Lunak', deadline: '15 Mei 2025, 23:59', status: 'pending', color: 'var(--color-rpl)', description: 'Menyusun dokumen Software Requirements Specification (SRS) untuk sistem manajemen tugas.' },
  { id: '5', title: 'Tugas Basis Data', course: 'Basis Data', deadline: '16 Mei 2025, 23:59', status: 'done', color: 'var(--color-bd)', description: 'Membuat desain ERD untuk sistem perpustakaan.', fileName: 'ERD_BasisData_Rowlly.pdf', submitTime: '15 Mei 2025, 09:15' },
  { id: '6', title: 'Desain Wireframe UI/UX', course: 'Rekayasa Perangkat Lunak', deadline: '3 Mei 2025, 23:59', status: 'done', color: 'var(--color-rpl)', description: 'Membuat rancangan wireframe high-fidelity untuk aplikasi Task Manager.', fileName: 'Wireframe_RPL_Rowlly.pdf', submitTime: '2 Mei 2025, 11:20' },
  { id: '7', title: 'Instalasi & Konfigurasi Web Server', course: 'Rekayasa Web', deadline: '5 Mei 2025, 23:59', status: 'done', color: 'var(--color-rw)', description: 'Melakukan instalasi web server Nginx dan konfigurasi domain lokal.', fileName: 'Konfigurasi_Nginx_Rowlly.pdf', submitTime: '4 Mei 2025, 16:45' },
  { id: '8', title: 'Latihan SQL Query Dasar', course: 'Basis Data', deadline: '6 Mei 2025, 23:59', status: 'done', color: 'var(--color-bd)', description: 'Menulis query SELECT, INSERT, UPDATE, DELETE berdasarkan studi kasus ritel.', fileName: 'Tugas_SQL_BasisData_Rowlly.pdf', submitTime: '5 Mei 2025, 08:30' },
];

// Initial mock submissions for each task
const INITIAL_SUBMISSIONS = {
  '1': [
    { name: 'M. Rowlly Alfairo', nim: '2211501001', submittedAt: '7 Mei 2025, 14:30', status: 'graded', grade: 'A', fileName: 'Tugas_Keamanan_Jaringan_Rowlly.pdf' },
    { name: 'Siti Nurhaliza', nim: '2211501002', submittedAt: '7 Mei 2025, 20:15', status: 'graded', grade: 'B+', fileName: 'Tugas_Keamanan_Jaringan_Siti.pdf' },
    { name: 'Budi Santoso', nim: '2211501003', submittedAt: '8 Mei 2025, 01:10', status: 'ungraded', grade: null, fileName: 'Tugas_Keamanan_Jaringan_Budi.pdf' },
    { name: 'Dian Pertiwi', nim: '2211501004', submittedAt: null, status: 'missing', grade: null }
  ],
  '2': [
    { name: 'M. Rowlly Alfairo', nim: '2211501001', submittedAt: null, status: 'missing', grade: null },
    { name: 'Siti Nurhaliza', nim: '2211501002', submittedAt: '10 Mei 2025, 19:40', status: 'graded', grade: 'A-', fileName: 'API_Auth_Siti.zip' },
    { name: 'Budi Santoso', nim: '2211501003', submittedAt: null, status: 'missing', grade: null },
    { name: 'Dian Pertiwi', nim: '2211501004', submittedAt: null, status: 'missing', grade: null }
  ],
  '3': [
    { name: 'M. Rowlly Alfairo', nim: '2211501001', submittedAt: null, status: 'missing', grade: null },
    { name: 'Siti Nurhaliza', nim: '2211501002', submittedAt: null, status: 'missing', grade: null },
    { name: 'Budi Santoso', nim: '2211501003', submittedAt: '11 Mei 2025, 13:20', status: 'ungraded', grade: null, fileName: 'PBO_Latihan_Budi.zip' },
    { name: 'Dian Pertiwi', nim: '2211501004', submittedAt: null, status: 'missing', grade: null }
  ],
  '4': [
    { name: 'M. Rowlly Alfairo', nim: '2211501001', submittedAt: null, status: 'missing', grade: null },
    { name: 'Siti Nurhaliza', nim: '2211501002', submittedAt: null, status: 'missing', grade: null },
    { name: 'Budi Santoso', nim: '2211501003', submittedAt: null, status: 'missing', grade: null },
    { name: 'Dian Pertiwi', nim: '2211501004', submittedAt: null, status: 'missing', grade: null }
  ],
  '5': [
    { name: 'M. Rowlly Alfairo', nim: '2211501001', submittedAt: '15 Mei 2025, 09:15', status: 'graded', grade: 'A', fileName: 'ERD_BasisData_Rowlly.pdf' },
    { name: 'Siti Nurhaliza', nim: '2211501002', submittedAt: '15 Mei 2025, 10:30', status: 'graded', grade: 'A', fileName: 'ERD_Siti.pdf' },
    { name: 'Budi Santoso', nim: '2211501003', submittedAt: '15 Mei 2025, 11:00', status: 'graded', grade: 'B', fileName: 'ERD_Budi.pdf' },
    { name: 'Dian Pertiwi', nim: '2211501004', submittedAt: '15 Mei 2025, 12:00', status: 'ungraded', grade: null, fileName: 'ERD_Dian.pdf' }
  ],
  '6': [
    { name: 'M. Rowlly Alfairo', nim: '2211501001', submittedAt: '2 Mei 2025, 11:20', status: 'graded', grade: 'A', fileName: 'Wireframe_RPL_Rowlly.pdf' },
    { name: 'Siti Nurhaliza', nim: '2211501002', submittedAt: '2 Mei 2025, 12:45', status: 'graded', grade: 'A', fileName: 'Wireframe_Siti.pdf' },
    { name: 'Budi Santoso', nim: '2211501003', submittedAt: '2 Mei 2025, 14:00', status: 'graded', grade: 'A-', fileName: 'Wireframe_Budi.pdf' },
    { name: 'Dian Pertiwi', nim: '2211501004', submittedAt: '2 Mei 2025, 15:30', status: 'graded', grade: 'B+', fileName: 'Wireframe_Dian.pdf' }
  ],
  '7': [
    { name: 'M. Rowlly Alfairo', nim: '2211501001', submittedAt: '4 Mei 2025, 16:45', status: 'graded', grade: 'A', fileName: 'Konfigurasi_Nginx_Rowlly.pdf' },
    { name: 'Siti Nurhaliza', nim: '2211501002', submittedAt: '4 Mei 2025, 17:30', status: 'graded', grade: 'A', fileName: 'Nginx_Siti.pdf' },
    { name: 'Budi Santoso', nim: '2211501003', submittedAt: '4 Mei 2025, 18:00', status: 'graded', grade: 'B+', fileName: 'Nginx_Budi.pdf' },
    { name: 'Dian Pertiwi', nim: '2211501004', submittedAt: null, status: 'missing', grade: null }
  ],
  '8': [
    { name: 'M. Rowlly Alfairo', nim: '2211501001', submittedAt: '5 Mei 2025, 08:30', status: 'graded', grade: 'A', fileName: 'Tugas_SQL_BasisData_Rowlly.pdf' },
    { name: 'Siti Nurhaliza', nim: '2211501002', submittedAt: '5 Mei 2025, 09:00', status: 'graded', grade: 'A', fileName: 'SQL_Siti.pdf' },
    { name: 'Budi Santoso', nim: '2211501003', submittedAt: '5 Mei 2025, 09:30', status: 'graded', grade: 'B', fileName: 'SQL_Budi.pdf' },
    { name: 'Dian Pertiwi', nim: '2211501004', submittedAt: '5 Mei 2025, 10:00', status: 'graded', grade: 'B', fileName: 'SQL_Dian.pdf' }
  ],
};

const INITIAL_STUDENT_NOTIFICATIONS = [
  { id: 1, type: 'warning', title: 'Deadline Tugas PBO besok!', time: '9 Mei 2025, 09:00', read: false, timestamp: Date.now() - 86400000 * 3 },
  { id: 2, type: 'alert',   title: 'Deadline Tugas RPL hari ini!', time: '12 Mei 2025, 08:00', read: false, timestamp: Date.now() - 86400000 * 2 },
  { id: 3, type: 'success', title: 'Tugas Basis Data telah berhasil ditandai selesai.', time: '8 Mei 2025, 14:30', read: true, timestamp: Date.now() - 86400000 * 5 },
  { id: 4, type: 'info',    title: 'Jangan lupa kerjakan tugas Jarkom!', time: '17 Mei 2025, 10:15', read: false, timestamp: Date.now() - 86400000 },
];

const INITIAL_ADMIN_NOTIFICATIONS = [
  { id: 101, type: 'info',    title: 'M. Rowlly Alfairo mengumpulkan Tugas PBO', time: '12 Mei 2025, 08:30', read: false, timestamp: Date.now() - 86400000 * 2 },
  { id: 102, type: 'info',    title: 'Siti Nurhaliza mengumpulkan Tugas RPL', time: '11 Mei 2025, 20:15', read: false, timestamp: Date.now() - 86400000 * 3 },
  { id: 103, type: 'info',    title: 'Budi Santoso mengumpulkan Tugas Basis Data', time: '8 Mei 2025, 14:30', read: true, timestamp: Date.now() - 86400000 * 5 },
  { id: 104, type: 'success', title: 'Tugas Keamanan Jaringan berhasil dipublikasikan.', time: '7 Mei 2025, 09:00', read: true, timestamp: Date.now() - 86400000 * 6 },
];

export const TaskProvider = ({ children }) => {
  const { user } = useUser();

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [studentNotifs, setStudentNotifs] = useState(() => {
    const saved = localStorage.getItem('student_notifications');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_NOTIFICATIONS;
  });

  const [adminNotifs, setAdminNotifs] = useState(() => {
    const saved = localStorage.getItem('admin_notifications');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_NOTIFICATIONS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('student_notifications', JSON.stringify(studentNotifs));
  }, [studentNotifs]);

  useEffect(() => {
    localStorage.setItem('admin_notifications', JSON.stringify(adminNotifs));
  }, [adminNotifs]);

  // Format date helper
  const getCurrentFormattedTime = () => {
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  // Add Task (Admin)
  const addTask = (taskData) => {
    const newId = String(tasks.length + 1);
    const colors = {
      pbo: 'var(--color-pbo)',
      rpl: 'var(--color-rpl)',
      bd: 'var(--color-bd)',
      jk: 'var(--primary)',
      rw: 'var(--color-rw)',
      mp: '#8b5cf6',
      kj: 'var(--color-kj)',
    };

    const newTask = {
      id: newId,
      title: taskData.title,
      course: taskData.courseName,
      deadline: taskData.deadline,
      status: 'pending',
      color: colors[taskData.courseKey] || 'var(--primary)',
      description: taskData.description,
    };

    setTasks(prev => [newTask, ...prev]);

    // Initial blank submissions list for this task
    setSubmissions(prev => ({
      ...prev,
      [newId]: [
        { name: 'M. Rowlly Alfairo', nim: '2211501001', submittedAt: null, status: 'missing', grade: null },
        { name: 'Siti Nurhaliza', nim: '2211501002', submittedAt: null, status: 'missing', grade: null },
        { name: 'Budi Santoso', nim: '2211501003', submittedAt: null, status: 'missing', grade: null },
        { name: 'Dian Pertiwi', nim: '2211501004', submittedAt: null, status: 'missing', grade: null }
      ]
    }));

    const timestamp = getCurrentFormattedTime();

    // Create notifications
    setStudentNotifs(prev => [
      {
        id: Date.now(),
        type: 'info',
        title: `Tugas Baru: ${taskData.title} (${taskData.courseName})`,
        time: timestamp,
        read: false,
        timestamp: Date.now(),
      },
      ...prev
    ]);

    setAdminNotifs(prev => [
      {
        id: Date.now() + 1,
        type: 'success',
        title: `Tugas "${taskData.title}" berhasil dipublikasikan.`,
        time: timestamp,
        read: false,
        timestamp: Date.now(),
      },
      ...prev
    ]);
  };

  // Edit Task (Admin)
  const editTask = (id, updatedData) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, ...updatedData };
      }
      return t;
    }));
  };

  // Delete Task (Admin)
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    // Clean submissions
    setSubmissions(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  // Submit Task (Mahasiswa/User)
  const submitTask = (taskId, fileName) => {
    const timestamp = getCurrentFormattedTime();
    
    // Update task status locally
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'done',
          fileName,
          submitTime: timestamp
        };
      }
      return t;
    }));

    // Update submissions for this task
    setSubmissions(prev => {
      const taskSubs = prev[taskId] || [];
      const updatedSubs = taskSubs.map(sub => {
        if (sub.nim === '2211501001') { // Rowlly's NIM
          return {
            ...sub,
            submittedAt: timestamp,
            status: 'ungraded',
            fileName
          };
        }
        return sub;
      });
      return { ...prev, [taskId]: updatedSubs };
    });

    const taskTitle = tasks.find(t => t.id === taskId)?.title || 'Tugas';

    // Generate notifications
    setStudentNotifs(prev => [
      {
        id: Date.now(),
        type: 'success',
        title: `Tugas "${taskTitle}" berhasil dikumpulkan.`,
        time: timestamp,
        read: false
      },
      ...prev
    ]);

    setAdminNotifs(prev => [
      {
        id: Date.now() + 1,
        type: 'info',
        title: `M. Rowlly Alfairo mengumpulkan Tugas "${taskTitle}"`,
        time: timestamp,
        read: false
      },
      ...prev
    ]);
  };

  // Cancel Submission (Mahasiswa/User)
  const cancelSubmission = (taskId) => {
    const timestamp = getCurrentFormattedTime();

    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const { fileName, submitTime, ...rest } = t;
        return {
          ...rest,
          status: 'pending'
        };
      }
      return t;
    }));

    setSubmissions(prev => {
      const taskSubs = prev[taskId] || [];
      const updatedSubs = taskSubs.map(sub => {
        if (sub.nim === '2211501001') {
          return {
            ...sub,
            submittedAt: null,
            status: 'missing',
            fileName: undefined,
            grade: null
          };
        }
        return sub;
      });
      return { ...prev, [taskId]: updatedSubs };
    });

    const taskTitle = tasks.find(t => t.id === taskId)?.title || 'Tugas';

    // Generate notifications
    setStudentNotifs(prev => [
      {
        id: Date.now(),
        type: 'warning',
        title: `Pengumpulan tugas "${taskTitle}" dibatalkan.`,
        time: timestamp,
        read: false
      },
      ...prev
    ]);

    setAdminNotifs(prev => [
      {
        id: Date.now() + 1,
        type: 'warning',
        title: `M. Rowlly Alfairo membatalkan pengumpulan Tugas "${taskTitle}"`,
        time: timestamp,
        read: false
      },
      ...prev
    ]);
  };

  // Grade Submission (Admin)
  const gradeSubmission = (taskId, studentNim, grade) => {
    const timestamp = getCurrentFormattedTime();
    let studentName = 'Mahasiswa';

    setSubmissions(prev => {
      const taskSubs = prev[taskId] || [];
      const updatedSubs = taskSubs.map(sub => {
        if (sub.nim === studentNim) {
          studentName = sub.name;
          return {
            ...sub,
            status: 'graded',
            grade
          };
        }
        return sub;
      });
      return { ...prev, [taskId]: updatedSubs };
    });

    const targetTask = tasks.find(t => t.id === taskId);
    const taskTitle = targetTask?.title || 'Tugas';

    // If grading rowlly (current user)
    if (studentNim === '2211501001') {
      setTasks(prev => prev.map(t => {
        if (t.id === taskId) {
          return { ...t, grade };
        }
        return t;
      }));

      setStudentNotifs(prev => [
        {
          id: Date.now(),
          type: 'success',
          title: `Tugas "${taskTitle}" Anda telah dinilai oleh Dosen/Admin: ${grade}`,
          time: timestamp,
          read: false
        },
        ...prev
      ]);
    }

    setAdminNotifs(prev => [
      {
        id: Date.now() + 1,
        type: 'success',
        title: `Penilaian untuk ${studentName} pada tugas "${taskTitle}" berhasil disimpan (${grade}).`,
        time: timestamp,
        read: false
      },
      ...prev
    ]);
  };

  const markAllAsRead = () => {
    if (user?.role === 'admin') {
      setAdminNotifs(prev => prev.map(n => ({ ...n, read: true })));
    } else {
      setStudentNotifs(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  const clearNotifications = () => {
    if (user?.role === 'admin') {
      setAdminNotifs([]);
    } else {
      setStudentNotifs([]);
    }
  };

  // Select active notifications based on role
  const activeNotifications = user?.role === 'admin' ? adminNotifs : studentNotifs;

  return (
    <TaskContext.Provider value={{
      tasks,
      submissions,
      notifications: activeNotifications,
      addTask,
      editTask,
      deleteTask,
      submitTask,
      cancelSubmission,
      gradeSubmission,
      markAllAsRead,
      clearNotifications
    }}>
      {children}
    </TaskContext.Provider>
  );
};
