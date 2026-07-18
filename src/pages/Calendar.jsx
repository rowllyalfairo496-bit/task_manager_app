import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  User,
  MapPin,
  Clock,
} from "lucide-react";
import BottomNav from "../components/BottomNav";
import { useLanguage } from "../context/LanguageContext";
import { useUser } from "../context/UserContext";
import { useTasks } from "../context/TaskContext";

const Calendar = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { user } = useUser();
  const { tasks } = useTasks();
  const isAdmin = user?.role === "admin";

  const [activeTab, setActiveTab] = useState("calendar"); // 'calendar' or 'schedule'
  const [selectedDate, setSelectedDate] = useState({
    date: 12,
    current: true,
    weekday: "Selasa",
  });

  const weekdays = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];

  const daysOfWeek =
    lang === "id"
      ? ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const classSchedule = {
    Senin: [
      {
        time: "08:00 - 10:30",
        course: "Rekayasa Web",
        lecturer: "Roni Munandar, M.T.",
        room: "Lab Komputer 3",
        color: "var(--color-rw)",
      },
    ],
    Selasa: [
      {
        time: "08:00 - 10:30",
        course: "Pemrograman Berorientasi Objek",
        lecturer: "Dr. Eng. Faris",
        room: "Ruang D.204",
        color: "var(--color-pbo)",
      },
    ],
    Rabu: [
      {
        time: "13:00 - 15:30",
        course: "Basis Data",
        lecturer: "Siti Rahma, M.Kom.",
        room: "Lab Komputer 1",
        color: "var(--color-bd)",
      },
    ],
    Kamis: [
      {
        time: "10:45 - 13:15",
        course: "Rekayasa Perangkat Lunak",
        lecturer: "Ahmad Faisal, Ph.D.",
        room: "Ruang D.302",
        color: "var(--color-rpl)",
      },
    ],
    Jumat: [
      {
        time: "08:00 - 10:30",
        course: "Keamanan Jaringan",
        lecturer: "Irfan Hakim, M.T.",
        room: "Lab Komputer 2",
        color: "var(--color-kj)",
      },
    ],
  };

  // Helper to extract day number from deadline string (e.g. "8 Mei 2025" or "8 Mei 2025, 23:59")
  const getDayFromDeadline = (deadlineStr) => {
    if (!deadlineStr) return null;
    const match = deadlineStr.match(/^\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  // Build tasksMap dynamically
  const dynamicTasksMap = {};
  tasks.forEach((task) => {
    const day = getDayFromDeadline(task.deadline);
    if (day) {
      if (!dynamicTasksMap[day]) {
        dynamicTasksMap[day] = [];
      }
      let time = "23:59";
      if (task.deadline.includes(",")) {
        time = task.deadline.split(",")[1].trim();
      }
      dynamicTasksMap[day].push({
        title: task.title,
        course: task.course,
        color: task.color,
        time: time,
      });
    }
  });

  const renderDays = () => {
    const days = [];
    // April padding (28 to 31)
    for (let i = 28; i <= 31; i++) {
      days.push({ date: i, active: false, current: false, index: days.length });
    }
    // May (1 to 31)
    for (let i = 1; i <= 31; i++) {
      const dayTasks = dynamicTasksMap[i] || [];
      const hasTask = dayTasks.length > 0;
      const color = hasTask ? dayTasks[0].color : null;

      days.push({
        date: i,
        active: hasTask,
        color: color,
        current: true,
        index: days.length,
      });
    }
    // June padding (1 to 7)
    for (let i = 1; i <= 7; i++) {
      days.push({ date: i, active: false, current: false, index: days.length });
    }

    return days.slice(0, 35).map((d) => {
      const isSelected =
        selectedDate &&
        selectedDate.date === d.date &&
        selectedDate.current === d.current;
      const weekday = weekdays[d.index % 7];

      return (
        <div
          key={d.index}
          onClick={() =>
            d.current &&
            setSelectedDate({ date: d.date, current: d.current, weekday })
          }
          style={{
            textAlign: "center",
            padding: "6px 0",
            fontWeight: isSelected ? "800" : "normal",
            background: isSelected ? "rgba(99, 56, 240, 0.1)" : "transparent",
            border: isSelected
              ? "1.5px solid var(--primary)"
              : "1.5px solid transparent",
            borderRadius: "16px",
            color: isSelected
              ? "var(--primary)"
              : d.current
                ? "var(--text-main)"
                : "var(--text-muted)",
            width: "42px",
            height: "42px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            cursor: d.current ? "pointer" : "default",
            position: "relative",
            transition: "all 0.15s ease",
          }}
        >
          <span
            style={{
              fontSize: "0.9rem",
              transform: d.active ? "translateY(-2px)" : "none",
            }}
          >
            {d.date}
          </span>
          {d.active && (
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: d.color,
                position: "absolute",
                bottom: "4px",
              }}
            />
          )}
        </div>
      );
    });
  };

  const getAgendaContent = () => {
    if (!selectedDate) return null;
    const { date, weekday } = selectedDate;
    const dayClasses = classSchedule[weekday] || [];
    const dayTasks = dynamicTasksMap[date] || [];

    const showRelaxMessage = dayClasses.length === 0 && dayTasks.length === 0;

    return (
      <div className="slide-up" style={{ animationDelay: "0.1s" }}>
        <h3
          style={{
            fontSize: "1rem",
            marginBottom: "16px",
            color: "var(--text-main)",
          }}
        >
          {lang === "id"
            ? `Agenda ${weekday}, ${date} Mei`
            : `Agenda on ${weekday}, May ${date}`}
        </h3>

        {showRelaxMessage ? (
          <div
            className="card"
            style={{
              padding: "24px",
              textAlign: "center",
              background: "rgba(99, 56, 240, 0.02)",
              border: "1px dashed var(--border)",
            }}
          >
            <span
              style={{
                fontSize: "2rem",
                display: "block",
                marginBottom: "8px",
              }}
            >
              ☕
            </span>
            <div
              style={{
                fontWeight: "700",
                fontSize: "0.95rem",
                color: "var(--text-main)",
                marginBottom: "4px",
              }}
            >
              {lang === "id" ? "Tidak ada Kegiatan" : "No Activities"}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {lang === "id"
                ? "Jadwal kuliah & tenggat tugas kosong. Waktunya santai!"
                : "Your class and task deadlines are clear. Time to relax!"}
            </div>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Class schedule section */}
            {dayClasses.map((item, idx) => (
              <div
                key={`class-${idx}`}
                className="card"
                style={{
                  borderLeft: `4px solid ${item.color}`,
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    className="badge"
                    style={{
                      background: "rgba(99, 56, 240, 0.08)",
                      color: "var(--primary)",
                      fontSize: "0.7rem",
                    }}
                  >
                    {isAdmin
                      ? lang === "id"
                        ? "📖 Jadwal Mengajar"
                        : "📖 Teaching Schedule"
                      : lang === "id"
                        ? "📖 Jadwal Kuliah"
                        : "📖 Class Schedule"}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Clock size={12} /> {item.time}
                  </span>
                </div>
                <h4 style={{ fontSize: "0.95rem", margin: "0 0 8px" }}>
                  {item.course}
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <User size={12} /> {item.lecturer}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <MapPin size={12} /> {item.room}
                  </div>
                </div>
              </div>
            ))}

            {/* Tasks deadline section */}
            {dayTasks.map((item, idx) => (
              <div
                key={`task-${idx}`}
                className="card"
                style={{
                  borderLeft: `4px solid ${item.color}`,
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <span className="badge badge-danger">
                    ⚠️{" "}
                    {isAdmin
                      ? lang === "id"
                        ? "Tenggat Pengumpulan"
                        : "Submission Deadline"
                      : lang === "id"
                        ? "Tenggat Tugas"
                        : "Task Deadline"}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      color: "var(--error)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Clock size={12} /> {item.time}
                  </span>
                </div>
                <h4 style={{ fontSize: "0.95rem", margin: "0 0 4px" }}>
                  {item.title}
                </h4>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <BookOpen size={12} /> {item.course}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="page-container fade-in"
      style={{ padding: 0, background: "var(--surface)" }}
    >
      {/* Top Bar */}
      <div className="top-bar">
        <button
          className="icon-btn hide-on-desktop"
          onClick={() => navigate(-1)}
          style={{ marginLeft: "-8px" }}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="top-bar-title">{t("calendarTitle")}</h2>
        <div style={{ width: 24 }}></div>
      </div>

      {/* Tab Switcher */}
      <div className="tab-container" style={{ margin: "0 24px 16px" }}>
        <button
          className={`tab-btn ${activeTab === "calendar" ? "active" : ""}`}
          onClick={() => setActiveTab("calendar")}
        >
          📅 {lang === "id" ? "Kalender Tugas" : "Task Calendar"}
        </button>
        <button
          className={`tab-btn ${activeTab === "schedule" ? "active" : ""}`}
          onClick={() => setActiveTab("schedule")}
        >
          ⏰{" "}
          {isAdmin
            ? lang === "id"
              ? "Jadwal Mengajar"
              : "Teaching Schedule"
            : lang === "id"
              ? "Jadwal Kuliah"
              : "Class Schedule"}
        </button>
      </div>

      <div style={{ padding: "0 24px", flex: 1, overflowY: "auto" }}>
        {activeTab === "calendar" ? (
          <div className="desktop-grid-2">
            <div>
              {/* Calendar Grid Container */}
              <div className="card slide-up" style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <button className="icon-btn">
                    <ChevronLeft size={20} />
                  </button>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1rem",
                      color: "var(--text-main)",
                    }}
                  >
                    Mei 2025
                  </h3>
                  <button className="icon-btn">
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Days of week */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  {daysOfWeek.map((day, i) => (
                    <div
                      key={i}
                      style={{
                        textAlign: "center",
                        fontSize: "0.75rem",
                        fontWeight: "800",
                        color: "var(--text-muted)",
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "8px 0",
                  }}
                >
                  {renderDays()}
                </div>
              </div>

              {/* Course Color Legend */}
              <div
                className="legend-container slide-up"
                style={{ marginBottom: "24px" }}
              >
                <div
                  style={{
                    width: "100%",
                    fontSize: "0.8rem",
                    fontWeight: "800",
                    color: "var(--text-main)",
                    marginBottom: "4px",
                  }}
                >
                  {lang === "id" ? "Warna Mata Kuliah:" : "Course Colors:"}
                </div>
                <div className="legend-item">
                  <span
                    className="legend-dot"
                    style={{ background: "var(--color-pbo)" }}
                  ></span>{" "}
                  PBO
                </div>
                <div className="legend-item">
                  <span
                    className="legend-dot"
                    style={{ background: "var(--color-rpl)" }}
                  ></span>{" "}
                  RPL
                </div>
                <div className="legend-item">
                  <span
                    className="legend-dot"
                    style={{ background: "var(--color-bd)" }}
                  ></span>{" "}
                  Basis Data
                </div>
                <div className="legend-item">
                  <span
                    className="legend-dot"
                    style={{ background: "var(--color-kj)" }}
                  ></span>{" "}
                  Keamanan Jaringan
                </div>
                <div className="legend-item">
                  <span
                    className="legend-dot"
                    style={{ background: "var(--color-rw)" }}
                  ></span>{" "}
                  Rekayasa Web
                </div>
              </div>
            </div>

            {/* Agenda Details */}
            {getAgendaContent()}
          </div>
        ) : (
          /* Weekly Class Schedule Timetable */
          <div className="schedule-list slide-up">
            {weekdays.slice(0, 5).map((dayName) => {
              const classes = classSchedule[dayName] || [];
              return (
                <div key={dayName} className="day-section">
                  <div className="day-title">
                    <span
                      style={{
                        width: "6px",
                        height: "18px",
                        background: "var(--primary)",
                        borderRadius: "4px",
                      }}
                    />
                    {dayName}
                  </div>
                  {classes.length === 0 ? (
                    <div
                      style={{
                        padding: "12px 16px",
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        background: "var(--background)",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      {lang === "id"
                        ? "Tidak ada perkuliahan"
                        : "No classes today"}
                    </div>
                  ) : (
                    classes.map((item, idx) => (
                      <div
                        key={idx}
                        className="schedule-card"
                        style={{ borderLeftColor: item.color }}
                      >
                        <div style={{ flex: 1 }}>
                          <h4
                            style={{
                              fontSize: "0.95rem",
                              margin: "0 0 4px",
                              color: "var(--text-main)",
                            }}
                          >
                            {item.course}
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "12px",
                              fontSize: "0.75rem",
                              color: "var(--text-muted)",
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <User size={12} /> {item.lecturer}
                            </span>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <MapPin size={12} /> {item.room}
                            </span>
                          </div>
                        </div>
                        <div className="schedule-time">{item.time}</div>
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Calendar;
