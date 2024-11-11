/*module.exports = {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: '15m',
    refreshTokenExpiresIn: '7d'
    
};*/
module.exports = {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    tokenLife: '15m',
    refreshTokenLife: '7d',
   
};
console.log("Access Token Secret:", process.env.ACCESS_TOKEN_SECRET);
console.log("Refresh Token Secret:", process.env.REFRESH_TOKEN_SECRET);
