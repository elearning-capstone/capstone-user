const express = require("express");
const router = express.Router();
const { user } = require("../models");

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (typeof username != "string" || typeof password != "string") {
            return res.status(400).json({ message: "invalid username, password" })
        }

        let count = await user.count({
            where: {
                username
            }
        });

        if (count != 0) {
            return res.status(400).json({ message: "invalid username, password" })
        }

        let new_user = await user.create({
            username,
            password
        });

        return res.json({
            user: new_user
        });
    } catch(err) {
        return res.status(404).json({ message: "not found" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (typeof username != "string" || typeof password != "string") {
            return res.status(400).json({ message: "invalid username, password" })
        }

        let user_info = await user.findOne({
            where: {
                username
            }
        });

        if (!user_info) {
            return res.status(400).json({ message: "invalid username, password" })
        }

        if (user_info.password != password) {
            return res.status(400).json({ message: "invalid username, password" })
        }

        return res.json({
            user_id: user_info.id
        });
    } catch(err) {
        return res.status(404).json({ message: "not found" });
    }
});

module.exports = router;