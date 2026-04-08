import React from 'react';
import {
  Coffee,
  Utensils,
  Sparkles,
  Shirt,
  Wifi,
  Shield,
  Activity,
  Smartphone,
} from 'lucide-react';

const facilities = [
  {
    icon: <Utensils className="h-6 w-6" strokeWidth={1.8} />,
    title: 'Nutritious Daily Meals',
    description:
      'Fresh, hygienic meals served daily to support healthy and comfortable student living.',
  },
  {
    icon: <Coffee className="h-6 w-6" strokeWidth={1.8} />,
    title: 'Late-Night Meal Access',
    description:
      'Evening snacks and late-night meal options available for added convenience.',
  },
  {
    icon: <Wifi className="h-6 w-6" strokeWidth={1.8} />,
    title: 'High-Speed Wi-Fi',
    description:
      'Reliable internet access for studying, streaming, and everyday digital needs.',
  },
  {
    icon: <Sparkles className="h-6 w-6" strokeWidth={1.8} />,
    title: 'Housekeeping',
    description:
      'Clean, well-maintained living spaces managed to support a better hostel experience.',
  },
  {
    icon: <Shirt className="h-6 w-6" strokeWidth={1.8} />,
    title: 'Laundry Support',
    description:
      'Convenient laundry services that simplify hostel routines and save student time.',
  },
  {
    icon: <Shield className="h-6 w-6" strokeWidth={1.8} />,
    title: '24/7 Security',
    description:
      'CCTV-monitored premises and secure access designed for safe student accommodation.',
  },
  {
    icon: <Activity className="h-6 w-6" strokeWidth={1.8} />,
    title: 'Recreation Spaces',
    description:
      'Shared spaces designed for relaxation, refreshment, and balanced daily living.',
  },
  {
    icon: <Smartphone className="h-6 w-6" strokeWidth={1.8} />,
    title: 'Student Convenience',
    description:
      'Important updates and essential hostel services accessible through the student dashboard.',
  },
];

const FacilitiesSection = () => {
  return (
   <section className="bg-slate-50 pt-10 pb-24" id="facilities">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center lg:mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Hostel Facilities
            </span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Facilities Designed for Better Student Living
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            From daily meals and high-speed Wi-Fi to security and housekeeping,
            Hostello is built to support comfortable, organized, and student-first living.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {facilities.map((facility, index) => (
            <FeatureCard
              key={index}
              icon={facility.icon}
              title={facility.title}
              description={facility.description}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Amenities may vary depending on hostel allocation and selected stay package.
        </p>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
        {icon}
      </div>

      <h3 className="text-lg font-semibold tracking-tight text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
};

export default FacilitiesSection;