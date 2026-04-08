import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    User,
    Mail,
    Phone,
    Home,
    ShieldCheck,
    CheckCircle2,
    PencilLine,
    LifeBuoy,
    Building2,
    CalendarDays,
    BadgeCheck,
    GraduationCap,
    Users,
    MapPin,
    Save,
    X,
} from 'lucide-react';

function InputField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    icon: Icon,
    iconBg,
    iconColor,
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-slate-500">{label}</p>
                </div>
                <div className={`rounded-xl p-3 ${iconBg}`}>
                    <Icon size={20} className={iconColor} />
                </div>
            </div>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-secondary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
        </div>
    );
}

const Profile = () => {
    const { user,updateProfile } = useAuth();
    
    const getInitialFormData = () => ({
        name: user?.name || '',
        email: user?.email || '',
        mobileNumber: user?.profile?.mobileNumber || user?.profile?.phone || '',
        roomNumber: user?.profile?.roomNumber || '',
        hostelName: user?.profile?.hostelName || 'Hostello Residence',
        joinedDate: user?.profile?.joinedDate || '',
        course: user?.profile?.course || '',
        year: user?.profile?.year || '',
        guardianName: user?.profile?.guardianName || '',
        guardianPhone: user?.profile?.guardianPhone || '',
        address: user?.profile?.address || '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [savedProfile, setSavedProfile] = useState(getInitialFormData());
    const [formData, setFormData] = useState(getInitialFormData());

    useEffect(() => {
        const freshData = getInitialFormData();
        setSavedProfile(freshData);
        setFormData(freshData);
    }, [user]);

    const firstName = formData.name?.split(' ')[0] || 'Student';

    const initials =
        formData.name
            ?.split(' ')
            .map((part) => part[0])
            .slice(0, 2)
            .join('')
            .toUpperCase() || 'ST';

    const completionFields = [
        formData.name,
        formData.email,
        formData.mobileNumber,
        formData.roomNumber,
        formData.hostelName,
        formData.joinedDate,
        formData.course,
        formData.year,
        formData.guardianName,
        formData.guardianPhone,
        formData.address,
    ];

    const completion = Math.round(
        (completionFields.filter((field) => String(field).trim() !== '').length / completionFields.length) * 100
    );

    const verificationStatus =
        user?.profile?.isVerified || user?.isVerified ? 'Verified Student' : 'Profile Active';

    const heroStats = [
        {
            label: 'Hostel',
            value: formData.hostelName || 'Not Added',
            icon: Building2,
            iconColor: 'text-sky-600',
            iconBg: 'bg-sky-50',
        },
        {
            label: 'Joined',
            value: formData.joinedDate || 'Not Added',
            icon: CalendarDays,
            iconColor: 'text-violet-600',
            iconBg: 'bg-violet-50',
        },
        {
            label: 'Verification',
            value: verificationStatus,
            icon: BadgeCheck,
            iconColor: 'text-emerald-600',
            iconBg: 'bg-emerald-50',
        },
    ];

    const checklist = [
        { label: 'Name added', done: Boolean(formData.name) },
        { label: 'Email added', done: Boolean(formData.email) },
        { label: 'Phone number added', done: Boolean(formData.mobileNumber) },
        { label: 'Room assigned', done: Boolean(formData.roomNumber) },
        { label: 'Hostel name added', done: Boolean(formData.hostelName) },
        { label: 'Joined date added', done: Boolean(formData.joinedDate) },
        { label: 'Course added', done: Boolean(formData.course) },
        { label: 'Year added', done: Boolean(formData.year) },
        { label: 'Guardian name added', done: Boolean(formData.guardianName) },
        { label: 'Guardian phone added', done: Boolean(formData.guardianPhone) },
        { label: 'Address added', done: Boolean(formData.address) },
    ];

    const infoCards = useMemo(
        () => [
            {
                label: 'Full Name',
                value: formData.name || 'Not Added',
                key: 'name',
                icon: User,
                iconBg: 'bg-blue-50',
                iconColor: 'text-blue-600',
                type: 'text',
            },
            {
                label: 'Email Address',
                value: formData.email || 'Not Added',
                key: 'email',
                icon: Mail,
                iconBg: 'bg-violet-50',
                iconColor: 'text-violet-600',
                type: 'email',
            },
            {
                label: 'Mobile Number',
                value: formData.mobileNumber || 'Not Added',
                key: 'mobileNumber',
                icon: Phone,
                iconBg: 'bg-emerald-50',
                iconColor: 'text-emerald-600',
                type: 'tel',
            },
            {
                label: 'Room Number',
                value: formData.roomNumber || 'Not Added',
                key: 'roomNumber',
                icon: Home,
                iconBg: 'bg-amber-50',
                iconColor: 'text-amber-600',
                type: 'text',
            },
            {
                label: 'Hostel Name',
                value: formData.hostelName || 'Not Added',
                key: 'hostelName',
                icon: Building2,
                iconBg: 'bg-sky-50',
                iconColor: 'text-sky-600',
                type: 'text',
            },
            {
                label: 'Joined Date',
                value: formData.joinedDate || 'Not Added',
                key: 'joinedDate',
                icon: CalendarDays,
                iconBg: 'bg-purple-50',
                iconColor: 'text-purple-600',
                type: 'date',
            },
            {
                label: 'Course',
                value: formData.course || 'Not Added',
                key: 'course',
                icon: GraduationCap,
                iconBg: 'bg-indigo-50',
                iconColor: 'text-indigo-600',
                type: 'text',
            },
            {
                label: 'Year',
                value: formData.year || 'Not Added',
                key: 'year',
                icon: GraduationCap,
                iconBg: 'bg-pink-50',
                iconColor: 'text-pink-600',
                type: 'text',
            },
            {
                label: 'Guardian Name',
                value: formData.guardianName || 'Not Added',
                key: 'guardianName',
                icon: Users,
                iconBg: 'bg-cyan-50',
                iconColor: 'text-cyan-600',
                type: 'text',
            },
            {
                label: 'Guardian Phone',
                value: formData.guardianPhone || 'Not Added',
                key: 'guardianPhone',
                icon: Phone,
                iconBg: 'bg-lime-50',
                iconColor: 'text-lime-600',
                type: 'tel',
            },
        ],
        [formData]
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditToggle = () => {
        setFormData(savedProfile);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData(savedProfile);
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                profile: {
                    mobileNumber: formData.mobileNumber,
                    roomNumber: formData.roomNumber,
                    hostelName: formData.hostelName,
                    joinedDate: formData.joinedDate,
                    course: formData.course,
                    year: formData.year,
                    guardianName: formData.guardianName,
                    guardianPhone: formData.guardianPhone,
                    address: formData.address,
               },
            };

        const updatedUser = await updateProfile(payload);

        const updatedFormData = {
            name: updatedUser.name || '',
            email: updatedUser.email || '',
            mobileNumber: updatedUser.profile?.mobileNumber || '',
            roomNumber: updatedUser.profile?.roomNumber || '',
            hostelName: updatedUser.profile?.hostelName || '',
            joinedDate: updatedUser.profile?.joinedDate || '',
            course: updatedUser.profile?.course || '',
            year: updatedUser.profile?.year || '',
            guardianName: updatedUser.profile?.guardianName || '',
            guardianPhone: updatedUser.profile?.guardianPhone || '',
            address: updatedUser.profile?.address || '',
        };

        setSavedProfile(updatedFormData);
        setFormData(updatedFormData);
        setIsEditing(false);
    }catch (error) {
    console.error('Failed to save profile:', error);
    console.error('Server response:', error.response?.data);
    alert(error.response?.data?.message || 'Profile update failed');
}
    };

    return (
        <div className="space-y-8">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] md:p-8">
                <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-primary">Student Profile</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
                            My Profile
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                            Manage your personal information, hostel details, and emergency details in one place.
                        </p>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                                Welcome, {firstName}
                            </span>
                            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                                Profile {completion}% complete
                            </span>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {heroStats.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.label}
                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                                    {item.label}
                                                </p>
                                                <p className="mt-2 text-sm font-semibold text-secondary">
                                                    {item.value}
                                                </p>
                                            </div>
                                            <div className={`rounded-xl p-2.5 ${item.iconBg}`}>
                                                <Icon size={18} className={item.iconColor} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white shadow-sm">
                                {initials}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-lg font-bold text-secondary">
                                    {formData.name || 'Not Added'}
                                </p>
                                <p className="truncate text-sm text-slate-500">
                                    {formData.email || 'Not Added'}
                                </p>
                            </div>
                        </div>

                        <div className="my-4 h-px bg-slate-200" />

                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl border border-slate-200 bg-white p-3">
                                <p className="text-xs text-slate-500">Room</p>
                                <p className="mt-1 text-lg font-bold text-secondary">
                                    {formData.roomNumber || '—'}
                                </p>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-white p-3">
                                <p className="text-xs text-slate-500">Status</p>
                                <p className="mt-1 text-lg font-bold text-emerald-600">Active</p>
                            </div>
                        </div>

                        {!isEditing ? (
                            <button
                                type="button"
                                onClick={handleEditToggle}
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                <PencilLine size={16} />
                                Edit Profile
                            </button>
                        ) : (
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                                >
                                    <Save size={16} />
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    <X size={16} />
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <div className="xl:col-span-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-secondary">Personal Information</h2>
                            <p className="text-sm text-slate-500">
                                Your core student and hostel details.
                            </p>
                        </div>
                        <div className="rounded-xl bg-slate-100 p-3">
                            <User className="text-slate-700" size={20} />
                        </div>
                    </div>

                    {!isEditing ? (
                        <>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {infoCards.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.key}
                                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <p className="text-sm text-slate-500">{item.label}</p>
                                                    <p className="mt-2 break-words text-xl font-bold text-secondary">
                                                        {item.value}
                                                    </p>
                                                </div>
                                                <div className={`rounded-xl p-3 ${item.iconBg}`}>
                                                    <Icon size={20} className={item.iconColor} />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="text-sm text-slate-500">Address</p>
                                        <p className="mt-2 break-words text-lg font-semibold text-secondary">
                                            {formData.address || 'Not Added'}
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-orange-50 p-3">
                                        <MapPin size={20} className="text-orange-600" />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <InputField
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    icon={User}
                                    iconBg="bg-blue-50"
                                    iconColor="text-blue-600"
                                />
                                <InputField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    icon={Mail}
                                    iconBg="bg-violet-50"
                                    iconColor="text-violet-600"
                                />
                                <InputField
                                    label="Mobile Number"
                                    name="mobileNumber"
                                    type="tel"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    icon={Phone}
                                    iconBg="bg-emerald-50"
                                    iconColor="text-emerald-600"
                                />
                                <InputField
                                    label="Room Number"
                                    name="roomNumber"
                                    value={formData.roomNumber}
                                    onChange={handleChange}
                                    icon={Home}
                                    iconBg="bg-amber-50"
                                    iconColor="text-amber-600"
                                />
                                <InputField
                                    label="Hostel Name"
                                    name="hostelName"
                                    value={formData.hostelName}
                                    onChange={handleChange}
                                    icon={Building2}
                                    iconBg="bg-sky-50"
                                    iconColor="text-sky-600"
                                />
                                <InputField
                                    label="Joined Date"
                                    name="joinedDate"
                                    type="date"
                                    value={formData.joinedDate}
                                    onChange={handleChange}
                                    icon={CalendarDays}
                                    iconBg="bg-purple-50"
                                    iconColor="text-purple-600"
                                />
                                <InputField
                                    label="Course"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    icon={GraduationCap}
                                    iconBg="bg-indigo-50"
                                    iconColor="text-indigo-600"
                                />
                                <InputField
                                    label="Year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    icon={GraduationCap}
                                    iconBg="bg-pink-50"
                                    iconColor="text-pink-600"
                                />
                                <InputField
                                    label="Guardian Name"
                                    name="guardianName"
                                    value={formData.guardianName}
                                    onChange={handleChange}
                                    icon={Users}
                                    iconBg="bg-cyan-50"
                                    iconColor="text-cyan-600"
                                />
                                <InputField
                                    label="Guardian Phone"
                                    name="guardianPhone"
                                    type="tel"
                                    value={formData.guardianPhone}
                                    onChange={handleChange}
                                    icon={Phone}
                                    iconBg="bg-lime-50"
                                    iconColor="text-lime-600"
                                />
                            </div>

                            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="mb-3 flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500">Address</p>
                                    </div>
                                    <div className="rounded-xl bg-orange-50 p-3">
                                        <MapPin size={20} className="text-orange-600" />
                                    </div>
                                </div>

                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-secondary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                                    placeholder="Enter your address"
                                />
                            </div>
                        </>
                    )}

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-emerald-50 p-3">
                                <ShieldCheck className="text-emerald-600" size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-secondary">Account Security</p>
                                <p className="text-sm text-slate-500">
                                    Your student account is protected and linked with your registered email.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-4 space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-secondary">Profile Completion</h2>
                                <p className="text-sm text-slate-500">
                                    Keep your profile updated for a better dashboard experience.
                                </p>
                            </div>
                            <div className="rounded-xl bg-emerald-50 p-3">
                                <CheckCircle2 className="text-emerald-600" size={20} />
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="mb-3 flex items-center justify-between">
                                <p className="text-sm font-medium text-slate-600">Completion Status</p>
                                <p className="text-sm font-bold text-secondary">{completion}%</p>
                            </div>

                            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
                                <div
                                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                                    style={{ width: `${completion}%` }}
                                />
                            </div>

                            <div className="mt-4 space-y-3">
                                {checklist.map((item) => (
                                    <div key={item.label} className="flex items-center justify-between gap-3">
                                        <span className="text-sm text-slate-600">{item.label}</span>
                                        <span
                                            className={
                                                item.done
                                                    ? 'text-xs font-semibold text-emerald-600'
                                                    : 'text-xs font-semibold text-slate-400'
                                            }
                                        >
                                            {item.done ? 'Completed' : 'Missing'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="rounded-xl bg-blue-50 p-3">
                                <LifeBuoy className="text-blue-600" size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-secondary">Need help?</p>
                                <p className="text-sm text-slate-500">
                                    Reach hostel support for profile, room, or emergency-contact updates.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                        >
                            Contact Support
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;