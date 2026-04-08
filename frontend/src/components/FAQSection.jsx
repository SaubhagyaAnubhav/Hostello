import React, { useState } from 'react';
import {
    ChevronDown,
    MessageSquare,
    Mail,
    Phone,
    Clock,
    ArrowRight,
    Wifi,
    Sparkles
} from 'lucide-react';

const faqData = [
    {
        question: 'What are the check-in and check-out timings?',
        answer:
            'Check-in starts at 2:00 PM, and check-out is by 11:00 AM. Early check-in or late check-out is available only when rooms are free.'
    },
    {
        question: 'Are visitors allowed inside the hostel rooms?',
        answer:
            'Visitors are welcome in the common lounge areas from 10:00 AM to 8:00 PM. For privacy and resident safety, non-residents are not allowed inside rooms or for overnight stays.'
    },
    {
        question: 'Is there a curfew or in-time rule?',
        answer:
            'Yes. The standard in-time is 10:30 PM. Exceptions may be approved by the warden for emergencies or academic requirements.'
    },
    {
        question: 'How does the laundry service work?',
        answer:
            'Laundry pickup is available on designated days, and clothes are usually returned washed and ironed within 48 hours.'
    },
    {
        question: 'What are the meal timings in the cafeteria?',
        answer:
            'Breakfast: 7:30 AM to 9:30 AM, Lunch: 12:30 PM to 2:30 PM, Evening Snacks: 5:00 PM to 6:00 PM, Dinner: 8:00 PM to 10:00 PM.'
    },
    {
        question: 'How often are the rooms cleaned?',
        answer:
            'Rooms are cleaned daily. Bathrooms and bed linen are deep-cleaned and refreshed twice a week.'
    },
    {
        question: 'Is Wi-Fi available across the hostel?',
        answer:
            'Yes. Wi-Fi is available 24/7 in rooms, study areas, and common spaces.'
    }
];

const trustItems = [
    {
        icon: Wifi,
        label: '24/7 Wi-Fi'
    },
    {
        icon: Sparkles,
        label: 'Daily housekeeping'
    },
    {
        icon: Clock,
        label: '2–4 days support'
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleAccordion = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section
            id="contact"
            className="relative border-t border-slate-200/70 bg-slate-50 pt-6 pb-24 md:pt-8"
        >
            
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-120px] top-8 h-72 w-72 rounded-full bg-blue-200/15 blur-3xl" />
                <div className="absolute right-[-120px] top-20 h-80 w-80 rounded-full bg-indigo-200/15 blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.018)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_88%)]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                            <MessageSquare className="h-4 w-4" />
                        </span>
                        FAQ & Support
                    </div>

                    <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-bold tracking-[-0.045em] text-slate-950 md:text-5xl">
                        Student support
                        <span className="block bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
                            and common questions
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
                        Clear answers about rooms, food, timings, facilities, and
                        support for students and parents.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        {trustItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur"
                                >
                                    <Icon className="h-4 w-4 text-blue-600" />
                                    {item.label}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                
                    <div className="space-y-4">
                        {faqData.map((item, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={index}
                                    className={`group overflow-hidden rounded-[28px] border transition-all duration-300 ${
                                        isOpen
                                            ? 'border-blue-200/90 bg-white shadow-[0_24px_70px_-30px_rgba(37,99,235,0.35)]'
                                            : 'border-slate-200/85 bg-white/90 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.22)] hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_22px_45px_-28px_rgba(15,23,42,0.28)]'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleAccordion(index)}
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-answer-${index}`}
                                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-7 md:py-6"
                                    >
                                        <div className="pr-2">
                                            <p
                                                className={`text-[17px] font-semibold leading-7 transition-colors md:text-[19px] ${
                                                    isOpen
                                                        ? 'text-slate-950'
                                                        : 'text-slate-900'
                                                }`}
                                            >
                                                {item.question}
                                            </p>
                                        </div>

                                        <div
                                           className={`flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-2xl border transition-all duration-300 ${
                                                isOpen
                                                    ? 'border-blue-200 bg-blue-50 text-blue-700 shadow-sm'
                                                    : 'border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300 group-hover:bg-slate-100 group-hover:text-slate-700'
                                            }`}
                                        >
                                            <ChevronDown
                                                className={`h-5 w-5 transition-transform duration-300 ${
                                                    isOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </div>
                                    </button>

                                    <div
                                        id={`faq-answer-${index}`}
                                        className={`overflow-hidden transition-all duration-300 ${
                                            isOpen
                                                ? 'max-h-80 opacity-100'
                                                : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <div className="px-6 pb-6 md:px-7 md:pb-7">
                                            <div className="relative mb-5 h-px w-full overflow-hidden rounded-full bg-slate-200/80">
                                                <div className="absolute inset-y-0 left-0 w-44 rounded-full bg-gradient-to-r from-blue-500/40 via-blue-200/70 to-transparent" />
                                            </div>

                                            <p className="max-w-3xl text-[15px] leading-7 text-slate-600 md:text-[15.5px]">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    
                    <aside className="lg:sticky lg:top-28">
                        <div className="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_24px_80px_-34px_rgba(15,23,42,0.28)]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_32%),linear-gradient(to_bottom,rgba(15,23,42,0.02),transparent_38%)]" />

                            <div className="relative border-b border-slate-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-7 py-8 text-white">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                                    Student Support
                                </div>

                                <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em]">
                                    Need direct help?
                                </h3>

                                <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
                                    Reach out for booking help, payments, daily
                                    services, facilities, or move-in questions.
                                </p>
                            </div>

                            <div className="relative bg-gradient-to-b from-slate-50 to-white px-7 py-7">
                                <div className="space-y-4">
                                    <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 shadow-sm">
                                            <Mail className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                Email support
                                            </p>
                                            <a
                                                href="mailto:support@hostello.com"
                                                className="mt-1 inline-block text-sm text-slate-600 transition hover:text-slate-900"
                                            >
                                                support@hostello.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 shadow-sm">
                                            <Phone className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                Phone
                                            </p>
                                            <a
                                                href="tel:+919876543210"
                                                className="mt-1 inline-block text-sm text-slate-600 transition hover:text-slate-900"
                                            >
                                                +91 98765 43210
                                            </a>
                                        </div>
                                    </div>

                                    <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 shadow-sm">
                                            <Clock className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                Response time
                                            </p>
                                            <p className="mt-1 text-sm text-slate-600">
                                                Usually within 2–4 hours
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-7 grid gap-3">
                                    <a
                                        href="mailto:support@hostello.com"
                                        className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-900 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_34px_-14px_rgba(15,23,42,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-16px_rgba(15,23,42,0.55)]"
                                    >
                                        Contact Support
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                    </a>

                                    <a
                                        href="tel:+919876543210"
                                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                    >
                                        Call Help Desk
                                    </a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;