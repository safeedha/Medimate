import { Router } from 'express';
import { refreshTokenController } from '../../interfaces/controller/refreshTokenController';

const router = Router();

router.post('/', refreshTokenController);

export { router as refreshTokenRouter };