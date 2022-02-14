const express = require("express");
const axios = require("axios");
const { userCheckMiddleware } = require("../middleware")
const router = express.Router();

const course_ip = "";

router.get("/all", async (req, res) => {
    try {
        const response = await axios.get(course_ip + "/all");
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status).json(err.response.data);
    }
});

router.post("/register", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.post(course_ip + "/register", req.body, { headers: req.headers });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status).json(err.response.data);
    }
});

module.exports = router;