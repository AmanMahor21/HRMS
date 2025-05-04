import express from 'express';
import { addNewLeave, searchCandidates } from "../controllers/leaveController.js";
const router = express.Router();

router.post('/add-new', addNewLeave);
router.get('/search-name', searchCandidates);

export default router;
