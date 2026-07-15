import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { useAdminAuth } from "./AdminAuth";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (login(username, password)) {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 500);
  };

  if (isAuthenticated) {
    return <motion.div variants={fadeUp} initial="hidden" animate="show" className="min-h-screen flex items-center justify-center"><div className="text-center"><Loader2 size={48} className="mx-auto text-[#d4af37] animate-spin" /><p className="mt-4 text-[#a89f95]">Redirecting...</p></div></motion.div>;
  }

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" className="min-h-screen flex items-center justify-center bg-[#161314] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-display font-bold uppercase text-3xl lg:text-4xl tracking-tight">
            Admin <span className="text-[#d4af37]">Login</span>
          </h1>
          <p className="mt-3 text-[#a89f95]">Secure access to leads dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1e191a] border border-white/5 p-8 lg:p-10 relative">
          <div className="absolute -top-px left-0 w-24 h-px bg-[#b31b1b]" />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-2 p-3 bg-[#b31b1b]/20 border border-[#b31b1b]/50 text-[#e79a9a] text-sm rounded"
            >
              <AlertCircle size={16} strokeWidth={2} />
              {error}
            </motion.div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-xs uppercase tracking-wider text-[#a89f95] mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent border-b border-white/15 focus:border-[#d4af37] outline-none py-3 text-[#f5ebe1] placeholder-[#a89f95]/60 transition-colors"
                placeholder="admin"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs uppercase tracking-wider text-[#a89f95] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-white/15 focus:border-[#d4af37] outline-none py-3 text-[#f5ebe1] placeholder-[#a89f95]/60 transition-colors pr-12"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#a89f95] hover:text-[#d4af37] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full bg-[#b31b1b] hover:bg-[#8a1515] disabled:opacity-60 disabled:cursor-not-allowed text-[#f5ebe1] font-display uppercase tracking-wider text-lg py-4 transition-all shadow-[0_0_40px_rgba(179,27,27,0.3)] inline-flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Lock size={20} strokeWidth={2} />
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#a89f95]/60">
          Demo: admin / admin123
        </p>
      </div>
    </motion.div>
  );
}