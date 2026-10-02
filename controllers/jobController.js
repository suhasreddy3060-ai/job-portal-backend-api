const Job = require('../models/Job');
const Application = require('../models/Application');

exports.listJobs = async (req, res, next) => {
  try {
    const filter = { status: 'open', applicationDeadline: { $gte: new Date() } };
    if (req.query.location) filter.location = new RegExp(req.query.location, 'i');
    if (req.query.employmentType) filter.employmentType = req.query.employmentType;
    if (req.query.search) filter.$text = { $search: req.query.search };
    const jobs = await Job.find(filter).populate('employer', 'name companyName email').sort({ postedDate: -1 });
    res.json({ count: jobs.length, jobs });
  } catch (e) { next(e); }
};

exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name email');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ job });
  } catch (e) { next(e); }
};

exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create({ ...req.body, employer: req.user._id });
    res.status(201).json({ message: 'Job created', job });
  } catch (e) { next(e); }
};

exports.myJobs = async (req, res, next) => {
  try { res.json({ jobs: await Job.find({ employer: req.user._id }).sort({ createdAt: -1 }) }); } catch (e) { next(e); }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, employer: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job not found or not owned by you' });
    const allowedFields = [
      'title', 'companyName', 'description', 'location', 'employmentType',
      'salaryRange', 'requiredSkills', 'experienceRequirement',
      'applicationDeadline', 'status'
    ];
    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        job[field] = req.body[field];
      }
    }
    await job.save();
    res.json({ message: 'Job updated', job });
  } catch (e) { next(e); }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, employer: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job not found or not owned by you' });
    await Application.deleteMany({ job: job._id });
    res.json({ message: 'Job deleted' });
  } catch (e) { next(e); }
};
