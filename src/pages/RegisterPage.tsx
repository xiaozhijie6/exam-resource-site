import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Eye, EyeOff, BookOpen } from "lucide-react";
import { AnimatedCharacters } from "@/components/ui/AnimatedCharacters";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { examModules } from "@/data/exams";

interface FormErrors {
  nickname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agree?: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [targetExam, setTargetExam] = useState("");
  const [targetScore, setTargetScore] = useState("");
  const [examDate, setExamDate] = useState("");
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");

  function validate(): boolean {
    const e: FormErrors = {};
    if (!nickname.trim() || nickname.trim().length < 2) {
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
    if (password !== confirmPassword) {
      e.confirmPassword = "两次输入的密码不一致";
    }
    if (!agree) {
      e.agree = "请阅读并同意服务条款";
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
      // const res = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ nickname, email, password, targetExam, targetScore, examDate }),
      // });
      // if (!res.ok) throw new Error((await res.json()).message);
      // const data = await res.json();
      // localStorage.setItem('auth_token', data.token);

      // Simulated registration for demo
      await new Promise((r) => setTimeout(r, 800));
      localStorage.setItem("auth_token", "demo-jwt-token");
      localStorage.setItem(
        "auth_user",
        JSON.stringify({
          email,
          nickname,
          targetExam,
          targetScore: targetScore ? Number(targetScore) : null,
          examDate: examDate || null,
        })
      );
      navigate("/");
    } catch (err: any) {
      setServerError(err.message || "注册失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>注册 — Everyone is great</title>
      </Helmet>

      <div className="min-h-screen grid lg:grid-cols-2">
        {/* ====== Left: Animated illustration ====== */}
        <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-academic-600 via-academic-700 to-academic-900 p-12 text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="absolute top-1/4 right-1/4 size-64 bg-academic-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 size-96 bg-academic-300/20 rounded-full blur-3xl" />

          <div className="relative z-20">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                <BookOpen className="h-5 w-5" />
              </div>
              <span>Everyone is great</span>
            </Link>
          </div>

          <div className="relative z-20 flex items-end justify-center h-[420px]">
            <AnimatedCharacters
              isTyping={!!email || !!password}
              showPassword={showPassword}
              passwordLength={password.length}
            />
          </div>

          <div className="relative z-20 flex items-center gap-8 text-sm text-academic-200/70">
            <Link to="/" className="hover:text-white transition-colors">
              返回首页
            </Link>
            <span className="text-academic-200/40">|</span>
            <span className="text-academic-200/60 text-xs">
              加入万千备考学子的队伍 💪
            </span>
          </div>
        </div>

        {/* ====== Right: Register form ====== */}
        <div className="flex items-center justify-center p-8 bg-white overflow-y-auto">
          <div className="w-full max-w-[440px] py-8">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-10">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-academic-600 to-academic-400">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span>Everyone is great</span>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
                创建账号 🎓
              </h1>
              <p className="text-slate-500 text-sm">
                加入我们，开启高效备考之旅
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nickname */}
              <div className="space-y-1.5">
                <label htmlFor="nickname" className="text-sm font-medium text-slate-700">
                  昵称
                </label>
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="你的昵称"
                  autoComplete="name"
                  className={`w-full h-11 px-4 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500/30 transition-all ${
                    errors.nickname ? "border-red-300" : "border-slate-200"
                  }`}
                />
                {errors.nickname && <p className="text-sm text-red-500">{errors.nickname}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
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
                  className={`w-full h-11 px-4 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500/30 transition-all ${
                    errors.email ? "border-red-300" : "border-slate-200"
                  }`}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  密码
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="至少6个字符"
                    autoComplete="new-password"
                    className={`w-full h-11 px-4 pr-10 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500/30 transition-all ${
                      errors.password ? "border-red-300" : "border-slate-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                  确认密码
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次输入密码"
                  autoComplete="new-password"
                  className={`w-full h-11 px-4 rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500/30 transition-all ${
                    errors.confirmPassword ? "border-red-300" : "border-slate-200"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Target exam */}
              <div className="space-y-1.5">
                <label htmlFor="targetExam" className="text-sm font-medium text-slate-700">
                  目标考试 <span className="text-slate-400 font-normal">（选填）</span>
                </label>
                <select
                  id="targetExam"
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-academic-500/30 transition-all"
                >
                  <option value="">请选择考试</option>
                  {examModules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Target score + exam date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label htmlFor="targetScore" className="text-sm font-medium text-slate-700">
                    目标分数 <span className="text-slate-400 font-normal">（选填）</span>
                  </label>
                  <input
                    id="targetScore"
                    type="number"
                    value={targetScore}
                    onChange={(e) => setTargetScore(e.target.value)}
                    placeholder="如：600"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500/30 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="examDate" className="text-sm font-medium text-slate-700">
                    考试日期 <span className="text-slate-400 font-normal">（选填）</span>
                  </label>
                  <input
                    id="examDate"
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-academic-500/30 transition-all"
                  />
                </div>
              </div>

              {/* Agreement */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 size-4 rounded border-slate-300 text-academic-600 focus:ring-academic-500 shrink-0"
                />
                <span className="text-sm text-slate-500">
                  我已阅读并同意{" "}
                  <Link to="/terms" className="text-academic-600 underline">
                    服务条款
                  </Link>{" "}
                  和{" "}
                  <Link to="/privacy-policy" className="text-academic-600 underline">
                    隐私政策
                  </Link>
                </span>
              </label>
              {errors.agree && <p className="text-sm text-red-500">{errors.agree}</p>}

              {/* Server error */}
              {serverError && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                  {serverError}
                </div>
              )}

              {/* Submit */}
              <InteractiveHoverButton
                type="submit"
                text={isLoading ? "注册中..." : "创建账号"}
                disabled={isLoading}
                className="h-12 text-base font-medium !rounded-xl"
              />
            </form>

            {/* Login link */}
            <div className="text-center text-sm text-slate-500 mt-6">
              已有账号？{" "}
              <Link
                to="/login"
                className="text-academic-600 font-medium hover:underline"
              >
                立即登录
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
