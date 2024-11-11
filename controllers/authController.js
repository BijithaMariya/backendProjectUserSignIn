const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenService');

const { generateOTP } = require('../utils/generateOTP');
//const { sendOTP } = require('../utils/sendOTP'); // Implement OTP sending (e.g., via email)

// function generateAccessToken(user) {
//     return jwt.sign(
//         { userId: user._id, role: user.role },
//         jwtConfig.accessTokenSecret,
//         { expiresIn: jwtConfig.tokenLife }
//     );
// }

// Signup
exports.signup = async (req, res) => {
    const { email, password, number, role } = req.body;
    try {
        const user = new User({ email, password, number, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Signin
/*exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //const accessToken = generateAccessToken(user);
        //const refreshToken = generateRefreshToken(user);
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign({ userId: user._id }, jwtConfig.refreshTokenSecret, { expiresIn: jwtConfig.refreshTokenLife });

        //res.json({ accessToken, refreshToken });

        // Log tokens for testing purposes
        console.log(`Access Token for ${email}: ${accessToken}`);
        console.log(`Refresh Token for ${email}: ${refreshToken}`);

        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Send OTP
/*exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        // Instead of sending the OTP, log it in the console for testing
        console.log(`OTP for ${email}: ${otp}`);

        res.json({ message: 'OTP generated and sent to console for testing purposes' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/
exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
        await user.save();

        // Log OTP to console for testing purposes
        console.log(`OTP for ${email}: ${otp}`);

        res.json({ message: 'OTP generated and sent to console for testing purposes' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Verify OTP
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

        user.otp = null;
        user.otpExpires = null;
        await user.save();
        res.json({ message: 'OTP verified' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
