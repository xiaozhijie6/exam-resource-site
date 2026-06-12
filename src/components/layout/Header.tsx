import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Trophy, Landmark, Phone, User, LogOut, Settings } from 'lucide-react';
import SearchBox from '@/components/common/SearchBox';
import clsx from 'clsx';

const navLinks = [
  { path: '/exam/cet4', label: '英语四级', icon: BookOpen, color: 'hover:text-emerald-600' },
  { path: '/exam/cet6', label: '英语六级', icon: GraduationCap, color: 'hover:text-indigo-600' },
  { path: '/exam/kaoyan', label: '考研', icon: Trophy, color: 'hover:text-violet-600' },
  { path: '/exam/gongkao', label: '考公', icon: Landmark, color: 'hover:text-amber-600' },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string; nickname: string } | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('auth_user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }
  }, [location.pathname]); // re-check on route change

  function handleLogout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
    setShowMenu(false);
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-academic-600 to-academic-400">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="hidden sm:block text-lg font-bold text-slate-900">Everyone is great</span>
          </Link>

          {/* 导航链接 - 桌面端 */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-academic-50 text-academic-700'
                      : `text-slate-600 hover:bg-slate-50 ${link.color}`
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* 搜索框 */}
          <div className="hidden sm:block flex-1 max-w-sm">
            <SearchBox placeholder="搜索真题、方法..." />
          </div>

          {/* 右侧操作区 */}
          <div className="flex items-center gap-2 shrink-0">
            {user ? (
              /* 已登录：用户头像 + 下拉菜单 */
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-academic-100 text-academic-700">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <span className="hidden sm:inline max-w-[80px] truncate text-xs font-medium">
                    {user.nickname}
                  </span>
                </button>
                {showMenu && (
                  <>
                    <div className="fixed inset-0" onClick={() => setShowMenu(false)} />
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-200 shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-900 truncate">{user.nickname}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/contact"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
                      >
                        <Settings className="h-4 w-4" />
                        会员中心
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        退出登录
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* 未登录：登录按钮 */
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-xl border border-academic-300 px-4 py-2 text-sm font-medium text-academic-700 hover:bg-academic-50 transition-colors shrink-0"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">登录</span>
              </Link>
            )}

            {/* 联系按钮 */}
            <Link
              to="/contact"
              className="flex items-center gap-1.5 rounded-xl bg-academic-600 px-4 py-2 text-sm font-medium text-white hover:bg-academic-700 transition-colors shrink-0"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">联系客服</span>
            </Link>
          </div>
        </div>

        {/* 移动端导航 */}
        <nav className="flex lg:hidden items-center gap-0 pb-2 overflow-x-auto scrollbar-thin">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium whitespace-nowrap transition-colors',
                  isActive
                    ? 'bg-academic-50 text-academic-700'
                    : 'text-slate-500 hover:text-slate-700'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* 移动端搜索 */}
        <div className="sm:hidden pb-2">
          <SearchBox placeholder="搜索真题、方法..." />
        </div>
      </div>
    </header>
  );
}
