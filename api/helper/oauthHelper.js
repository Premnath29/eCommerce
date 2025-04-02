import OAuth2Server from 'oauth2-server';
import oauthModel from '../model/oauthModel.js';
import clientModel from '../model/clientModel.js';
import { BAD_REQUEST, UNAUTHORIZED } from "../errorCodes.js";
 import { userValidation } from '../helper/loginHelper.js';
import mongoose from 'mongoose'; 

const getAccessToken = function (token) {
    return oauthModel.findOne({
        accessToken: token,
    }).lean();
};

const getClient = function (clientId, clientSecret) {
    return clientModel.findOne({
        clientId: clientId,
        clientSecret: clientSecret,
    }).lean();
};

const saveToken = async function (token, client, user) {
    await oauthModel.deleteMany({ 'user.userId': user._id });

    const tokenInstance = new oauthModel({
        accessToken: token.accessToken,
        accessTokenExpiresAt: new Date(Date.now() + 20 * 60 * 1000), 
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        client: {
            id: client.id,
            clientId: client.clientId,
        },
        user: {
            userName: user.userName,
            emailId: user.personalEmail,
            userId: user._id,
            userRole: user.role,
            firstTimeUser: user.firstTimeUser,
            forgotPassword: user.forgotPassword
        },
    });

    return tokenInstance.save().then((savedToken) => {
        if (!savedToken) {
            console.error('Token not saved');
        } else {
            delete savedToken._id;
            delete savedToken.__v;
        }
        return savedToken;
    });
};

const getUser = function (userName, password) {
   
    const data = { userName: userName, password: password }
    const user = userValidation(data);
    return user;

};


const getRefreshToken = function (refreshToken) {
    return oauthModel.findOne({
        refreshToken: refreshToken,
    }).lean();
};

const revokeToken = function (token) {
    return oauthModel.deleteOne({
        refreshToken: token.refreshToken,
    }).lean();
};

const oauthtoken = new OAuth2Server({
    model: {
        getAccessToken: getAccessToken,
        getClient: getClient,
        saveToken: saveToken,
        getUser: getUser,
        getRefreshToken: getRefreshToken,
        revokeToken: revokeToken,
    },
});

export const oauthValidation = async function (req, res) {

    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);


    try {
        const tokenInfo = await oauthtoken.token(request, response);
        // setTimeout(() => {
        // res.json(tokenInfo);
        return tokenInfo
        // }, 1000);
    } catch (error) {
        console.dir(error);
        return ({error:error.message});
    }
};

export const oauthAuthentication = async function (req, res,next) {
    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);


    try {
        const token = await oauthtoken.authenticate(request, response);
        req.authUser = token.user;
        next();
    } catch (err) {
        console.log('auth error: ', {
            endpoint: req.originalUrl,
            msg: err.message,
        });
        return res.status(UNAUTHORIZED.code).send({ error: err.message });
    }
};

export const handleRefreshTokenRequest = async (req, res) => {
    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);
    try {
        const tokenInfo = await oauthtoken.token(request, response);
        res.json(tokenInfo);
    } catch (error) {
        console.error(error);
        res.status(error.code || 500).json(error);
    }
};

export const logoutUsers = async function (_id) {
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            throw new Error('Invalid ID format.');
        }
        const result = await oauthModel.findByIdAndDelete(_id);
        if (!result) {
            throw new Error(`logout with ID ${_id} not found.`);
        }
        return true;
    } catch (error) {
        console.error('Error deleting logout document:', error);
        throw error;
    }
}