const admin = require('../firebase');
const AppError = require('../utils/appError');

module.exports = async (req, res, next) => {
    try {
        const decodedIdTokenFromFirebase = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);

        req.user = decodedIdTokenFromFirebase;
        next();
    } catch (error) {
        // console.log('Error while verifying Firebase ID token:', error);
        return next(new AppError('You are not logged in!', 403));
    }
};
