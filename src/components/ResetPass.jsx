import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from './Api';
import { FaEye, FaEyeSlash, FaLock, FaCheckCircle } from 'react-icons/fa';

function ResetPass() {
  const [password, setpassword] = useState("")
  const [confirmpassword, setconfirmpassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useParams()
  const nav = useNavigate()

  const passwordsMatch = confirmpassword.length > 0 && password === confirmpassword;
  const passwordTooShort = password.length > 0 && password.length < 6;

  const ResetPassword = async (e) => {
    e.preventDefault()
    setError("")

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (password !== confirmpassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const res = await api.post(`/user/reset-password/${token}`, { password })
      alert(res.data.message)
      nav('/login')
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired link")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black px-4 py-10 sm:px-6">

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">

        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F8B400]/15 sm:h-14 sm:w-14">
          <FaLock className="text-xl text-[#F8B400] sm:text-2xl" />
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-2 sm:text-4xl sm:mb-3">
          Reset Password
        </h2>

        <p className="text-center text-sm text-white/70 mb-6 sm:text-base sm:mb-8">
          Enter your new password below
        </p>

        <form onSubmit={ResetPassword} className="space-y-4">

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-3.5 pr-12 text-base text-white placeholder:text-white/50 outline-none focus:border-[#F8B400]/60 focus:ring-2 focus:ring-[#F8B400]/30 transition sm:py-4"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordTooShort && (
              <p className="mt-1.5 text-xs text-amber-400">
                Use at least 6 characters
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-3.5 pr-12 text-base text-white placeholder:text-white/50 outline-none focus:border-[#F8B400]/60 focus:ring-2 focus:ring-[#F8B400]/30 transition sm:py-4"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordsMatch && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-green-400">
                <FaCheckCircle /> Passwords match
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
            className="w-full bg-[#F8B400] text-black py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 sm:py-4"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

      </div>

    </section>
  )
}

export default ResetPass
