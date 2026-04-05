import Notice from '../models/Notice.js';

export const createNotice = async (req, res) => {
  try {
    const { title, message, category, priority, pinned, audience } = req.body;

    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }

    const notice = await Notice.create({
      title,
      message,
      category,
      priority,
      pinned,
      audience,
      createdBy: req.user._id,
    });

    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create notice' });
  }
};

export const getStudentNotices = async (req, res) => {
  try {
    const studentHostel = req.user?.profile?.hostelName || '';

    const notices = await Notice.find({
      isPublished: true,
      audience: { $in: ['All', studentHostel] },
    })
      .sort({ pinned: -1, createdAt: -1 })
      .populate('createdBy', 'name');

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notices' });
  }
};

export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .sort({ pinned: -1, createdAt: -1 })
      .populate('createdBy', 'name');

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all notices' });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    await notice.deleteOne();

    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notice' });
  }
};