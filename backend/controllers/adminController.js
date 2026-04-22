import User from "../models/User.js";
import Complaint from "../models/Complaint.js";
import Notice from "../models/Notice.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });

    const pendingComplaints = await Complaint.countDocuments({
      status: "Pending",
    });

    const activeNotices = await Notice.countDocuments();

    let pendingVerifications = 0;

    // Use this only if your User model has verificationStatus
    try {
      pendingVerifications = await User.countDocuments({
        role: "student",
        verificationStatus: "Pending",
      });
    } catch (error) {
      pendingVerifications = 0;
    }

    res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        pendingComplaints,
        activeNotices,
        pendingVerifications,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};