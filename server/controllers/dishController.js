import Dish from "../models/dishModel.js";
import { validationResult } from "express-validator";

// Get Dishes
export const getDishes = async (req, res) => {
    
    try {
        const dishes = await Dish.find().sort({ createdAt: -1 })
        res.json(dishes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");  
    };
    
};

// Add new Dish
export const newDish = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const { dish_name, recipe } = req.body;
    
    try {
        const NewDish = new Dish({
            dish_name,
            recipe
        });

        const dish = await NewDish.save();

        res.json(dish);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    };

};

// Update Dish
export const updateDish = async (req, res) => {

    const { dish_name, recipe } = req.body;

    // build dish object
    const dishFields = {};
    if(dish_name) dishFields.dish_name = dish_name;
    if(recipe) dishFields.recipe = recipe;

    try {
        let dish = await Dish.findById(req.params.id);

        if(!dish) return res.status(404).json({ msg: "Dish not found" });

        // Make sure user own dish
        if(dish._id.toString() !== req.params.id) {
            return res.status(401).json({ msg: "Not authorized" });
        };

        dish = await Dish.findByIdAndUpdate(req.params.id, 
            { $set: dishFields },
            { new: true });

            res.json(dish);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")        
    };

};

// Delete Dish
export const deleteDish = async (req, res) => {

    try {
        let dish = await Dish.findById(req.params.id);

        if(!dish) return res.status(404).json({ msg: "Dish not found" });

        // Make sure user wn dish
        if(dish._id.toString() !== req.params.id) {
            return res.status(401).json({ msg: "Not authorized" });
        };

        dish = await Dish.findByIdAndRemove(req.params.id);

        res.json({ msg: "Dish Removed"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")        
    };
}