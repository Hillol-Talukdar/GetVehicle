const admin = require('../firebase');
const AppError = require('../utils/appError');

module.exports = async (req, res, next) => {
    if (
        (!req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)
    ) {
        return next(new AppError('You are not logged in!', 403));
    }

    let idToken;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        return next(new AppError('You are not logged in!', 403));
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        // console.log('ID Token correctly decoded', decodedIdToken);

        req.user = decodedIdToken;
        next();
    } catch (error) {
        // console.log('Error while verifying Firebase ID token:', error);
        return next(new AppError('You are not logged in!', 403));
    }
};
