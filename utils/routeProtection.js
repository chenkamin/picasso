exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(res.status(401).json({ message: "You are not logged in! Please log in to get access." }));
    } else {
        next()
    }
}