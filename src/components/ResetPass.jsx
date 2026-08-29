import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./Api";
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";

function ResetPass() {
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useParams();
  const nav = useNavigate();

  const passwordsMatch = confirmpassword.length > 0 && password === confirmpassword;
  const passwordTooShort = password.length > 0 && password.length < 6;

  const ResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(`/user/reset-password/${token}`, { password });
      alert(res.data.message);
      nav("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] flex flex-col">

      <div className="px-6 sm:px-10 py-6">
        <img
          src="/studiobits.png"
          alt="StudioBits Technology"
          className="h-20 sm:h-16 md:h-20 w-auto object-contain"
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-[400px]">

          <h1 className="text-2xl font-semibold text-white text-center">
            Reset your password
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2 mb-8">
            Enter your new password below.
          </p>

          <form onSubmit={ResetPassword} className="flex flex-col gap-3.5">

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">New password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-white outline-none focus:border-[#d4af37]/60 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordTooShort && (
                <p className="mt-1.5 text-xs text-amber-400">
                  Use at least 6 characters
                </p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Confirm new password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-white outline-none focus:border-[#d4af37]/60 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordsMatch && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-green-400">
                  <CheckCircle2 size={13} /> Passwords match
                </p>
              )}
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex items-center justify-center gap-2 bg-[#d4af37] text-black text-sm font-semibold py-2.5 rounded-lg hover:brightness-110 disabled:opacity-60 transition-all duration-200"
            >
              {loading ? "Resetting…" : "Reset password"}
              {!loading && <ArrowRight size={15} />}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Remembered it?{" "}
            <span onClick={() => nav("/login")} className="text-[#d4af37] cursor-pointer hover:underline">
              Back to sign in
            </span>
          </p>

        </div>
      </div>

      <p className="text-center text-[11px] text-gray-700 pb-6">
        © 2026 StudioBits. All rights reserved.
      </p>
    </section>
  );
}

export default ResetPass;