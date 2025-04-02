import express from 'express'

import {addCartPageAction} from "../controller/cartPageController.js"
import { oauthAuthentication } from '../helper/oauthHelper.js';

const router = express.Router();

router.get('/api/cartpage/create',oauthAuthentication, addCartPageAction);

export default router; 