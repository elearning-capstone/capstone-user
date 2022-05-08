const express = require("express");
const axios = require("axios");
const { userCheckMiddleware } = require("../middleware")
const router = express.Router();

const course_ip = "http://ip-172-31-36-250.ap-southeast-1.compute.internal:3000";

router.post("/survey", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.post(course_ip + "/live/survey", req.body, { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

router.get("/sync", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.get(course_ip + "/live/sync", { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

router.post("/chat", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.post(course_ip + "/live/chat", req.body, { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

router.post("/", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.post(course_ip + "/live/", req.body, { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

router.put("/info", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.put(course_ip + "/live/info", req.body, { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

module.exports = router;