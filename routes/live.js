const express = require("express");
const axios = require("axios");
const { userCheckMiddleware } = require("../middleware");
const {user} = require("../models");
const router = express.Router();

const course_ip = "http://ip-172-31-36-250.ap-southeast-1.compute.internal:3000";

router.get("/", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.get(course_ip + "/live", { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

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

        let user_id = new Set();

        for (const chat of response.data.chat) {
            user_id.add(chat.user_id);
        }

        let users = await user.findAll({
            attributes: ["id", "fullname"],
            where: {
                id: Array.from(user_id),
            },
            raw: true,
        });

        let fullname = {};

        for (const name of users) {
            fullname[name.id] = name.fullname;
        }

        for (let i = 0; i < response.data.chat.length; i++) {
            response.data.chat[i].fullname = fullname[response.data.chat[i].user_id];
        }

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

router.post("/reaction", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.post(course_ip + "/live/reaction", req.body, { params: req.query });
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

router.delete("/", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.delete(course_ip + "/live", { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

module.exports = router;