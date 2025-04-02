import { createCartPage } from "../helper/cartPageHelper.js";
import { BAD_REQUEST } from "../errorCodes.js";
import fetch from "node-fetch"; 

export const addCartPageAction = async (req, res) => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const products = await response.json();

        const insertedProducts = await Promise.all(products.map(product => createCartPage(product)));

        res.status(201).json({ message: "Products added successfully", data: insertedProducts });
    } catch (error) {
        console.error(error);
        return res.status(BAD_REQUEST.code || 400).send({ error: error.message });
    }
};
