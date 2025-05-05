import express from 'express';
import { addLeave, addNewLeave, getLeaveUsers, searchCandidates } from "../controllers/leaveController.js";
const router = express.Router();

// router.post('/add-new', addNewLeave);
router.post('/new-leave', addNewLeave);
router.get('/get-users', getLeaveUsers);
router.get('/search-name', searchCandidates);

export default router;
