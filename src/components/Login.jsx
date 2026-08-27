import React, { useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import api from "./Api";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [confirmpassword, setconfirmpassword] = useState("");
  const [name, setname] = useState("");

  const nav = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) nav(redirectTo);
  }, [nav, redirectTo]);

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

          <h1 className="text-2xl font-semibold text-white text-center">
            {copy.title}
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2 mb-8">
            {copy.sub}
          </p>

          {mode === "login" && (
            <>
<div className="[&>div]:!w-full [&_iframe]:!w-full mb-5">
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        const res = await api.post("/user/google-login", {
          token: credentialResponse.credential,
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("role", res.data.user.role);
        nav("/");
      } catch (err) {
        console.log(err);
      }
    }}
    onError={() => console.log("Google Login Failed")}
  />
</div>

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
              <>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Full name</label>
                  <input
                    type="text" value={name} onChange={(e) => setname(e.target.value)}
                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#d4af37]/60 transition"
                  />
                </div>

              </>
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
                      className="text-xs text-gray-500 hover:text-[#d4af37] transition"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password} onChange={(e) => setpassword(e.target.value)}
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
              </div>
            )}

            {mode === "signup" && (
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Confirm password</label>
                <input
                  type="password" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#d4af37]/60 transition"
                />
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
      <a href="/t&c" className="text-[#d4af37] hover:underline">
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
