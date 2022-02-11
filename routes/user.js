const express = require("express");
const router = express.Router();
const { user } = require("../models");

router.post("/", async (req, res) => {
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

    let user = await user.create({
        username,
        password
    });

    return res.json({
        data: {
            user
        }
    });
});

module.exports = router;