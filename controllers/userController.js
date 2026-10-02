const User = require('../models/User');

exports.me = async (req, res) => res.json({ user: req.user });

exports.updateMe = async (req, res, next) => {
  try {
    const allowed = ['name', 'skills', 'experience', 'education'];
    const updates = {};
    allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-password');
    res.json({ message: 'Profile updated', user });
  } catch (e) { next(e); }
};
