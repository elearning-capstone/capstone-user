const express = require("express");
const axios = require("axios");
const { userCheckMiddleware } = require("../middleware")
const router = express.Router();

const course_ip = "http://ip-172-31-36-250.ap-southeast-1.compute.internal:3000";

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(course_ip + "/review");
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

router.post("/create", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.post(course_ip + "/review/create", req.body, { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

module.exports = router;