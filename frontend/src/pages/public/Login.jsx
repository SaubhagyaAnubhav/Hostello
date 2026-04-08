import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Bell,
  ArrowRight,
  Building2,
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/student/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await login(email.trim(), password);

      if (userData.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 pt-8 pb-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-[-120px] top-[-80px] h-80 w-80 rounded-full bg-blue-200/35 blur-3xl opacity-60" />
        <div className="absolute right-[-100px] top-20 h-96 w-96 rounded-full bg-indigo-200/25 blur-3xl opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      
        <div className="mb-12 flex items-center justify-between sm:mb-16">
          <Link
            to="/"
            className="text-3xl font-black tracking-[-0.07em] text-blue-600 transition hover:text-blue-700"
          >
            Hostello
          </Link>

          <div className="flex items-center gap-4 sm:gap-4">
            <Link
              to="/"
              className="hidden sm:inline-flex text-sm font-medium text-slate-500 transition hover:text-slate-900"
              >

               Back to Home
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              Sign up
            </Link>
          </div>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 xl:gap-20">
      
          <div className="hidden lg:flex lg:flex-col lg:pt-6">
            <div className="max-w-[560px]">
              <div className="inline-flex items-center rounded-full border border-blue-200/60 bg-blue-50/60 px-3 py-1 text-xs font-semibold text-blue-700 shadow-[0_2px_10px_rgba(37,99,235,0.04)] backdrop-blur-sm">
                <Building2 className="mr-2 h-4 w-4" />
                Welcome back
              </div>

              <h1 className="mt-6 text-[44px] font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl">
                Access your student dashboard.
              </h1>

              <p className="mt-5 max-w-[500px] text-lg leading-8 text-slate-600">
                Sign in to manage room details, hostel notices, meal updates, and support
                requests from one place.
              </p>

              <div className="mt-10 rounded-[28px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Secure student access</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Built for fast and trusted hostel sign-in
                    </p>
                  </div>

                  <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    College email
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Protected account access</p>
                      <p className="mt-1 text-[13px] leading-6 text-slate-500">
                        Only registered users can access their hostel dashboard and account data.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Stay updated daily</p>
                      <p className="mt-1 text-[13px] leading-6 text-slate-500">
                        Check important notices, meal updates, and hostel activity without missing anything.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="mx-auto w-full max-w-xl lg:max-w-[520px]">
            <div className="rounded-[32px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-8 lg:p-10">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.20em] text-blue-600">
                  Secure login
                </p>

                <h2 className="mt-3 text-[28px] font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Welcome back
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Sign in with your email to access your hostel dashboard.
                </p>
              </div>

              {error && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-[13px] font-medium text-red-700 shadow-sm">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  {error}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="mb-2 block text-[13px] font-semibold text-slate-700">
                    College email
                  </label>

                  <div className="group relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@adypu.edu.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-[15px] text-slate-900 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-[13px] font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="group relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-12 text-[15px] text-slate-900 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-50"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={loading}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 focus:text-blue-500 focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <label className="group flex cursor-pointer items-center gap-2">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      disabled={loading}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 transition-colors focus:ring-blue-500"
                    />
                    <span className="text-[13px] font-medium text-slate-600 transition-colors group-hover:text-slate-900">
                      Remember me
                    </span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-[13px] font-semibold text-blue-600 transition hover:text-blue-700 focus:underline focus:outline-none"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="group h-14 w-full rounded-2xl bg-blue-600 text-[15px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.40)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_24px_-8px_rgba(37,99,235,0.50)] disabled:shadow-none disabled:hover:translate-y-0"
                  >
                    <span className="inline-flex items-center gap-2">
                      {loading ? 'Processing...' : 'Sign in to dashboard'}
                      {!loading && (
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      )}
                    </span>
                  </Button>
                </div>
              </form>

              <div className="mt-7 text-center text-[13px] text-slate-500">
                <span>Don&apos;t have an account? </span>
                <Link
                  to="/signup"
                  className="font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;