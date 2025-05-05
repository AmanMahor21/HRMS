import express from 'express';
import { getAttendanceUsers, updateAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/update-attendance', updateAttendance);
router.get('/get-attendance', getAttendanceUsers);

export default router;
