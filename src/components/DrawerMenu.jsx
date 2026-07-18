import { useNavigate, useLocation } from "react-router-dom";
import { useDrawer } from "../context/DrawerContext";
import { useLanguage } from "../context/LanguageContext";
import { useUser } from "../context/UserContext";
import {
  Home,
  CheckSquare,
  Calendar as CalendarIcon,
  Bell,
  Settings,
  Info,
  LogOut,
  Shield,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

const DrawerMenu = () => {
  const { isOpen, closeDrawer } = useDrawer();
  const { t } = useLanguage();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = user?.role === "admin";

  if (!isOpen) return null;

  const menuItems = [
    {
      labelKey: "home",
      icon: <Home size={20} />,
      path: "/dashboard",
      color: "#6338f0",
    },
    {
      labelKey: isAdmin ? "adminTasks" : "myTasks",
      icon: <CheckSquare size={20} />,
      path: "/dashboard",
      color: "#ec4899",
    },
    {
      labelKey: "calendar",
      icon: <CalendarIcon size={20} />,
      path: "/calendar",
      color: "#06b6d4",
    },
    {
      labelKey: "notifications",
      icon: <Bell size={20} />,
      path: "/notifications",
      color: "#f59e0b",
    },
  ];

  const bottomMenuItems = [
    {
      labelKey: "settings",
      icon: <Settings size={20} />,
      path: "/settings",
      color: "#8b5cf6",
    },
    {
      labelKey: "help",
      icon: <Info size={20} />,
      path: "/help",
      color: "#10b981",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    closeDrawer();
  };
  const handleLogout = () => {
    logout();
    navigate("/");
    closeDrawer();
  };

  return (
    <>
      <div className="drawer-overlay" onClick={closeDrawer} />
      <div
        className={`drawer ${isOpen ? "open" : ""}`}
        style={{ borderRadius: "0 28px 28px 0" }}
      >
        {/* Profile Header */}
        <div
          style={{
            background: "var(--primary-gradient)",
            padding: "48px 20px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              right: 20,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Avatar with animated ring */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "var(--primary)",
                  fontSize: "22px",
                  fontWeight: "800",
                  overflow: "hidden",
                  boxShadow: "0 0 0 3px rgba(255,255,255,0.35)",
                  animation: "pulse-ring 2.5s infinite",
                }}
              >
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  user.name?.charAt(0)
                )}
              </div>
              {/* Online dot */}
              <div
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#4ade80",
                  border: "2px solid white",
                }}
              />
            </div>

            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "1rem",
                  fontWeight: "800",
                  color: "white",
                }}
              >
                {user?.name}
              </h3>
              <p
                style={{
                  margin: "2px 0 8px",
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "0.75rem",
                }}
              >
                {user?.email}
              </p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.62rem",
                  fontWeight: "800",
                  padding: "3px 10px",
                  borderRadius: "var(--radius-full)",
                  background: isAdmin
                    ? "rgba(239,68,68,0.3)"
                    : "rgba(16,185,129,0.3)",
                  color: isAdmin ? "#fca5a5" : "#86efac",
                  border: `1px solid ${isAdmin ? "rgba(239,68,68,0.4)" : "rgba(16,185,129,0.4)"}`,
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
          </div>
        </div>

        {/* Menu Items */}
        <div style={{ padding: "12px 0", flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "4px 12px 0" }}>
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  style={{
                    padding: "11px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: isActive ? item.color : "var(--text-main)",
                    fontWeight: isActive ? "700" : "500",
                    background: isActive ? `${item.color}14` : "transparent",
                    cursor: "pointer",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "4px",
                    transition: "all 0.18s ease",
                    fontSize: "0.9rem",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = `${item.color}0d`;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      background: isActive
                        ? `${item.color}20`
                        : "var(--surface-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isActive ? item.color : "var(--text-muted)",
                      flexShrink: 0,
                      transition: "all 0.18s ease",
                    }}
                  >
                    {item.icon}
                  </div>
                  <span style={{ flex: 1 }}>{t(item.labelKey)}</span>
                  {isActive && <ChevronRight size={16} color={item.color} />}
                </div>
              );
            })}
          </div>

          <div
            style={{
              height: "1px",
              background: "var(--border)",
              margin: "12px 20px",
            }}
          />

          <div style={{ padding: "0 12px" }}>
            {bottomMenuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleNavigation(item.path)}
                style={{
                  padding: "11px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "var(--text-main)",
                  fontWeight: "500",
                  cursor: "pointer",
                  borderRadius: "var(--radius-md)",
                  marginBottom: "4px",
                  fontSize: "0.9rem",
                  transition: "background 0.18s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${item.color}0d`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    background: `${item.color}14`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.color,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <span>{t(item.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div
          style={{ padding: "16px 24px", borderTop: "1px solid var(--border)" }}
        >
          <div
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              color: "var(--error)",
              fontWeight: "700",
              cursor: "pointer",
              background: "var(--error-light)",
              transition: "opacity 0.2s",
              fontSize: "0.9rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <LogOut size={18} />
            <span>{t("logout")}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawerMenu;
