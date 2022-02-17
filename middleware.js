const { user } = require("./models");

exports.userCheckMiddleware = async (req, res, next) => {
    try {
        if (!req.query.user_id) {
            return res.status(400).json({ message: "missing user id" });
        }

        let count = await user.count({
            where: {
                id: req.query.user_id,
            }
        });

        if (count == 0) {
            return res.status(404).json({ message: "user not found" });
        }
    } catch (err) {
        return res.status(404).json({ message: "not found" });
    }

    next();
};