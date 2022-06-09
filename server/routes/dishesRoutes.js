import express  from "express";
const router = express.Router();
import { getDishes, newDish, updateDish, deleteDish } from "../controllers/dishController.js";
import { check } from "express-validator";


router.get("/dishes", getDishes);
router.post("/newDish", [
    check('dish_name', "Dish Name is required")
    .not()
    .isEmpty()
], newDish);
router.put("/dish/:id",  updateDish);
router.delete("/dish/:id", deleteDish)

export default router;