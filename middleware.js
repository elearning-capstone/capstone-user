const { user } = require("./models");

exports.userCheckMiddleware = async (req, res, next) => {
    try {
        let count = await user.count({
            where: {
                id: req.headers['user'],
            }
        });

        if (count != 0) {
            return res.status(404).json({ message: "user not found" });
        }
    } catch (err) {
        return res.status(404).json({ message: "not found" });
    }

    next();
};