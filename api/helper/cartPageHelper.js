import cartPageModel from "../model/cartPageModel.js";

export const createCartPage = async function (reqBody = {}) {
    try {
        const cartPageDocument = new cartPageModel(reqBody);
        return await cartPageDocument.save();
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("Duplicate entry detected");
        }
        console.error("Error saving CartPageDocument:", error);
        throw error;
    }
};
