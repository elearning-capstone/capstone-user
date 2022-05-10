const express = require("express");
const axios = require("axios");
const { userCheckMiddleware } = require("../middleware");
const { user } = require("../models");
const router = express.Router();

const course_ip = "http://ip-172-31-36-250.ap-southeast-1.compute.internal:3000";

router.get("/", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.get(course_ip + "/comment", { params: req.query });

        let user_id = new Set();

        for (const comment of response.data.comment) {
            user_id.add(comment.user_id);
            if (comment.tag_user) {
                user_id.add(comment.tag_user);
            }
            for (const reply of comment.reply) {
                user_id.add(reply.user_id);
                if (reply.tag_user) {
                    user_id.add(reply.tag_user);
                }
            }
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

        for (let i = 0; i < response.data.comment.length; i++) {
            response.data.comment[i].fullname = fullname[response.data.comment[i].user_id];
            let id = response.data.comment[i].tag_user;
            if (id) {
                response.data.comment[i].tag_fullname = fullname[id];
            }
            for (let j = 0; j < response.data.comment[i].reply.length; j++) {
                response.data.comment[i].reply[j].fullname = fullname[response.data.comment[i].reply[j].user_id];
                let id = response.data.comment[i].reply[j].tag_user;
                if (id) {
                    response.data.comment[i].reply[j].tag_fullname = fullname[id];
                }
            }
        }

        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

router.post("/", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.post(course_ip + "/comment", req.body, { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

router.post("/reply", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.post(course_ip + "/comment/reply", req.body, { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

router.post("/like", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.post(course_ip + "/comment/like", req.body, { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

router.post("/unlike", userCheckMiddleware, async (req, res) => {
    try {
        const response = await axios.post(course_ip + "/comment/unlike", req.body, { params: req.query });
        return res.json(response.data);
    } catch (err) {
        return res.status(err.response.status || 404).json(err.response.data || { message: "not found" });
    }
});

module.exports = router;