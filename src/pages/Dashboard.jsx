import { useNavigate } from "react-router-dom";
import { useDrawer } from "../context/DrawerContext";
import { useLanguage } from "../context/LanguageContext";
import { useUser } from "../context/UserContext";
import { useTasks } from "../context/TaskContext";
import {
  Menu,
  Bell,
  Plus,
  FileText,
  Calendar as CalendarIcon,
  Shield,
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertCircle,
  UserPlus,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

// --- Urgency color helper ---
const getDeadlineUrgency = (deadlineStr) => {
  if (!deadlineStr) return null;
  const match = deadlineStr.match(
    /(\d+)\s*(Jan|Feb|Mar|Apr|Mei|Jun|Jul|Agu|Sep|Okt|Nov|Des)/i,
  );
  if (!match) return "safe";
  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    Mei: 4,
    Jun: 5,
    Jul: 6,
    Agu: 7,
    Sep: 8,
    Okt: 9,
    Nov: 10,
    Des: 11,
  };
  const day = parseInt(match[1]);
  const month = monthMap[match[2]];
  const now = new Date();
  const deadline = new Date(now.getFullYear(), month, day);
  const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return "overdue";
  if (diffDays <= 3) return "critical";
  if (diffDays <= 7) return "warning";
  return "safe";
};

const urgencyStyle = {
  overdue: {
    border: "1.5px solid rgba(239,68,68,0.4)",
    bg: "rgba(239,68,68,0.04)",
  },
  critical: {
    border: "1.5px solid rgba(239,68,68,0.3)",
    bg: "rgba(239,68,68,0.03)",
  },
  warning: {
    border: "1.5px solid rgba(245,158,11,0.35)",
    bg: "rgba(245,158,11,0.03)",
  },
  safe: { border: "1px solid var(--border)", bg: "transparent" },
};

const urgencyBadge = {
  overdue: { bg: "var(--error-light)", color: "var(--error)", label: "Lewat" },
  critical: {
    bg: "var(--error-light)",
    color: "var(--error)",
    label: "Mendesak",
  },
  warning: { bg: "var(--warning-light)", color: "#b45309", label: "Segera" },
  safe: { bg: "var(--success-light)", color: "var(--success)", label: null },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { openDrawer } = useDrawer();
  const { t, lang } = useLanguage();
  const { user } = useUser();
  const { tasks, submissions, notifications } = useTasks();
  const isAdmin = user?.role === "admin";

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Admin stats
  let pendingGradingCount = 0;
  let gradedCount = 0;
  Object.keys(submissions).forEach((taskId) => {
    if (tasks.some((t) => t.id === taskId)) {
      const taskSubs = submissions[taskId] || [];
      pendingGradingCount += taskSubs.filter(
        (s) => s.status === "ungraded",
      ).length;
      gradedCount += taskSubs.filter((s) => s.status === "graded").length;
    }
  });

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const doneTasks = tasks.filter((t) => t.status === "done").length;

  const today = new Date().toLocaleDateString(
    lang === "id" ? "id-ID" : "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
    },
  );

  const progressPercent =
    totalTasks > 0
      ? Math.round(((isAdmin ? gradedCount : doneTasks) / totalTasks) * 100)
      : 0;

  return (
    <div className="page-container fade-in bg-gradient" style={{ padding: 0 }}>
      {/* Top Bar */}
      <div className="top-bar-wrapper">
        <div className="top-bar">
          <button className="icon-btn hide-on-desktop" onClick={openDrawer}>
            <Menu size={24} />
          </button>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h2 className="top-bar-title" style={{ margin: 0 }}>
                {isAdmin ? t("adminTasks") : t("myTasks")}
              </h2>
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: "800",
                  padding: "3px 9px",
                  borderRadius: "var(--radius-full)",
                  background: isAdmin
                    ? "rgba(239,68,68,0.12)"
                    : "rgba(16,185,129,0.12)",
                  color: isAdmin ? "var(--error)" : "var(--success)",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                {isAdmin ? (
                  <>
                    <Shield size={9} /> Admin
                  </>
                ) : (
                  <>
                    <GraduationCap size={9} /> Mahasiswa
                  </>
                )}
              </span>
            </div>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                fontWeight: "600",
              }}
            >
              {user?.name || "Pengguna"}
            </span>
          </div>
          <button
            className="icon-btn"
            onClick={() => navigate("/notifications")}
            style={{ position: "relative" }}
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  background: "var(--error)",
                  borderRadius: "50%",
                  border: "1.5px solid var(--background)",
                }}
              />
            )}
          </button>
        </div>
        {/* Add Member Button */}
        <div style={{ padding: "0 20px", marginTop: "4px" }}>
          <button
            onClick={() => {}}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-full)",
              padding: "6px 14px",
              fontSize: "0.75rem",
              fontWeight: "700",
              color: "var(--primary)",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--primary-light)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--surface-2)";
            }}
          >
            <UserPlus size={14} />
            {lang === "id" ? "Tambah Anggota" : "Add Member"}
          </button>
        </div>
      </div>

      <div
        style={{
          padding: "0 20px",
          flex: 1,
          overflowY: "auto",
          paddingBottom: "16px",
        }}
      >
        {/* Hero Greeting Card */}
        <div className="hero-card slide-up" style={{ marginTop: "16px" }}>
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  opacity: 0.8,
                  marginBottom: "4px",
                }}
              >
                {today}
              </div>
              <h2
                style={{
                  fontSize: "1.45rem",
                  fontWeight: "800",
                  color: "white",
                  marginBottom: "2px",
                  lineHeight: 1.2,
                }}
              >
                {t("welcome")}
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.78)",
                  fontSize: "0.85rem",
                  margin: 0,
                }}
              >
                {isAdmin
                  ? `${pendingGradingCount} tugas menunggu penilaian`
                  : pendingTasks > 0
                    ? `${pendingTasks} tugas belum dikerjakan`
                    : "Semua tugas selesai! 🎉"}
              </p>
            </div>

            {/* Circular Progress Ring */}
            <div
              style={{
                position: "relative",
                width: "64px",
                height: "64px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 36 36"
                style={{ transform: "rotate(-90deg)" }}
              >
                {/* Background circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="3.5"
                />
                {/* Foreground circle (progress) */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeDasharray="100.5"
                  strokeDashoffset={100.5 - (100.5 * progressPercent) / 100}
                  strokeLinecap="round"
                  style={{
                    transition:
                      "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </svg>
              {/* Text inside the ring */}
              <div
                style={{
                  position: "absolute",
                  fontSize: "0.78rem",
                  fontWeight: "800",
                  color: "white",
                }}
              >
                {progressPercent}%
              </div>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          {/* Total */}
          <div className="stat-card slide-up-1">
            <div
              className="stat-icon"
              style={{ background: "rgba(99,56,240,0.1)" }}
            >
              <FileText size={18} color="var(--primary)" />
            </div>
            <div className="stat-value" style={{ color: "var(--primary)" }}>
              {totalTasks}
            </div>
            <div className="stat-label">
              {isAdmin ? t("adminStatsTotal") : t("total")}
            </div>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{ width: "100%", background: "var(--primary)" }}
              />
            </div>
          </div>

          {/* Pending/Ungraded */}
          <div className="stat-card slide-up-2">
            <div
              className="stat-icon"
              style={{
                background: isAdmin
                  ? "rgba(245,158,11,0.1)"
                  : "rgba(239,68,68,0.1)",
              }}
            >
              <AlertCircle
                size={18}
                color={isAdmin ? "var(--warning)" : "var(--error)"}
              />
            </div>
            <div
              className="stat-value"
              style={{ color: isAdmin ? "var(--warning)" : "var(--error)" }}
            >
              {isAdmin ? pendingGradingCount : pendingTasks}
            </div>
            <div className="stat-label">
              {isAdmin ? t("adminStatsPending") : t("notDone")}
            </div>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{
                  width:
                    totalTasks > 0
                      ? `${((isAdmin ? pendingGradingCount : pendingTasks) / totalTasks) * 100}%`
                      : "0%",
                  background: isAdmin ? "var(--warning)" : "var(--error)",
                }}
              />
            </div>
          </div>

          {/* Done/Graded */}
          <div className="stat-card slide-up-3">
            <div
              className="stat-icon"
              style={{ background: "rgba(16,185,129,0.1)" }}
            >
              <CheckCircle2 size={18} color="var(--success)" />
            </div>
            <div className="stat-value" style={{ color: "var(--success)" }}>
              {isAdmin ? gradedCount : doneTasks}
            </div>
            <div className="stat-label">
              {isAdmin ? t("adminStatsDone") : t("done")}
            </div>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                style={{
                  width:
                    totalTasks > 0
                      ? `${((isAdmin ? gradedCount : doneTasks) / totalTasks) * 100}%`
                      : "0%",
                  background: "var(--success)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Task List Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
          }}
        >
          <h3 style={{ fontSize: "1rem", margin: 0, fontWeight: "800" }}>
            {t("taskList")}
          </h3>
          {isAdmin && (
            <button
              onClick={() => navigate("/add-task")}
              style={{
                background: "var(--primary-gradient)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-full)",
                padding: "7px 16px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "0.78rem",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(99,56,240,0.3)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(99,56,240,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 14px rgba(99,56,240,0.3)";
              }}
            >
              <Plus size={15} /> {t("add")}
            </button>
          )}
        </div>

        {/* Task Grid */}
        <div className="task-grid" style={{ paddingBottom: "32px" }}>
          {tasks.length === 0 && (
            <div
              className="card"
              style={{
                padding: "40px 24px",
                textAlign: "center",
                border: "1.5px dashed var(--border)",
                background: "transparent",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>📭</div>
              <div
                style={{
                  fontWeight: "700",
                  color: "var(--text-muted)",
                  fontSize: "0.95rem",
                }}
              >
                {lang === "id" ? "Belum ada tugas" : "No tasks yet"}
              </div>
            </div>
          )}
          {tasks.map((task, i) => {
            const taskSubs = submissions[task.id] || [];
            const submittedCount = taskSubs.filter(
              (s) => s.submittedAt !== null,
            ).length;
            const totalStudents = taskSubs.length;
            const needsGrading = taskSubs.some((s) => s.status === "ungraded");
            const urgency = getDeadlineUrgency(task.deadline);
            const ust = urgencyStyle[urgency] || urgencyStyle.safe;
            const ubg = urgencyBadge[urgency] || urgencyBadge.safe;

            return (
              <div
                key={task.id}
                className="card slide-up"
                onClick={() => navigate(`/task/${task.id}`)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  cursor: "pointer",
                  padding: "14px 16px",
                  animationDelay: `${i * 0.06}s`,
                  border: ust.border,
                  background: `${ust.bg}`,
                }}
              >
                {/* Color dot */}
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: task.color || "var(--primary)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    flexShrink: 0,
                    boxShadow: `0 4px 12px ${task.color || "rgba(99,56,240,0.3)"}55`,
                  }}
                >
                  <FileText size={22} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4
                    style={{
                      margin: "0 0 3px",
                      fontSize: "0.95rem",
                      fontWeight: "700",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {task.title}
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: "var(--text-muted)",
                      fontSize: "0.75rem",
                    }}
                  >
                    <CalendarIcon size={11} />
                    <span>
                      {t("deadline")}: {task.deadline}
                    </span>
                    {urgency === "critical" && (
                      <span
                        style={{ color: "var(--error)", fontWeight: "700" }}
                      >
                        {" "}
                        • Mendesak!
                      </span>
                    )}
                    {urgency === "overdue" && (
                      <span
                        style={{ color: "var(--error)", fontWeight: "700" }}
                      >
                        {" "}
                        • Lewat Deadline!
                      </span>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "4px",
                    flexShrink: 0,
                  }}
                >
                  {isAdmin ? (
                    <span
                      className="badge"
                      style={{
                        background: needsGrading
                          ? "var(--warning-light)"
                          : "var(--primary-light)",
                        color: needsGrading ? "#b45309" : "var(--primary)",
                      }}
                    >
                      {submittedCount}/{totalStudents}{" "}
                      {lang === "id" ? "Kumpul" : "Subs"}
                    </span>
                  ) : (
                    <>
                      <span
                        className={`badge ${task.status === "done" ? "badge-success" : "badge-danger"}`}
                      >
                        {task.status === "done"
                          ? t("statusDone")
                          : t("statusPending")}
                      </span>
                      {urgency !== "safe" &&
                        task.status !== "done" &&
                        ubg.label && (
                          <span
                            className="badge"
                            style={{
                              background: ubg.bg,
                              color: ubg.color,
                              fontSize: "0.6rem",
                            }}
                          >
                            <Clock
                              size={9}
                              style={{
                                verticalAlign: "middle",
                                marginRight: 2,
                              }}
                            />
                            {ubg.label}
                          </span>
                        )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
