import express  from "express";
const router = express.Router();
import { registerUser, loginUser, getUsers } from "../controllers/userControllers.js";
import { check } from "express-validator";


// register
router.post("/register", [
    check('name', 'Please add name')
    .not()
    .isEmpty(),
    check('email', 'Please include a valid email')
    .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
    .isLength({
        min: 6
    })
], registerUser);

// login
router.post("/login", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").notEmpty()
], loginUser);

// get users
router.get("/users", getUsers);

export default router;  