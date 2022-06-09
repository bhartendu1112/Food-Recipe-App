import mongoose from "mongoose";

const dishSchema = mongoose.Schema({
      
    dish_name: {
        type: String, 
        required: true, 
    },
    recipe: {
        type: String,
        required: true,
    },

}, { timestamps: true });

export default mongoose.model("dish", dishSchema);