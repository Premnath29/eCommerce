import { BAD_REQUEST } from "../errorCodes.js";
import { oauthAuthentication, oauthValidation, logoutUsers, handleRefreshTokenRequest } from "../helper/oauthHelper.js";

export const oauthAction = async (req, res) => {
    try {
        const result = await oauthValidation(req);
        res.send(result);
    } catch (error) {
        console.error(error);
        return res.status(BAD_REQUEST.code).send({error:error.message});
    }
};
export const oauthReAction = async (req, res) => {
    try {
        const result = await handleRefreshTokenRequest(req, res); 
        res.send(result);
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return res.status(400).send({ error: error.message });
    }
};

export const oauthToken = async (req, res) => {
    try {
        const result = await oauthAuthentication(req);
        res.send(result);
    } catch (error) {
        console.error(error);
        return res.status(BAD_REQUEST.code).send(error.message);
    }
};
export const logoutAction = async (req, res) => {
    try {
        const { _id } = req.params;
        const result = await logoutUsers(_id);
        res.send(result);
    } catch (error) {
        console.error(error);
        return res.status(BAD_REQUEST.code).send(error.message);
    }
}