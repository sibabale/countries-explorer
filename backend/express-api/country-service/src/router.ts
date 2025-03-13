import { Router } from 'express';
import { apiRateLimiter } from './utils/index';
import { getAllCountries, getCountryByName } from './controllers/read/read';
import { authenticateToken } from './middleware/auth';

const router = Router();

router.get(
  '/countries/search',
  apiRateLimiter,
  authenticateToken,
  getCountryByName,
);
router.get('/countries', apiRateLimiter, authenticateToken, getAllCountries);

export default router;
