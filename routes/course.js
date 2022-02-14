const express = require("express");
const axios = require("axios");
const { userCheckMiddleware } = require("../middleware")
const router = express.Router();

const course_ip = "http://ip-172-31-36-250.ap-southeast-1.compute.internal:3000";

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
        const response = await axios.post(course_ip + "/register", req.body, { headers: { user: req.headers['user'] } });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status).json(err.response.data);
    }
});

module.exports = router;