import React, { useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import api from "./Api";
import { useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [confirmpassword, setconfirmpassword] = useState("");
  const [name, setname] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const nav = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/";

  const passwordsMatch =
    mode === "signup" && confirmpassword.length > 0 && password === confirmpassword;
  const passwordTooShort =
    mode === "signup" && password.length > 0 && password.length < 6;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) nav(redirectTo);
  }, [nav, redirectTo]);

  useEffect(() => {
    const msg = sessionStorage.getItem("authMessage");
    if (msg) {
      setSuccessMsg(msg);
      sessionStorage.removeItem("authMessage");
      const timer = setTimeout(() => setSuccessMsg(""), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/user/loginn", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user.id);
      if (res.data.user.role === "admin") {
        nav("/adminhome");
      } else {
        localStorage.setItem("scrollSection", redirectTo);
        nav("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const Signup = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert("Please accept the Terms & Conditions");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/user/signup", {
        name, email, password, confirmpassword,
      });
      localStorage.setItem("token", res.data.token);
      nav(redirectTo);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const ForgotPass = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/user/forgot-password", { email });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  // ===== Custom-styled Google login (bypasses default GSI/FedCM embed) =====
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setGoogleLoading(true);
      try {
        // useGoogleLogin (implicit flow) returns an access_token, not an id_token.
        // Fetch the user's profile with it, then hand off to your existing backend route.
        const profileRes = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        const profile = await profileRes.json();

        const res = await api.post("/user/google-login", {
          token: tokenResponse.access_token,
          profile, // name, email, picture — in case backend wants to skip re-verifying
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("role", res.data.user.role);
        nav("/");
      } catch (err) {
        console.log(err);
        alert("Google sign-in failed");
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      console.log("Google Login Failed");
      alert("Google sign-in failed");
    },
  });

  const handler =
    mode === "login" ? login : mode === "signup" ? Signup : ForgotPass;

  const copy = {
    login: { title: "Sign in to StudioBits", sub: "Welcome back — enter your details to continue." },
    signup: { title: "Create your account", sub: "Start building with StudioBits in minutes." },
    forgot: { title: "Reset your password", sub: "We'll email you a link to get back in." },
  }[mode];

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

          {successMsg && (
            <p className="mb-5 flex items-center justify-center gap-1.5 rounded-lg border border-green-500/30 bg-green-500/10 px-3.5 py-2.5 text-sm text-green-400">
              <CheckCircle2 size={15} />
              {successMsg}
            </p>
          )}

          <h1 className="text-2xl font-semibold text-white text-center">
            {copy.title}
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2 mb-8">
            {copy.sub}
          </p>

          {mode === "login" && (
            <>
              <button
                type="button"
                onClick={() => googleLogin()}
                disabled={googleLoading}
                className="mb-5 flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#141414] py-2.5 text-sm font-medium text-white transition hover:bg-[#1a1a1a] disabled:opacity-60"
              >
                {googleLoading ? (
                  "Signing in…"
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.09-1.8 2.73v2.27h2.91c1.7-1.57 2.69-3.88 2.69-6.64z"/>
                      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.27c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.34C2.44 15.98 5.48 18 9 18z"/>
                      <path fill="#FBBC05" d="M3.96 10.71A5.4 5.4 0 010 9c0-.6.1-1.18.29-1.71V4.95H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.05l3-2.34z"/>
                      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0 5.48 0 2.44 2.02.96 4.95l3 2.34C4.67 5.16 6.66 3.58 9 3.58z"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[11px] uppercase tracking-widest text-gray-600">
                  or continue with email
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
            </>
          )}

          <form onSubmit={handler} className="flex flex-col gap-3.5">

            {mode === "signup" && (
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Full name</label>
                <input
                  type="text" value={name} onChange={(e) => setname(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#d4af37]/60 transition"
                />
              </div>
            )}

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Email</label>
              <input
                type="email" value={email} onChange={(e) => setemail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-[#141414] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#d4af37]/60 transition"
              />
            </div>

            {mode !== "forgot" && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-gray-400">Password</label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-xs text-[#d4af37] cursor-pointer hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password} onChange={(e) => setpassword(e.target.value)}
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-white outline-none focus:border-[#d4af37]/60 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
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
            )}

            {mode === "signup" && (
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Confirm password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-white outline-none focus:border-[#d4af37]/60 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
            )}
            {mode === "signup" && (
              <div className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1"
                />

                <label htmlFor="terms" className="text-gray-400">
                  I agree to the{" "}
                  <a href="/terms-and-conditions" className="text-[#d4af37] hover:underline">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="text-[#d4af37] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || (mode === "signup" && !acceptTerms)}
              className="mt-2 flex items-center justify-center gap-2 bg-[#d4af37] text-black text-sm font-semibold py-2.5 rounded-lg hover:brightness-110 disabled:opacity-60 transition-all duration-200"
            >
              {loading
                ? "Please wait…"
                : mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
              {!loading && <ArrowRight size={15} />}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {mode === "login" && (
              <>Don't have an account?{" "}
                <span onClick={() => setMode("signup")} className="text-[#d4af37] cursor-pointer hover:underline">
                  Sign up
                </span>
              </>
            )}
            {mode === "signup" && (
              <>Already have an account?{" "}
                <span onClick={() => setMode("login")} className="text-[#d4af37] cursor-pointer hover:underline">
                  Sign in
                </span>
              </>
            )}
            {mode === "forgot" && (
              <>Remembered it?{" "}
                <span onClick={() => setMode("login")} className="text-[#d4af37] cursor-pointer hover:underline">
                  Back to sign in
                </span>
              </>
            )}
          </p>

        </div>
      </div>

      <p className="text-center text-[11px] text-gray-700 pb-6">
        © 2026 StudioBits. All rights reserved.
      </p>
    </section>
  );
}

export default Login;