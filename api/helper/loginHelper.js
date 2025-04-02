import userModel from "../model/useModel.js";
import oauthModel from '../model/oauthModel.js';
import bcrypt from 'bcrypt';

export const userValidation = async function (req, res) {
    const { userName, password } = req;
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userModel.findOne({ userName: userName }).exec(); 

            if (!user) {
                console.error('User not found');
                reject({ error: 'User not found', statusCode: 404 });
                return;
            }

            if (user.hide) {
                console.error('User is blocked');
                reject({ error: 'User is blocked', statusCode: 401 });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.error('Invalid password');
                reject({ error: 'Invalid password', statusCode: 401 });
                return;
            }

            await oauthModel.deleteMany({ 'user.userName': userName }).exec();
            resolve(user);
        } catch (err) {
            console.error('Error finding/updating user:', err);
            reject({ error: 'Internal server error', statusCode: 500 });
        }
    });
};
