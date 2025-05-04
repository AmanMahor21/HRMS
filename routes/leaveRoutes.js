import express from 'express';
import { searchCandidates } from "../controllers/leaveController.js";
const router = express.Router();

router.get('/search-name', searchCandidates);

export default router;
