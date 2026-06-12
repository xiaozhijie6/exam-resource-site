import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Eye, EyeOff, BookOpen } from "lucide-react";
import { AnimatedCharacters } from "@/components/ui/AnimatedCharacters";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

interface FormErrors {
  nickname?: string;
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");

  function validate(): boolean {
    const e: FormErrors = {};
    if (!nickname.trim()) {
      e.nickname = "请输入昵称";
    } else if (nickname.trim().length < 2) {
      e.nickname = "昵称至少需要2个字符";
    }
    if (!email.trim()) {
      e.email = "请输入邮箱地址";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "请输入有效的邮箱地址";
    }
    if (!password) {
      e.password = "请输入密码";
    } else if (password.length < 6) {
      e.password = "密码至少需要6个字符";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setIsLoading(true);
    try {
      // TODO: Replace with real API call when backend is ready
      // const res = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) throw new Error((await res.json()).message);
      // const data = await res.json();
      // localStorage.setItem('auth_token', data.token);

      // Simulated login for demo
      await new Promise((r) => setTimeout(r, 800));
      localStorage.setItem("auth_token", "demo-jwt-token");
      localStorage.setItem("auth_user", JSON.stringify({ email, nickname: nickname.trim() }));
      navigate("/");
    } catch (err: any) {
      setServerError(err.message || "登录失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>登录 — Everyone is great</title>
      </Helmet>

      <div className="min-h-screen grid lg:grid-cols-2">
        {/* ====== Left: Animated illustration ====== */}
        <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-academic-600 via-academic-700 to-academic-900 p-12 text-white overflow-hidden">
          {/* Background grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Decorative blurs */}
          <div className="absolute top-1/4 right-1/4 size-64 bg-academic-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 size-96 bg-academic-300/20 rounded-full blur-3xl" />

          {/* Logo */}
          <div className="relative z-20">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                <BookOpen className="h-5 w-5" />
              </div>
              <span>Everyone is great</span>
            </Link>
          </div>

          {/* Animated blob characters */}
          <div className="relative z-20 flex items-end justify-center h-[420px]">
            <AnimatedCharacters
              isTyping={!!nickname || !!email || !!password}
              showPassword={showPassword}
              passwordLength={password.length}
            />
          </div>

          {/* Footer links */}
          <div className="relative z-20 flex items-center gap-8 text-sm text-academic-200/70">
            <Link to="/" className="hover:text-white transition-colors">
              返回首页
            </Link>
            <span className="text-academic-200/40">|</span>
            <span className="text-academic-200/60 text-xs">开启你的备考之旅 ✨</span>
          </div>
        </div>

        {/* ====== Right: Login form ====== */}
        <div className="flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-[420px]">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-12">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-academic-600 to-academic-400">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span>Everyone is great</span>
            </div>

            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
                欢迎回来 👋
              </h1>
              <p className="text-slate-500 text-sm">
                登录你的账号，继续备考之旅
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nickname */}
              <div className="space-y-2">
                <label htmlFor="nickname" className="text-sm font-medium text-slate-700">
                  昵称
                </label>
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="你的昵称"
                  autoComplete="nickname"
                  className={`w-full h-12 px-4 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500/30 transition-all ${
                    errors.nickname ? "border-red-300 focus:ring-red-500/30" : "border-slate-200"
                  }`}
                />
                {errors.nickname && (
                  <p className="text-sm text-red-500">{errors.nickname}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  邮箱
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full h-12 px-4 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500/30 transition-all ${
                    errors.email ? "border-red-300 focus:ring-red-500/30" : "border-slate-200"
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  密码
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={`w-full h-12 px-4 pr-10 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500/30 transition-all ${
                      errors.password ? "border-red-300 focus:ring-red-500/30" : "border-slate-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="size-4 rounded border-slate-300 text-academic-600 focus:ring-academic-500"
                  />
                  <span className="text-sm text-slate-500">记住我30天</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-academic-600 hover:underline font-medium"
                >
                  忘记密码？
                </Link>
              </div>

              {/* Server error */}
              {serverError && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                  {serverError}
                </div>
              )}

              {/* Submit */}
              <InteractiveHoverButton
                type="submit"
                text={isLoading ? "登录中..." : "登录"}
                disabled={isLoading}
                className="h-12 text-base font-medium !rounded-xl"
              />
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-slate-400">或者</span>
              </div>
            </div>

            {/* Quick demo hint */}
            <p className="text-xs text-center text-slate-400 mb-6">
              输入任意邮箱和密码即可体验（演示模式）
            </p>

            {/* Register link */}
            <div className="text-center text-sm text-slate-500">
              还没有账号？{" "}
              <Link
                to="/register"
                className="text-academic-600 font-medium hover:underline"
              >
                立即注册
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
