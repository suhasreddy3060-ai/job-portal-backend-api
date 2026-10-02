const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

exports.users = async (req, res, next) => { try { res.json({ users: await User.find().select('-password').sort({ createdAt: -1 }) }); } catch (e) { next(e); } };
exports.user = async (req, res, next) => { try { const user = await User.findById(req.params.id).select('-password'); if (!user) return res.status(404).json({ message: 'User not found' }); res.json({ user }); } catch (e) { next(e); } };
exports.updateUserStatus = async (req, res, next) => { try { const { status } = req.body; if (!['active', 'blocked'].includes(status)) return res.status(400).json({ message: 'Invalid status' }); const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true }).select('-password'); if (!user) return res.status(404).json({ message: 'User not found' }); res.json({ message: 'User status updated', user }); } catch (e) { next(e); } };
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Remove applications linked to jobs owned by an employer before deleting those jobs.
    const employerJobs = await Job.find({ employer: user._id }).select('_id');
    const employerJobIds = employerJobs.map(job => job._id);
    if (employerJobIds.length) {
      await Application.deleteMany({ job: { $in: employerJobIds } });
      await Job.deleteMany({ _id: { $in: employerJobIds } });
    }

    // Remove applications submitted by the deleted user if they are a job seeker.
    await Application.deleteMany({ jobSeeker: user._id });
    await User.deleteOne({ _id: user._id });

    res.json({ message: 'User deleted' });
  } catch (e) { next(e); }
};
exports.jobs = async (req, res, next) => { try { res.json({ jobs: await Job.find().populate('employer', 'name email').sort({ createdAt: -1 }) }); } catch (e) { next(e); } };
exports.job = async (req, res, next) => { try { const job = await Job.findById(req.params.id).populate('employer', 'name email'); if (!job) return res.status(404).json({ message: 'Job not found' }); res.json({ job }); } catch (e) { next(e); } };
exports.deleteJob = async (req, res, next) => { try { const job = await Job.findByIdAndDelete(req.params.id); if (!job) return res.status(404).json({ message: 'Job not found' }); await Application.deleteMany({ job: job._id }); res.json({ message: 'Job removed by admin' }); } catch (e) { next(e); } };
