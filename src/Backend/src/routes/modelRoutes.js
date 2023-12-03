import { Router } from 'express';
import { createSong } from '../models/model.js';

const router = Router();

router.post('/taylorswiftmodel', createSong);

export default router;