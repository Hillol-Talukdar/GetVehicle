const admin = require('../firebase');

exports.authCheck = (req, res, next) => {
    // console.log(req.headers);
    console.log('Auth Check MiddleWare');
    next();
};
