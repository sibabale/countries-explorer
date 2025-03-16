import { Router } from 'express';
import { apiRateLimiter } from './utils/index';

import { login } from './controllers/login/login';
import { register } from './controllers/register/register';

const router = Router();

router.post('/login', apiRateLimiter, login);
router.post('/register', apiRateLimiter, register);

export default router;
