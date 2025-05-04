import express from 'express';
import { addNewCandidate } from '../controllers/candidateController.js';

const router = express.Router();

router.post('/add-new', addNewCandidate);
// router.post('/login', login);
export default router;
