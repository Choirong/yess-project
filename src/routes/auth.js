const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

const router = express.Router();

const SECRET_KEY = process.env.local.JWT_SECRET;

router.post("/register", async (req, res) => {
    const { email, name } = req.body;
    try {
        let user = await User.findByEmail(email);
        if (user) {
            user = await User.updateName(email, name);
        } else {
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
