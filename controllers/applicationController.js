const Application = require('../models/Application');
const Job = require('../models/Job');

exports.apply = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.status !== 'open' || job.applicationDeadline < new Date()) return res.status(400).json({ message: 'Applications are closed for this job' });
    const existing = await Application.findOne({ job: job._id, jobSeeker: req.user._id });
    if (existing) return res.status(409).json({ message: 'You have already applied for this job' });
    const application = await Application.create({ job: job._id, jobSeeker: req.user._id, coverLetter: req.body.coverLetter });
    res.status(201).json({ message: 'Application submitted', application });
  } catch (e) { next(e); }
};

exports.myApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ jobSeeker: req.user._id }).populate('job', 'title companyName location status').sort({ appliedAt: -1 });
    res.json({ applications });
  } catch (e) { next(e); }
};

exports.employerApplications = async (req, res, next) => {
  try {
    const job = await Job.findOne({ _id: req.params.jobId, employer: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job not found or not owned by you' });
    const applications = await Application.find({ job: job._id }).populate('jobSeeker', 'name email skills experience education').sort({ appliedAt: -1 });
    res.json({ applications });
  } catch (e) { next(e); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['submitted', 'reviewing', 'shortlisted', 'rejected', 'hired'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid application status' });
    const application = await Application.findById(req.params.id).populate('job');
    if (!application) return res.status(404).json({ message: 'Application not found' });
    if (application.job.employer.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'You can manage only applications for your jobs' });
    application.status = status;
    await application.save();
    res.json({ message: 'Application status updated', application });
  } catch (e) { next(e); }
};
