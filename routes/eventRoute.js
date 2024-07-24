import { Router } from 'express';
import { createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import upload from '../middlewares/upload.js';

const router = Router();

router.post('/create-event', upload.single('photo'), createEvent);
router.put('/update-event/:id', upload.single('photo'), updateEvent);
router.delete('/delete-event/:id', deleteEvent);

export default router;
