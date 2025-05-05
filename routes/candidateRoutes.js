import express from 'express';
import { addNewCandidate, getAllUser, findOneUser, updateUserStatus, deleteUser, updateUser } from '../controllers/candidateController.js';

const router = express.Router();

router.post('/add-new', addNewCandidate);
router.get('/get-users', getAllUser);
router.get('/get-user/:email', findOneUser);
router.patch('/update-user-status', updateUserStatus);
router.patch('/edit-user', updateUser);
router.delete('/delete-user/:id', deleteUser);
export default router;
