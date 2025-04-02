import mongoose from "mongoose";
import { CARTPAGE } from "../collectionName.js";

import cartPageSchema from "../schema/cartPageSchema.js"

const cartPageModel = mongoose.model(CARTPAGE, cartPageSchema);

export default cartPageModel; 
