import express from 'express';
import { oauthAction, logoutAction, oauthReAction } from '../controller/oauthController.js';

const router = express.Router();

router.post('/api/oauth/login', oauthAction);
router.post('/api/oauth/relogin', oauthReAction )
router.delete('/api/oauth/logout/:_id', logoutAction)

export default router; 