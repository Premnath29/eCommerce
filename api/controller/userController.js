import { createUsers } from "../helper/userHelper.js";
import { BAD_REQUEST } from "../errorCodes.js";

export const addUsersAction = async (req, res) => {
    try {
        const reqBody = req.body;
        const result = await createUsers(reqBody);
        res.send(result);
    } catch (error) {
        console.error(error);
        return res.status(BAD_REQUEST.code).send(error.message);
    }
};