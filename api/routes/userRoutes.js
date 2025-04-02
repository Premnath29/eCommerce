import express from 'express'

import {addUsersAction} from "../controller/userController.js"
import { oauthAuthentication } from '../helper/oauthHelper.js';


const router = express.Router();

router.post('/api/user/create',oauthAuthentication,  addUsersAction);

export default router; 