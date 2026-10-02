const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  companyName: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  employmentType: { type: String, enum: ['full-time', 'part-time', 'internship', 'contract'], required: true },
  salaryRange: { min: { type: Number, min: 0 }, max: { type: Number, min: 0 } },
  requiredSkills: [{ type: String, trim: true }],
  experienceRequirement: { type: Number, min: 0, default: 0 },
  postedDate: { type: Date, default: Date.now },
  applicationDeadline: { type: Date, required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

jobSchema.index({ title: 'text', description: 'text', location: 'text', requiredSkills: 'text' });
module.exports = mongoose.model('Job', jobSchema);
