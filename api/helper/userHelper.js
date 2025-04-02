import { ObjectId } from "mongodb";
import userModel from "../model/useModel.js"
import bcrypt from 'bcrypt';

export const createUsers = async function (reqBody = {}) {
    try {
       
        const data = {
            ...reqBody,
        };
        if (data.password) {
            const saltRounds = 10;
            data.password = await bcrypt.hash(data.password, saltRounds);
        }
        const usersDocument = new userModel(data);
        const result = await usersDocument.save();
        return result;
    } catch (error) {
        if (error.message && error.message.duplicateKey) {
            throw error;
        }
        console.error('Error saving userDocument:', error);
        throw error;
    }
};