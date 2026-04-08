import express from 'express';
import {
  createNotice,
  getStudentNotices,
  getAllNotices,
  deleteNotice,
} from '../controllers/noticeController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/student', protect, getStudentNotices);
router.get('/', protect, adminOnly, getAllNotices);
router.post('/', protect, adminOnly, createNotice);
router.delete('/:id', protect, adminOnly, deleteNotice);

export default router;