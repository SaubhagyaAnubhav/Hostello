import User from '../models/User.js';
import Notice from '../models/Notice.js';
import Complaint from '../models/Complaint.js';

const buildProfileCompletion = (user) => {
    const fields = [
        { label: 'Name', value: user?.name },
        { label: 'Email', value: user?.email },
        { label: 'Room Number', value: user?.profile?.roomNumber },
        { label: 'Phone Number', value: user?.profile?.mobileNumber || user?.profile?.phone },
    ];

    const filled = fields.filter((field) => Boolean(field.value)).length;
    const percentage = Math.round((filled / fields.length) * 100);

    return {
        percentage,
        fields: fields.map((field) => ({
            label: field.label,
            added: Boolean(field.value),
        })),
    };
};

export const getStudentDashboard = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const [latestNotice, noticesCount, complaints] = await Promise.all([
            Notice.findOne({ isActive: true }).sort({ createdAt: -1 }).lean(),
            Notice.countDocuments({ isActive: true }),
            Complaint.find({ student: userId }).sort({ createdAt: -1 }).lean(),
        ]);

        const activeComplaints = complaints.filter(
            (item) => !['Resolved', 'Closed'].includes(item.status)
        );

        const latestComplaint = complaints[0] || null;
        const profileCompletion = buildProfileCompletion(user);

        const recentActivity = [];

        if (user?.profile?.roomNumber) {
            recentActivity.push('Room details available');
        }

        if (latestNotice) {
            recentActivity.push(`New notice: ${latestNotice.title}`);
        }

        if (latestComplaint) {
            recentActivity.push(`Complaint status: ${latestComplaint.status}`);
        }

        if (!recentActivity.length) {
            recentActivity.push('No recent activity yet');
        }

        res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
                roomNumber: user?.profile?.roomNumber || 'Not Assigned',
                phoneNumber: user?.profile?.mobileNumber || user?.profile?.phone || '',
                status: user?.profile?.verificationStatus || 'Active',
            },
            profileCompletion,
            stats: {
                roomNumber: user?.profile?.roomNumber || 'Not Assigned',
                activeNotices: noticesCount,
                complaintsCount: activeComplaints.length,
            },
            latestNotice: latestNotice
                ? {
                      _id: latestNotice._id,
                      title: latestNotice.title,
                      message: latestNotice.message || latestNotice.description || '',
                      createdAt: latestNotice.createdAt,
                  }
                : null,
            latestComplaint: latestComplaint
                ? {
                      _id: latestComplaint._id,
                      title: latestComplaint.title || latestComplaint.subject || 'Complaint',
                      status: latestComplaint.status,
                  }
                : null,
            recentActivity,
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ message: 'Failed to load dashboard data' });
    }
};