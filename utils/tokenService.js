const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

exports.generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user._id, role: user.role },
        jwtConfig.accessTokenSecret,
        { expiresIn: jwtConfig.tokenLife }
    );
};

exports.generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user._id },
        jwtConfig.refreshTokenSecret,
        { expiresIn: jwtConfig.refreshTokenLife }
    );
};
