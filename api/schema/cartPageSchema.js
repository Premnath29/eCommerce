import mongoose from "mongoose"

const cartPageSchema = new mongoose.Schema({
    Id : {type : Number, default : null},
    category: { type: String, default: '',  },
    description: { type: String, default: '',  },
    image: { type: String, default: '',  },
    price: { type: String, default: '',  },
    quantity: { type: String, default: '',  },
    title: { type: String, default: '',  },
    rating: { 
        count: { type: String, default: '',  },
        rate: { type: String, default: '',  },
    },
    isActive: { type: Boolean, default:true},
    createdAt: {
        type: Number,
        default: null
    },
    lastModifiedAt: {
        type: Number,
        default: null
    },
 
});

export default cartPageSchema;