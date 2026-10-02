const User = require('../models/User');
const { signToken, setAuthCookie } = require('../utils/auth');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'seeker', skills, experience, education } = req.body;
    if (role === 'admin') return res.status(403).json({ message: 'Admin registration is not allowed through public API' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password, role, skills, experience, education });
    const token = signToken(user);
    setAuthCookie(res, token);
    res.status(201).json({ message: 'Registration successful', user: user.toObject({ transform: (_, ret) => { delete ret.password; return ret; } }) });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid email or password' });
    if (user.status !== 'active') return res.status(403).json({ message: 'Account is blocked' });
    const token = signToken(user);
    setAuthCookie(res, token);
    user.password = undefined;
    res.json({ message: 'Login successful', user });
  } catch (e) { next(e); }
};

exports.logout = (req, res) => { res.clearCookie('token'); res.json({ message: 'Logged out successfully' }); };
