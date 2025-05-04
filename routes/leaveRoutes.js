import express from 'express';
import { addLeave, addNewLeave, getLeaveUsers, searchCandidates } from "../controllers/leaveController.js";
const router = express.Router();

router.post('/add-new', addNewLeave);
router.post('/new-leave', addLeave);
router.get('/search-name', searchCandidates);
router.get('/get-users', getLeaveUsers);

export default router;
