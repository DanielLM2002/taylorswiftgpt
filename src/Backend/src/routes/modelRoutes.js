import {Router} from 'express';
import {postModel} from '../models/model.js';

const router = Router();

router.post("/taylorswiftmodel",postModel);

export default router;