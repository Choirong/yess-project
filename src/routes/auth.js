const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
    const { email, name } = req.body;
    try {
        let user = await User.findByEmail(email);
        // console.log("User found:", user); // 로그 확인

        if (user !== null) {
            console.log("User exists. Updating user.");
            user = await User.updateName(email, name);
        } else {
            console.log("User does not exist. Creating new user.");
            user = await User.createUser(email, name);
        }

        // JWT 토큰 생성
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
            expiresIn: "1h",
        });

        res.json({
            message: user ? "User updated successfully" : "User created successfully",
            token,
        });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});

module.exports = router;
