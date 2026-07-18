import pptxgen from "pptxgenjs";
import fs from "fs";
import path from "path";

const pptx = new pptxgen();

// Set presentation properties
pptx.layout = "LAYOUT_16x9";

const targetFolder =
  "c:\\Users\\user\\OneDrive\\Documents\\SMT 4\\Mobile programing\\Laporan_Final_Task Manager";
if (!fs.existsSync(targetFolder)) {
  fs.mkdirSync(targetFolder, { recursive: true });
}

const docPath = path.join(targetFolder, "Presentasi_Task_Manager.pptx");

// Define theme colors
const BG_DARK = "0F172A"; // Slate 900
const TEXT_WHITE = "F8FAFC"; // Slate 50
const TEXT_MUTED = "94A3B8"; // Slate 400
const ACCENT_VIOLET = "8B5CF6"; // Violet 500
const ACCENT_BLUE = "3B82F6"; // Blue 500
const CARD_BG = "1E293B"; // Slate 800
const CARD_BORDER = "334155"; // Slate 700

const FONT_TITLE = "Arial";
const FONT_BODY = "Calibri";

// Define assets paths and constants
const erdPath = path.join(targetFolder, "docs", "erd_diagram.png");

const limits = [
  {
    title: "1. Peran Pengguna (User Roles)",
    desc: "Mahasiswa (mengelola tugas pribadi & kumpul berkas) & Admin/Asisten Dosen (menilai & grading berkas).",
  },
  {
    title: "2. Masukan Data (Data Inputs)",
    desc: "Nama, email, sandi, judul tugas, nama matkul, deadline kalender, berkas tugas (PDF/ZIP), skala prioritas tugas.",
  },
  {
    title: "3. Proses Fungsional",
    desc: "CRUD tugas lokal, login autentikasi multi-role, toggle done/pending, switcher dwi-bahasa (i18n), toggler tema warna.",
  },
  {
    title: "4. Luaran Sistem (Outputs)",
    desc: "Statistik progres dasbor (grafik batang/lingkaran), peta deadline kalender titik warna, notifikasi deadline, tabel grading.",
  },
];

const phases = [
  {
    num: "01",
    name: "Analisis",
    desc: "Mendefinisikan kebutuhan fungsional tugas & peran mahasiswa.",
  },
  {
    num: "02",
    name: "Desain",
    desc: "Merancang ERD database & blueprint alur kawat antarmuka.",
  },
  {
    num: "03",
    name: "Koding",
    desc: "Mengimplementasikan UI dengan React.js & Tailwind CSS.",
  },
  {
    num: "04",
    name: "Pengujian",
    desc: "Uji fungsional Black-Box & UAT kelayakan dengan mitra.",
  },
  {
    num: "05",
    name: "Rilis",
    desc: "Sosialisasi ke HMIF, integrasi localStorage, & panduan.",
  },
];

const screensGroup1 = [
  {
    file: "wireframe_login.png",
    title: "1. Halaman Login",
    desc: "Desain melayang glassmorphism berlatar blob ungu + fitur Google Auth.",
  },
  {
    file: "wireframe_register.png",
    title: "2. Halaman Register",
    desc: "Form registrasi akun user/mahasiswa baru dan administrator.",
  },
  {
    file: "wireframe_help.png",
    title: "3. Halaman Bantuan",
    desc: "Daftar panduan lengkap & FAQ pertanyaan umum pengguna baru.",
  },
];

const screensGroup2 = [
  {
    file: "wireframe_dashboard.png",
    title: "4. Dashboard Utama",
    desc: "Progress ring persentase done, grafik performa, & list tugas.",
  },
  {
    file: "wireframe_add_task.png",
    title: "5. Form Tambah Tugas",
    desc: "Input judul, matkul, tanggal deadline, prioritas, & deskripsi.",
  },
  {
    file: "wireframe_task_detail.png",
    title: "6. Detail & Unggah Berkas",
    desc: "Rincian detail tugas disertai file uploader ZIP/PDF mahasiswa.",
  },
  {
    file: "wireframe_edit_task.png",
    title: "7. Form Edit Tugas",
    desc: "Pembaruan isian informasi tugas kuliah yang sudah ada.",
  },
];

const screensGroup3 = [
  {
    file: "wireframe_calendar.png",
    title: "8. Kalender Bulanan",
    desc: "Representasi kalender deadline berupa titik lingkaran kategori warna.",
  },
  {
    file: "wireframe_notifications.png",
    title: "9. Pusat Notifikasi",
    desc: "Peringatan otomatis deadline kritis (Critical) & overdue.",
  },
  {
    file: "wireframe_profile.png",
    title: "10. Ringkasan Profil",
    desc: "Statistik visual performa tugas per matkul & unggah foto.",
  },
  {
    file: "wireframe_settings.png",
    title: "11. Setelan Tema & Bahasa",
    desc: "Konfigurasi toggle mode gelap & switcher bahasa i18n.",
  },
];

// Helper to create a slide with standard premium header/footer and decorative shapes
const createSlide = (titleText, categoryText = "PROYEK AKHIR INFORMATIKA") => {
  const slide = pptx.addSlide();

  // Set dark background
  slide.background = { fill: BG_DARK };

  // Top decorative bar
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 13.33,
    h: 0.1,
    fill: { color: ACCENT_VIOLET },
  });

  // Top Left Category Badge
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5,
    y: 0.3,
    w: 2.2,
    h: 0.3,
    fill: { color: CARD_BG },
    line: { color: ACCENT_BLUE, width: 1 },
  });

  slide.addText(categoryText, {
    x: 0.5,
    y: 0.3,
    w: 2.2,
    h: 0.3,
    fontSize: 9,
    fontFace: FONT_TITLE,
    color: ACCENT_BLUE,
    bold: true,
    align: "center",
  });

  // Header Title
  slide.addText(titleText, {
    x: 0.5,
    y: 0.7,
    w: 12.3,
    h: 0.6,
    fontSize: 26,
    fontFace: FONT_TITLE,
    color: TEXT_WHITE,
    bold: true,
    align: "left",
  });

  // Bottom horizontal separator line
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5,
    y: 6.9,
    w: 12.3,
    h: 0.02,
    fill: { color: CARD_BORDER },
  });

  // Footer
  slide.addText(
    "Program Studi Informatika — Universitas Nahdlatul Ulama Yogyakarta",
    {
      x: 0.5,
      y: 7.0,
      w: 8.0,
      h: 0.3,
      fontSize: 10,
      fontFace: FONT_BODY,
      color: TEXT_MUTED,
      align: "left",
    },
  );

  slide.addText("M. Rowlly Alfairo (NIM: 241111024)", {
    x: 9.0,
    y: 7.0,
    w: 3.8,
    h: 0.3,
    fontSize: 10,
    fontFace: FONT_BODY,
    color: ACCENT_VIOLET,
    align: "right",
    bold: true,
  });

  return slide;
};

// ==========================================
// SLIDE 1: COVER (PREMIUM DESIGN)
// ==========================================
const slide1 = pptx.addSlide();
slide1.background = { fill: BG_DARK };

// Right Side Decorative glowing shapes
slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 8.2,
  y: 0.8,
  w: 4.5,
  h: 5.9,
  fill: { color: CARD_BG },
  line: { color: ACCENT_VIOLET, width: 3 },
});

// Subtle background pattern or accent block inside cover card
slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 8.5,
  y: 1.1,
  w: 3.9,
  h: 5.3,
  fill: { color: BG_DARK },
  line: { color: CARD_BORDER, width: 1 },
});

// App mock ERD thumbnail in cover card
if (fs.existsSync(erdPath)) {
  slide1.addImage({
    path: erdPath,
    x: 8.7,
    y: 2.1,
    w: 3.5,
    h: 2.0,
  });
}
slide1.addText("TASK MANAGER CORE DATABASE", {
  x: 8.7,
  y: 4.3,
  w: 3.5,
  h: 0.3,
  fontSize: 10,
  fontFace: FONT_TITLE,
  color: TEXT_MUTED,
  align: "center",
  bold: true,
});

// Left Vertical Highlight Bar
slide1.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8,
  y: 1.5,
  w: 0.08,
  h: 4.2,
  fill: { color: ACCENT_VIOLET },
});

// Category Tag
slide1.addText("LAPORAN AKHIR PROYEK PERANGKAT LUNAK", {
  x: 1.1,
  y: 1.4,
  w: 6.5,
  h: 0.3,
  fontSize: 11,
  fontFace: FONT_TITLE,
  color: ACCENT_BLUE,
  bold: true,
});

// Main Title
slide1.addText("APLIKASI TASK MANAGER", {
  x: 1.0,
  y: 1.7,
  w: 6.8,
  h: 0.7,
  fontSize: 38,
  fontFace: FONT_TITLE,
  color: TEXT_WHITE,
  bold: true,
});

// Subtitle
slide1.addText("Smart Task Manager for Students", {
  x: 1.0,
  y: 2.4,
  w: 6.8,
  h: 0.5,
  fontSize: 20,
  fontFace: FONT_BODY,
  color: ACCENT_VIOLET,
  italic: true,
});

// Identity block
slide1.addText(
  "Disusun Oleh:\n" +
    "Nama : M. Rowlly Alfairo\n" +
    "NIM  : 241111024\n" +
    "Prodi: Informatika (Kelas A)\n\n" +
    "UNIVERSITAS NAHDLATUL ULAMA YOGYAKARTA\n" +
    "Tahun Akademik 2026",
  {
    x: 1.0,
    y: 3.3,
    w: 6.8,
    h: 2.4,
    fontSize: 14,
    fontFace: FONT_BODY,
    color: TEXT_WHITE,
    lineSpacing: 22,
  },
);

// ==========================================
// SLIDE 2: LATAR BELAKANG
// ==========================================
const slide2 = createSlide("LATAR BELAKANG MASALAH", "PENDAHULUAN");

slide2.addText(
  [
    {
      text: "Beban Akademis Mahasiswa yang Padat\n",
      options: { bold: true, color: ACCENT_BLUE, fontSize: 16 },
    },
    {
      text: "Kurikulum Informatika UNU Yogyakarta menuntut mahasiswa mengelola banyak praktikum dengan deadline ketat.\n\n",
      options: { fontSize: 14 },
    },

    {
      text: "Permasalahan Manajemen Waktu\n",
      options: { bold: true, color: ACCENT_BLUE, fontSize: 16 },
    },
    {
      text: "Kendala lupa deadline, salah menyusun prioritas pengerjaan tugas, dan pola stres akibat Sistem Kebut Semalam (SKS).\n\n",
      options: { fontSize: 14 },
    },

    {
      text: "Urgensi Solusi Digital Terpusat\n",
      options: { bold: true, color: ACCENT_BLUE, fontSize: 16 },
    },
    {
      text: "Ketiadaan media pencatatan mandiri yang terintegrasi memicu menurunnya disiplin pengumpulan berkas praktikum.",
      options: { fontSize: 14 },
    },
  ],
  {
    x: 0.8,
    y: 1.5,
    w: 6.2,
    h: 5.0,
    fontFace: FONT_BODY,
    color: TEXT_WHITE,
    align: "left",
    lineSpacing: 24,
  },
);

// Right Side Card: Solution Overview
slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 7.5,
  y: 1.7,
  w: 5.0,
  h: 4.4,
  fill: { color: CARD_BG },
  line: { color: ACCENT_VIOLET, width: 2 },
});

slide2.addShape(pptx.shapes.OVAL, {
  x: 9.6,
  y: 2.1,
  w: 0.8,
  h: 0.8,
  fill: { color: ACCENT_VIOLET },
});
slide2.addText("✔", {
  x: 9.6,
  y: 2.1,
  w: 0.8,
  h: 0.8,
  fontSize: 28,
  fontFace: FONT_TITLE,
  color: TEXT_WHITE,
  align: "center",
});

slide2.addText("SOLUSI YANG DITAWARKAN", {
  x: 7.8,
  y: 3.1,
  w: 4.4,
  h: 0.4,
  fontSize: 18,
  fontFace: FONT_TITLE,
  color: TEXT_WHITE,
  bold: true,
  align: "center",
});

slide2.addText(
  "Mengembangkan aplikasi web responsif 'Task Manager' (Smart Task Manager) berbasis client-side menggunakan React.js dan Tailwind CSS sebagai media melacak deadline secara terpusat.",
  {
    x: 7.8,
    y: 3.6,
    w: 4.4,
    h: 2.2,
    fontSize: 14,
    fontFace: FONT_BODY,
    color: TEXT_MUTED,
    align: "center",
    lineSpacing: 22,
  },
);

// ==========================================
// SLIDE 3: RUMUSAN MASALAH & TUJUAN
// ==========================================
const slide3 = createSlide("RUMUSAN MASALAH & TUJUAN", "TINJAUAN AKADEMIK");

// Left Column Card: Rumusan Masalah
slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8,
  y: 1.6,
  w: 5.5,
  h: 4.8,
  fill: { color: CARD_BG },
  line: { color: CARD_BORDER, width: 1 },
});

slide3.addText("Rumusan Masalah", {
  x: 1.2,
  y: 1.9,
  w: 4.7,
  h: 0.5,
  fontSize: 20,
  fontFace: FONT_TITLE,
  color: ACCENT_BLUE,
  bold: true,
});

slide3.addText(
  "1. Bagaimana merancang dan membangun aplikasi manajemen tugas (Task Manager) berbasis web responsif yang mudah digunakan oleh mahasiswa Informatika UNU Yogyakarta?\n\n" +
    "2. Bagaimana menyusun antarmuka yang modern, dinamis, serta mendukung multi-peran (Admin dan Mahasiswa) dan multi-bahasa menggunakan teknologi React.js dan Tailwind CSS?",
  {
    x: 1.2,
    y: 2.6,
    w: 4.7,
    h: 3.4,
    fontSize: 15,
    fontFace: FONT_BODY,
    color: TEXT_WHITE,
    lineSpacing: 24,
  },
);

// Right Column Card: Tujuan
slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 7.0,
  y: 1.6,
  w: 5.5,
  h: 4.8,
  fill: { color: CARD_BG },
  line: { color: CARD_BORDER, width: 1 },
});

slide3.addText("Tujuan Proyek", {
  x: 7.4,
  y: 1.9,
  w: 4.7,
  h: 0.5,
  fontSize: 20,
  fontFace: FONT_TITLE,
  color: ACCENT_VIOLET,
  bold: true,
});

slide3.addText(
  "1. Merancang bangun aplikasi Task Manager untuk mempermudah mahasiswa memantau serta mengelola deadline tugas kuliah secara efektif.\n\n" +
    "2. Mengimplementasikan fitur fungsional seperti sistem multi-peran (Admin/Mahasiswa), multi-bahasa (i18n), visualisasi grafik progres, kalender interaktif, dan notifikasi deadline.",
  {
    x: 7.4,
    y: 2.6,
    w: 4.7,
    h: 3.4,
    fontSize: 15,
    fontFace: FONT_BODY,
    color: TEXT_WHITE,
    lineSpacing: 24,
  },
);

// ==========================================
// SLIDE 4: BATASAN MASALAH
// ==========================================
const slide4 = createSlide("BATASAN MASALAH SISTEM", "RUANG LINGKUP");

limits.forEach((lim, idx) => {
  const col = idx % 2;
  const row = Math.floor(idx / 2);

  const xPos = 0.8 + col * 6.0;
  const yPos = 1.6 + row * 2.5;

  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos,
    y: yPos,
    w: 5.7,
    h: 2.2,
    fill: { color: CARD_BG },
    line: { color: CARD_BORDER, width: 1 },
  });

  slide4.addShape(pptx.shapes.RECTANGLE, {
    x: xPos + 0.15,
    y: yPos + 0.3,
    w: 0.05,
    h: 1.6,
    fill: { color: col === 0 ? ACCENT_BLUE : ACCENT_VIOLET },
  });

  slide4.addText(lim.title, {
    x: xPos + 0.3,
    y: yPos + 0.2,
    w: 5.2,
    h: 0.4,
    fontSize: 16,
    fontFace: FONT_TITLE,
    color: col === 0 ? ACCENT_BLUE : ACCENT_VIOLET,
    bold: true,
  });

  slide4.addText(lim.desc, {
    x: xPos + 0.3,
    y: yPos + 0.7,
    w: 5.2,
    h: 1.3,
    fontSize: 13,
    fontFace: FONT_BODY,
    color: TEXT_WHITE,
    lineSpacing: 18,
  });
});

// ==========================================
// SLIDE 5: METODE PENGEMBANGAN (WATERFALL FLOW)
// ==========================================
const slide5 = createSlide("METODE PENGEMBANGAN SISTEM", "METODOLOGI");

phases.forEach((p, idx) => {
  const xPos = 0.8 + idx * 2.4;

  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos,
    y: 1.8,
    w: 2.1,
    h: 4.4,
    fill: { color: CARD_BG },
    line: { color: ACCENT_BLUE, width: 1.5 },
  });

  slide5.addShape(pptx.shapes.RECTANGLE, {
    x: xPos + 0.1,
    y: 1.9,
    w: 1.9,
    h: 0.8,
    fill: { color: BG_DARK },
  });

  slide5.addText(p.num, {
    x: xPos + 0.1,
    y: 2.0,
    w: 1.9,
    h: 0.5,
    fontSize: 22,
    fontFace: FONT_TITLE,
    color: ACCENT_VIOLET,
    bold: true,
    align: "center",
  });

  slide5.addText(p.name, {
    x: xPos + 0.1,
    y: 2.8,
    w: 1.9,
    h: 0.6,
    fontSize: 15,
    fontFace: FONT_TITLE,
    color: TEXT_WHITE,
    bold: true,
    align: "center",
  });

  slide5.addText(p.desc, {
    x: xPos + 0.1,
    y: 3.5,
    w: 1.9,
    h: 2.5,
    fontSize: 12,
    fontFace: FONT_BODY,
    color: TEXT_MUTED,
    align: "center",
    lineSpacing: 18,
  });

  if (idx < 4) {
    slide5.addText("➔", {
      x: xPos + 2.15,
      y: 3.6,
      w: 0.3,
      h: 0.5,
      fontSize: 22,
      fontFace: FONT_TITLE,
      color: ACCENT_VIOLET,
      align: "center",
    });
  }
});

// ==========================================
// SLIDE 6: PERANCANGAN SISTEM
// ==========================================
const slide6 = createSlide("PERANCANGAN SISTEM & ARCHITECTURE", "PERANCANGAN");

slide6.addText("Skema Relasi Database (ERD):", {
  x: 0.8,
  y: 1.4,
  w: 6.0,
  h: 0.4,
  fontSize: 16,
  fontFace: FONT_TITLE,
  color: TEXT_WHITE,
  bold: true,
});

if (fs.existsSync(erdPath)) {
  slide6.addImage({
    path: erdPath,
    x: 0.8,
    y: 1.9,
    w: 5.5,
    h: 3.8,
  });
} else {
  slide6.addText("[File Gambar ERD Tidak Ditemukan]", {
    x: 0.8,
    y: 1.9,
    w: 5.5,
    h: 3.8,
    color: "FF0000",
    align: "center",
  });
}

slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 6.8,
  y: 1.9,
  w: 5.7,
  h: 4.2,
  fill: { color: CARD_BG },
  line: { color: CARD_BORDER, width: 1 },
});

slide6.addText("Desain Arsitektur Data:", {
  x: 7.2,
  y: 2.2,
  w: 4.9,
  h: 0.4,
  fontSize: 18,
  fontFace: FONT_TITLE,
  color: ACCENT_VIOLET,
  bold: true,
});

slide6.addText(
  "• Model Relasional Terpusat: Struktur database lokal klien terdiri dari 3 entitas utama (User, Task, Submission).\n\n" +
    "• Relasi Entitas User ke Task (1:N): Satu pengguna dapat memetakan, membuat, dan memantau banyak tugas kuliahnya secara personal.\n\n" +
    "• Relasi Task ke Submission (1:N): Satu tugas yang diumumkan Admin dapat dikumpulkan berkasnya oleh banyak mahasiswa berbeda untuk di-grading.",
  {
    x: 7.2,
    y: 2.7,
    w: 4.9,
    h: 3.2,
    fontSize: 13,
    fontFace: FONT_BODY,
    color: TEXT_WHITE,
    lineSpacing: 22,
  },
);

// ==========================================
// SLIDE 7: LIVE DEMO TRANSITION
// ==========================================
const slideLiveDemo = pptx.addSlide();
slideLiveDemo.background = { fill: BG_DARK };

slideLiveDemo.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 2.66,
  y: 1.25,
  w: 8.0,
  h: 5.0,
  fill: { color: CARD_BG },
  line: { color: ACCENT_VIOLET, width: 3 },
});

slideLiveDemo.addText("▶ LIVE DEMO APLIKASI", {
  x: 3.16,
  y: 1.8,
  w: 7.0,
  h: 0.8,
  fontSize: 34,
  fontFace: FONT_TITLE,
  color: ACCENT_BLUE,
  bold: true,
  align: "center",
});

slideLiveDemo.addText("Skenario Alur Demonstrasi Sistem:", {
  x: 3.16,
  y: 2.7,
  w: 7.0,
  h: 0.4,
  fontSize: 16,
  fontFace: FONT_TITLE,
  color: TEXT_WHITE,
  bold: true,
  align: "center",
});

slideLiveDemo.addText(
  "1. Registrasi Akun Mahasiswa Baru & Autentikasi Login\n" +
    "2. Dashboard Mahasiswa: Pemantauan Grafik Progres & Ring\n" +
    "3. Tambah Tugas Baru, Ubah Prioritas, & Filter Kategori\n" +
    "4. Halaman Kalender Interaktif & Pusat Notifikasi Tenggat\n" +
    "5. Pengaturan: Toggle Mode Gelap (Dark Mode) & Switch Bahasa i18n\n" +
    "6. Demo Login Admin: Fitur Grading / Memberi Nilai Berkas Tugas",
  {
    x: 3.16,
    y: 3.2,
    w: 7.0,
    h: 2.6,
    fontSize: 13,
    fontFace: FONT_BODY,
    color: TEXT_MUTED,
    align: "left",
    lineSpacing: 20,
  },
);

slideLiveDemo.addText(
  "*(Presenter: Silakan lakukan ALT + TAB ke browser untuk mendemonstrasikan)*",
  {
    x: 2.66,
    y: 5.7,
    w: 8.0,
    h: 0.4,
    fontSize: 11,
    fontFace: FONT_BODY,
    color: ACCENT_VIOLET,
    italic: true,
    align: "center",
  },
);

// ==========================================
// SLIDE 8: IMPLEMENTASI UI - ALUR LOGIN & MASUK
// ==========================================
const slide7 = createSlide(
  "DOCUMENTATION: LOGIN & AUTH FLOW",
  "SCREENSHOT DOKUMEN",
);

screensGroup1.forEach((scr, idx) => {
  const xPos = 0.8 + idx * 4.0;

  slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos,
    y: 1.5,
    w: 3.7,
    h: 5.1,
    fill: { color: CARD_BG },
    line: { color: CARD_BORDER, width: 1 },
  });

  const imagePath = path.join(targetFolder, "docs", scr.file);
  if (fs.existsSync(imagePath)) {
    slide7.addImage({
      path: imagePath,
      x: xPos + 0.85,
      y: 1.7,
      w: 2.0,
      h: 4.0,
    });
  }

  slide7.addShape(pptx.shapes.RECTANGLE, {
    x: xPos + 0.1,
    y: 5.8,
    w: 3.5,
    h: 0.7,
    fill: { color: BG_DARK },
  });

  slide7.addText(scr.title, {
    x: xPos + 0.1,
    y: 5.8,
    w: 3.5,
    h: 0.3,
    fontSize: 13,
    fontFace: FONT_TITLE,
    color: TEXT_WHITE,
    bold: true,
    align: "center",
  });

  slide7.addText(scr.desc, {
    x: xPos + 0.1,
    y: 6.1,
    w: 3.5,
    h: 0.35,
    fontSize: 10,
    fontFace: FONT_BODY,
    color: TEXT_MUTED,
    align: "center",
  });
});

// ==========================================
// SLIDE 9: IMPLEMENTASI UI - MANAJEMEN TUGAS
// ==========================================
const slide8 = createSlide(
  "DOCUMENTATION: TUGAS KULIAH CORE",
  "SCREENSHOT DOKUMEN",
);

screensGroup2.forEach((scr, idx) => {
  const xPos = 0.8 + idx * 3.0;

  slide8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos,
    y: 1.5,
    w: 2.7,
    h: 5.1,
    fill: { color: CARD_BG },
    line: { color: CARD_BORDER, width: 1 },
  });

  const imagePath = path.join(targetFolder, "docs", scr.file);
  if (fs.existsSync(imagePath)) {
    slide8.addImage({
      path: imagePath,
      x: xPos + 0.45,
      y: 1.7,
      w: 1.8,
      h: 3.6,
    });
  }

  slide8.addShape(pptx.shapes.RECTANGLE, {
    x: xPos + 0.1,
    y: 5.4,
    w: 2.5,
    h: 1.1,
    fill: { color: BG_DARK },
  });

  slide8.addText(scr.title, {
    x: xPos + 0.1,
    y: 5.4,
    w: 2.5,
    h: 0.3,
    fontSize: 12,
    fontFace: FONT_TITLE,
    color: TEXT_WHITE,
    bold: true,
    align: "center",
  });

  slide8.addText(scr.desc, {
    x: xPos + 0.1,
    y: 5.7,
    w: 2.5,
    h: 0.7,
    fontSize: 10,
    fontFace: FONT_BODY,
    color: TEXT_MUTED,
    align: "center",
    lineSpacing: 14,
  });
});

// ==========================================
// SLIDE 10: IMPLEMENTASI UI - FITUR PENUNJANG
// ==========================================
const slide9 = createSlide(
  "DOCUMENTATION: EXTRA UTILITIES",
  "SCREENSHOT DOKUMEN",
);

screensGroup3.forEach((scr, idx) => {
  const xPos = 0.8 + idx * 3.0;

  slide9.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: xPos,
    y: 1.5,
    w: 2.7,
    h: 5.1,
    fill: { color: CARD_BG },
    line: { color: CARD_BORDER, width: 1 },
  });

  const imagePath = path.join(targetFolder, "docs", scr.file);
  if (fs.existsSync(imagePath)) {
    slide9.addImage({
      path: imagePath,
      x: xPos + 0.45,
      y: 1.7,
      w: 1.8,
      h: 3.6,
    });
  }

  slide9.addShape(pptx.shapes.RECTANGLE, {
    x: xPos + 0.1,
    y: 5.4,
    w: 2.5,
    h: 1.1,
    fill: { color: BG_DARK },
  });

  slide9.addText(scr.title, {
    x: xPos + 0.1,
    y: 5.4,
    w: 2.5,
    h: 0.3,
    fontSize: 12,
    fontFace: FONT_TITLE,
    color: TEXT_WHITE,
    bold: true,
    align: "center",
  });

  slide9.addText(scr.desc, {
    x: xPos + 0.1,
    y: 5.7,
    w: 2.5,
    h: 0.7,
    fontSize: 10,
    fontFace: FONT_BODY,
    color: TEXT_MUTED,
    align: "center",
    lineSpacing: 14,
  });
});

// ==========================================
// SLIDE 11: HASIL PENGUJIAN & KELAYAKAN
// ==========================================
const slide10 = createSlide("PENGUJIAN & KELAYAKAN MITRA", "EVALUASI SISTEM");

slide10.addText("Pengujian Fungsional (Black-Box Testing):", {
  x: 0.8,
  y: 1.5,
  w: 5.5,
  h: 0.4,
  fontSize: 16,
  fontFace: FONT_TITLE,
  color: ACCENT_BLUE,
  bold: true,
});

slide10.addText(
  "• Autentikasi Pengguna: Form Login & Register sukses memvalidasi input kosong dan multi-role.\n\n" +
    "• Manajemen Tugas: CRUD tugas tersimpan rapi pada state Context API & LocalStorage.\n\n" +
    "• Interaktivitas UI: Fitur i18n dwi-bahasa dan toggler mode gelap berjalan secara instan.",
  {
    x: 0.8,
    y: 2.0,
    w: 5.5,
    h: 4.5,
    fontSize: 13,
    fontFace: FONT_BODY,
    color: TEXT_WHITE,
    lineSpacing: 22,
  },
);

slide10.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 6.8,
  y: 1.6,
  w: 5.7,
  h: 4.8,
  fill: { color: CARD_BG },
  line: { color: ACCENT_VIOLET, width: 2 },
});

slide10.addText("Uji Kelayakan Pengguna (Mitra):", {
  x: 7.1,
  y: 1.9,
  w: 5.1,
  h: 0.4,
  fontSize: 18,
  fontFace: FONT_TITLE,
  color: TEXT_WHITE,
  bold: true,
});

slide10.addText(
  "Pengujian dengan 5 perwakilan Mahasiswa Informatika UNU Yogyakarta:\n\n" +
    "1. Ahmad Fauzi (NIM 241111002): 'Dark mode nyaman di mata.'\n" +
    "2. Siti Aminah (NIM 241111015): 'Kalender titik warna sangat membantu.'\n" +
    "3. Ridho Pratama (NIM 241111009): 'Form grading tugas admin berjalan cepat.'\n\n" +
    "Hasil Evaluasi UAT: 100% Menyatakan LAYAK.",
  {
    x: 7.1,
    y: 2.4,
    w: 5.1,
    h: 3.8,
    fontSize: 12,
    fontFace: FONT_BODY,
    color: TEXT_MUTED,
    lineSpacing: 20,
  },
);

// ==========================================
// SLIDE 12: KELEBIHAN & KEKURANGAN SISTEM
// ==========================================
const slide11 = createSlide(
  "ANALISIS KELEBIHAN & KEKURANGAN",
  "EVALUASI SISTEM",
);

slide11.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8,
  y: 1.6,
  w: 5.5,
  h: 4.8,
  fill: { color: CARD_BG },
  line: { color: "10B981", width: 2 },
});

slide11.addText("Kelebihan Sistem", {
  x: 1.2,
  y: 1.9,
  w: 4.7,
  h: 0.5,
  fontSize: 20,
  fontFace: FONT_TITLE,
  color: "10B981",
  bold: true,
});

slide11.addText(
  "✔ Desain Modern & Responsif: Antarmuka mobile-first bergaya glassmorphism nyaman diakses dari smartphone.\n\n" +
    "✔ Sesi Login Persisten: Data user tersimpan aman di LocalStorage sehingga sesi tidak hilang saat halaman di-refresh.\n\n" +
    "✔ Fitur Lokalisasi Lengkap: Pilihan dwi-bahasa (ID/EN) dan toggle mode gelap/terang terintegrasi.",
  {
    x: 1.2,
    y: 2.5,
    w: 4.7,
    h: 3.6,
    fontSize: 14,
    fontFace: FONT_BODY,
    color: TEXT_WHITE,
    lineSpacing: 24,
  },
);

slide11.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 7.0,
  y: 1.6,
  w: 5.5,
  h: 4.8,
  fill: { color: CARD_BG },
  line: { color: "EF4444", width: 2 },
});

slide11.addText("Kekurangan Sistem", {
  x: 7.4,
  y: 1.9,
  w: 4.7,
  h: 0.5,
  fontSize: 20,
  fontFace: FONT_TITLE,
  color: "EF4444",
  bold: true,
});

slide11.addText(
  "✘ Client-Side Only: Seluruh data disimpan lokal di browser klien. Belum ada sinkronisasi server awan jika berganti perangkat.\n\n" +
    "✘ Notifikasi Bersifat Pasif: Pengingat tugas hanya muncul di dalam aplikasi, belum berupa push notification aktif pada layar ponsel.",
  {
    x: 7.4,
    y: 2.5,
    w: 4.7,
    h: 3.6,
    fontSize: 14,
    fontFace: FONT_BODY,
    color: TEXT_WHITE,
    lineSpacing: 24,
  },
);

// ==========================================
// SLIDE 13: SOSIALISASI & LINK AKSES
// ==========================================
const slide12 = createSlide("SOSIALISASI & SERAH TERIMA", "PENERAPAN");

slide12.addText(
  "Sosialisasi ke Himpunan Mahasiswa Informatika (HMIF) UNU Yogyakarta:",
  {
    x: 0.8,
    y: 1.4,
    w: 11.3,
    h: 0.4,
    fontSize: 16,
    fontFace: FONT_TITLE,
    color: TEXT_WHITE,
    bold: true,
  },
);

slide12.addText(
  "• Minggu I: Koordinasi dengan pengurus HMIF membahas jadwal sosialisasi produk.\n\n" +
    "• Minggu II: Demonstrasi fitur dashboard, kalender akademik, dan form tambah tugas kepada perwakilan mahasiswa.\n\n" +
    "• Minggu II (Lanjutan): Pelatihan grading pengumpulan berkas ZIP/PDF untuk asisten praktikum (Admin).\n\n" +
    "• Minggu III: Serah terima tautan repositori GitHub proyek dan berkas dokumentasi final ke Program Studi.",
  {
    x: 0.8,
    y: 2.0,
    w: 6.2,
    h: 4.5,
    fontSize: 14,
    fontFace: FONT_BODY,
    color: TEXT_WHITE,
    lineSpacing: 22,
  },
);

slide12.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 7.3,
  y: 1.8,
  w: 5.0,
  h: 4.2,
  fill: { color: CARD_BG },
  line: { color: CARD_BORDER, width: 1 },
});

slide12.addText("Akses Repositori Proyek:", {
  x: 7.7,
  y: 2.1,
  w: 4.2,
  h: 0.5,
  fontSize: 20,
  fontFace: FONT_TITLE,
  color: ACCENT_VIOLET,
  bold: true,
});

slide12.addText(
  "Seluruh kode sumber frontend dapat diakses secara publik pada repositori GitHub resmi:\n\n" +
    "Link Repositori:\nhttps://github.com/rowllyalfairo496-bit/task_manager_app\n\n" +
    "Link YouTube Video Presentasi:\nhttps://www.youtube.com/watch?v=mock-videotaskmanager",
  {
    x: 7.7,
    y: 2.8,
    w: 4.2,
    h: 2.8,
    fontSize: 14,
    fontFace: FONT_BODY,
    color: TEXT_WHITE,
    lineSpacing: 20,
  },
);

// ==========================================
// SLIDE 14: KESIMPULAN & SARAN
// ==========================================
const slide13 = createSlide("KESIMPULAN & SARAN PENGEMBANGAN", "PENUTUP");

slide13.addText("Kesimpulan Proyek:", {
  x: 0.8,
  y: 1.5,
  w: 5.5,
  h: 0.4,
  fontSize: 18,
  fontFace: FONT_TITLE,
  color: ACCENT_VIOLET,
  bold: true,
});

slide13.addText(
  "1. Aplikasi Task Manager berhasil dirancang dan dikembangkan berbasis React + Vite + Tailwind CSS untuk kebutuhan akademik mahasiswa UNU Yogyakarta.\n\n" +
    "2. Fungsionalitas pendukung (i18n, dark mode, progress ring, dual-role grading) berjalan dengan lancar dan lolos pengujian kelayakan.\n\n" +
    "3. Berhasil membantu mahasiswa Informatika meningkatkan disiplin manajemen waktu pengumpulan tugas praktikum.",
  {
    x: 0.8,
    y: 2.0,
    w: 5.5,
    h: 4.5,
    fontSize: 13,
    fontFace: FONT_BODY,
    color: TEXT_WHITE,
    lineSpacing: 22,
  },
);

slide13.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 6.8,
  y: 1.6,
  w: 5.7,
  h: 4.8,
  fill: { color: CARD_BG },
  line: { color: CARD_BORDER, width: 1 },
});

slide13.addText("Saran Pengembangan:", {
  x: 7.1,
  y: 1.9,
  w: 5.1,
  h: 0.4,
  fontSize: 18,
  fontFace: FONT_TITLE,
  color: ACCENT_BLUE,
  bold: true,
});

slide13.addText(
  "• Integrasi Cloud Database:\nMenyambungkan sistem ke server database terpusat (Firestore/Supabase) agar tersinkronisasi antar-perangkat.\n\n" +
    "• Web Push Notifications:\nMengirimkan notifikasi push secara aktif di luar aplikasi melalui Service Worker.\n\n" +
    "• API Kalender Bawaan:\nIntegrasi Google Calendar API untuk sinkronisasi otomatis deadline ke ponsel mahasiswa.",
  {
    x: 7.1,
    y: 2.4,
    w: 5.1,
    h: 3.8,
    fontSize: 12,
    fontFace: FONT_BODY,
    color: TEXT_MUTED,
    lineSpacing: 20,
  },
);

// ==========================================
// SLIDE 15: THANK YOU
// ==========================================
const slide14 = pptx.addSlide();
slide14.background = { fill: BG_DARK };

slide14.addText("SEKIAN & TERIMA KASIH", {
  x: 1.0,
  y: 2.2,
  w: 11.3,
  h: 1.0,
  fontSize: 50,
  fontFace: FONT_TITLE,
  color: ACCENT_VIOLET,
  bold: true,
  align: "center",
});

slide14.addText("Apakah ada pertanyaan? / Q&A Session", {
  x: 1.0,
  y: 3.3,
  w: 11.3,
  h: 0.6,
  fontSize: 22,
  fontFace: FONT_BODY,
  color: TEXT_WHITE,
  align: "center",
});

slide14.addShape(pptx.shapes.RECTANGLE, {
  x: 5.1,
  y: 4.2,
  w: 3.0,
  h: 0.05,
  fill: { color: ACCENT_BLUE },
});

slide14.addText(
  "M. Rowlly Alfairo (NIM: 241111024) — Program Studi Informatika UNU Yogyakarta",
  {
    x: 1.0,
    y: 4.6,
    w: 11.3,
    h: 0.5,
    fontSize: 13,
    fontFace: FONT_BODY,
    color: TEXT_MUTED,
    align: "center",
  },
);

// Save the PPT file directly inside Laporan_Final_Task Manager
pptx
  .writeFile({ fileName: docPath })
  .then(() => {
    console.log(
      `PowerPoint presentation successfully generated at: ${docPath}`,
    );
  })
  .catch((err) => {
    console.error("Error generating PPT:", err);
  });
