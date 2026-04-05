import Complaint from "../models/Complaint.js";

export const createComplaint = async (req, res) => {
  try {
    const {
      name,
      email,
      roomNumber,
      hostelName,
      category,
      subject,
      description,
      priority,
    } = req.body;

    if (!name || !email || !roomNumber || !category || !subject || !description) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const complaint = await Complaint.create({
      student: req.user._id,
      name,
      email,
      roomNumber,
      hostelName: hostelName || "",
      category,
      subject,
      description,
      priority: priority || "Medium",
      assignedTo: "Warden",
    });

    res.status(201).json({
      message: "Complaint submitted successfully.",
      complaint,
    });
  } catch (error) {
    console.error("Create Complaint Error:", error);
    res.status(500).json({ message: "Server error while creating complaint." });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Get My Complaints Error:", error);
    res.status(500).json({ message: "Server error while fetching complaints." });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Get All Complaints Error:", error);
    res.status(500).json({ message: "Server error while fetching all complaints." });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    if (status) complaint.status = status;
    if (adminNote !== undefined) complaint.adminNote = adminNote;

    const updatedComplaint = await complaint.save();

    res.status(200).json({
      message: "Complaint updated successfully.",
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error("Update Complaint Error:", error);
    res.status(500).json({ message: "Server error while updating complaint." });
  }
};
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }
    if (
      complaint.student.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You are not allowed to delete this complaint.",
      });
    }

    if (req.user.role !== "admin" && complaint.status !== "Pending") {
      return res.status(400).json({
        message: "You can only delete complaints that are still pending.",
      });
    }

    await complaint.deleteOne();

    return res.status(200).json({
      message: "Complaint deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Complaint Error:", error);
    return res.status(500).json({
      message: "Server error while deleting complaint.",
    });
  }
};