import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Bell,
  Utensils,
  Wrench,
  ChevronRight,
  Home,
  Phone,
} from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roomNumber: '',
    mobileNumber: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) => {
    return email.trim().toLowerCase().endsWith('@adypu.edu.in');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      if (!formData.name.trim()) {
        setError('Please enter your full name.');
        return;
      }

      if (!validateEmail(formData.email)) {
        setError('Please use your college email address (@adypu.edu.in).');
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }

      setStep(2);
      return;
    }

    if (!formData.roomNumber.trim()) {
      setError('Please enter your room number.');
      return;
    }

    if (!formData.mobileNumber.trim()) {
      setError('Please enter your mobile number.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        profile: {
          roomNumber: formData.roomNumber.trim(),
          phone: formData.mobileNumber.trim(),},
      };

      await register(payload);
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-slate-50 pt-6 pb-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-[-120px] top-[-80px] h-80 w-80 rounded-full bg-blue-200/40 blur-3xl opacity-60" />
        <div className="absolute right-[-100px] top-20 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl opacity-60" />
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

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="hidden sm:inline-flex text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              Back to home
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              Log in
            </Link>
          </div>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-20">
          <div className="hidden lg:flex flex-col pt-4">
            <div className="max-w-[560px]">
              <div className="inline-flex items-center rounded-full border border-blue-200/60 bg-blue-50/50 px-3 py-1 text-xs font-semibold text-blue-700 shadow-[0_2px_10px_rgba(37,99,235,0.04)] backdrop-blur-sm">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Secure student onboarding
              </div>

              <h1 className="mt-6 text-[44px] font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl">
                Join your hostel community today.
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Hostello helps students manage room details, meals, notices, complaints,
                and hostel updates through one clean dashboard.
              </p>

              <div className="mt-10 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/60 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/80 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Student Dashboard</p>
                      <p className="text-[11px] font-medium text-emerald-600">Active Session</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 p-3">
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_2px_10px_rgba(15,23,42,0.03)] transition hover:border-blue-100">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                      <Utensils className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">Today&apos;s menu: Updated</p>
                      <p className="mt-0.5 text-xs text-slate-500">Dinner includes special dessert tonight.</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300" />
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_2px_10px_rgba(15,23,42,0.03)] transition hover:border-blue-100">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">New hostel notice</p>
                      <p className="mt-0.5 text-xs text-slate-500">Water supply maintenance scheduled.</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300" />
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_2px_10px_rgba(15,23,42,0.03)] transition hover:border-blue-100">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">Maintenance Request</p>
                      <span className="mt-1 inline-block rounded-md border border-amber-200/50 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                        In Progress
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300" />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">College email verification required</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Hostello ensures that only verified students from the official college domain can join.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl lg:max-w-[500px]">
            <div className="rounded-[32px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-8">
              <div className="mb-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Step {step} of 2
                </p>

                <h2 className="text-[28px] font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {step === 1 ? 'Create your account' : 'Complete your profile'}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step === 1
                    ? 'Use your college email to access your hostel dashboard.'
                    : 'Add your room and contact details to finish signup.'}
                </p>
              </div>

              {error && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-[13px] font-medium text-red-700 shadow-sm">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {step === 1 ? (
                  <>
                    <div>
                      <label htmlFor="name" className="mb-2 block text-[13px] font-semibold text-slate-700">
                        Full name
                      </label>
                      <div className="group relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={loading}
                          className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-[15px] text-slate-900 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-50"
                        />
                      </div>
                    </div>

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
                          value={formData.email}
                          onChange={handleChange}
                          disabled={loading}
                          className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-[15px] text-slate-900 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-50"
                        />
                      </div>
                      <p className="mt-2 pl-2 text-xs leading-5 text-slate-500">
                        Use your college email address
                      </p>
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
                          autoComplete="new-password"
                          required
                          placeholder="Create a secure password"
                          value={formData.password}
                          onChange={handleChange}
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
                      <p className="mt-2 pl-2 text-xs leading-5 text-slate-500">
                        Minimum 6 characters
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="roomNumber" className="mb-2 block text-[13px] font-semibold text-slate-700">
                        Room number
                      </label>
                      <div className="group relative">
                        <Home className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                        <input
                          id="roomNumber"
                          name="roomNumber"
                          type="text"
                          placeholder="Enter your room number"
                          value={formData.roomNumber}
                          onChange={handleChange}
                          disabled={loading}
                          className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-[15px] text-slate-900 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="mobileNumber" className="mb-2 block text-[13px] font-semibold text-slate-700">
                        Mobile number
                      </label>
                      <div className="group relative">
                        <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                        <input
                          id="mobileNumber"
                          name="mobileNumber"
                          type="tel"
                          placeholder="Enter your mobile number"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          disabled={loading}
                          className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-[15px] text-slate-900 shadow-[0_2px_10px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setError('');
                        setStep(1);
                      }}
                      disabled={loading}
                      className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                      Back
                    </button>
                  </>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="group h-14 w-full rounded-2xl bg-blue-600 text-[15px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.40)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_12px_24px_-8px_rgba(37,99,235,0.50)] disabled:shadow-none disabled:hover:translate-y-0"
                  >
                    <span className="inline-flex items-center gap-2">
                      {loading ? 'Processing...' : step === 1 ? 'Continue' : 'Create account'}
                      {!loading && (
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      )}
                    </span>
                  </Button>
                </div>
              </form>

              <div className="mt-8 text-center text-[13px] text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-blue-600 transition hover:text-blue-700">
                  Log in
                </Link>
              </div>
            </div>

            <p className="mt-8 text-center text-xs font-medium leading-6 text-slate-400">
              By continuing, you agree to Hostello&apos;s{' '}
              <a
                href="#"
                className="underline decoration-slate-300 underline-offset-2 hover:text-slate-600"
              >
                Terms
              </a>{' '}
              and{' '}
              <a
                href="#"
                className="underline decoration-slate-300 underline-offset-2 hover:text-slate-600"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;