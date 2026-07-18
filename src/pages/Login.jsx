import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useUser } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { login, loginAsGoogle } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(email, password);
    setIsLoading(false);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError("Email atau password salah. Periksa kembali kredensial Anda.");
    }
  };

  const handleGoogleLogin = () => {
    loginAsGoogle();
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background:
          "linear-gradient(145deg, #0d0c1d 0%, #1a1060 50%, #0d1a3a 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Blobs Background */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(99,56,240,0.35) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "blobMove 8s ease-in-out infinite",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-5%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(79,142,247,0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "blobMove 10s ease-in-out infinite reverse",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "20%",
          width: "250px",
          height: "250px",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          animation: "blobMove 12s ease-in-out infinite 2s",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Left Hero Panel — Desktop Only */}
      <div
        style={{
          display: "none",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          position: "relative",
        }}
        className="login-hero-panel"
      >
        <style>{`
          @media (min-width: 900px) {
            .login-hero-panel { display: flex !important; }
            .login-form-panel { border-radius: 0 40px 40px 0 !important; }
          }
        `}</style>
        <div
          className="slide-up"
          style={{ textAlign: "center", color: "white", zIndex: 1 }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              margin: "0 auto 24px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.15)",
              animation: "float 4s ease-in-out infinite",
              boxShadow: "0 8px 32px rgba(99,56,240,0.4)",
            }}
          >
            <Zap size={28} color="white" fill="white" />
          </div>
          <h1
            style={{
              fontSize: "2.8rem",
              fontWeight: "800",
              lineHeight: "1.15",
              marginBottom: "20px",
              letterSpacing: "-0.03em",
            }}
          >
            Kelola Tugas
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Lebih Cerdas
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: "1.7",
              maxWidth: "340px",
              margin: "0 auto",
            }}
          >
            Platform manajemen tugas kuliah terpadu untuk mahasiswa dan dosen.
          </p>

          {/* Feature chips */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "36px",
            }}
          >
            {["Kalender Pintar", "Notifikasi Real-time", "Analitik Nilai"].map(
              (f, i) => (
                <span
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: "100px",
                    padding: "8px 16px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    color: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {f}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div
        className="login-form-panel"
        style={{
          width: "100%",
          maxWidth: "460px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.96)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 40px",
          borderRadius: "40px",
          alignSelf: "center",
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
          boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
        }}
      >
        <style>{`[data-theme="dark"] .login-form-panel { background: rgba(22,20,44,0.97) !important; }`}</style>

        {/* Login Hero Title */}
        <div className="slide-up" style={{ marginBottom: "36px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "var(--primary-gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 6px 20px rgba(99,56,240,0.3)",
              }}
            >
              <Zap size={28} color="white" fill="white" />
            </div>
            <div>
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  color: "var(--primary)",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Login
              </span>
            </div>
          </div>
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: "900",
              margin: "0 0 12px",
              lineHeight: "1.05",
              color: "var(--text-main)",
            }}
          >
            Kelola Tugas
            <br />
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Lebih Cerdas
            </span>
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "0.95rem",
              color: "var(--text-muted)",
              lineHeight: "1.7",
              maxWidth: "420px",
            }}
          >
            Platform manajemen tugas kuliah terpadu untuk mahasiswa dan dosen.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="slide-up"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "var(--error-light)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "var(--radius-md)",
              padding: "12px 16px",
              color: "var(--error)",
              fontSize: "0.85rem",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="slide-up-1">
          <div
            className={`floating-group ${email !== "" || isEmailFocused ? "active" : ""}`}
          >
            <div className="input-icon-wrapper">
              <Mail className="icon" size={18} />
              <input
                type="email"
                className="input-field"
                placeholder=""
                value={email}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="floating-label">Email</label>
            </div>
          </div>

          <div
            className={`floating-group ${password !== "" || isPasswordFocused ? "active" : ""}`}
          >
            <div className="input-icon-wrapper">
              <Lock className="icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
                placeholder=""
                value={password}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="floating-label">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-muted)",
                  display: "flex",
                  padding: "4px",
                  borderRadius: "6px",
                  transition: "color 0.2s",
                  zIndex: 2,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary ripple"
            style={{ marginTop: "4px", fontSize: "1rem", gap: "8px" }}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{ animation: "spin-slow 0.8s linear infinite" }}
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            ) : (
              <Sparkles size={18} />
            )}
            {isLoading ? "Masuk..." : t("login")}
          </button>
        </form>

        {/* Divider */}
        <div
          className="slide-up-2"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "24px 0",
          }}
        >
          <div
            style={{ flex: 1, height: "1px", background: "var(--border)" }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              fontWeight: "700",
              letterSpacing: "0.06em",
            }}
          >
            ATAU
          </span>
          <div
            style={{ flex: 1, height: "1px", background: "var(--border)" }}
          />
        </div>

        {/* Google Login */}
        <button
          className="slide-up-3 ripple"
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: "var(--radius-md)",
            border: "1.5px solid var(--border)",
            background: "var(--surface-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "0.93rem",
            fontWeight: "700",
            color: "var(--text-main)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--surface)";
            e.currentTarget.style.borderColor = "var(--primary)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--surface-2)";
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Masuk dengan Google
        </button>

        <div
          className="slide-up-4"
          style={{
            textAlign: "center",
            marginTop: "28px",
            fontSize: "0.88rem",
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>{t("noAccount")} </span>
          <Link
            to="/register"
            style={{
              color: "var(--primary)",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            {t("registerHere")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
