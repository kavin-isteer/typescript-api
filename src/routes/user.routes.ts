import express from 'express';
import { verifyToken,authorizeForRole } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/admin', verifyToken, authorizeForRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

router.get('/user', verifyToken, authorizeForRole('user', 'admin'), (req, res) => {
  res.json({ message: 'Welcome User!' });
});

export default router;
