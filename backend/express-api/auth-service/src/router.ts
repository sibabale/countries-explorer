import { Router } from 'express';
import { apiRateLimiter } from './utils/index';

import { login } from './controllers/login/login';
import { register } from './controllers/register/register';

const router = Router();

router.post('/auth/login', apiRateLimiter, login);
router.post('/auth/register', apiRateLimiter, register);

export default router;
