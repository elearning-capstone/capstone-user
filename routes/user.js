const express = require("express");
const router = express.Router();
const { user } = require("../models");

router.get("/", async (req, res) => {
    try {
        return res.json({
            user: await user.findAll(),
        });
    } catch(err) {
        return res.status(404).json({ message: "not found" });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { username, password, fullname, email } = req.body;

        if (typeof username != "string" || typeof password != "string" || typeof fullname != "string" || typeof email != "string") {
            return res.status(400).json({ message: "invalid username, password, fullname, or email" })
        }

        let countUser = await user.count({
            where: {
                username
            }
        });

        let countEmail = await user.count({
            where: {
                email
            }
        });

        if (countUser != 0 && countEmail != 0) {
            return res.status(400).json({ message: "invalid username and email" })
        } else if (countUser != 0){
            return res.status(400).json({ message: "invalid username" })
        } else if (countEmail != 0){
            return res.status(400).json({ message: "invalid email" })
        }

        let new_user = await user.create({
            username,
            password,
            fullname,
            email
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
            user_id: user_info.id,
            role: user_info.role,
        });
    } catch(err) {
        return res.status(404).json({ message: "not found" });
    }
});

router.put("/role", async (req, res) => {
    try {
        const { user_id, role } = req.body;

        if (typeof user_id != "number" || role != "user" && role != "lecturer") {
            return res.status(400).json({ message: "invalid user_id, role" })
        }

        let count = await user.count({
            where: {
                id: user_id,
            }
        });

        if (count == 0) {
            return res.status(400).json({ message: "user not found" })
        }

        await user.update({
            role
        }, {
            where: {
                id: user_id,
            }
        });

        return res.json({ message: "success" });
    } catch(err) {
        return res.status(404).json({ message: "not found" });
    }
});

module.exports = router;