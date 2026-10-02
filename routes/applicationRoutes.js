const router = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const c = require('../controllers/applicationController');
router.post('/jobs/:jobId', protect, authorize('seeker'), c.apply);
router.get('/mine', protect, authorize('seeker'), c.myApplications);
router.get('/employer/jobs/:jobId', protect, authorize('employer'), c.employerApplications);
router.patch('/:id/status', protect, authorize('employer'), c.updateStatus);
module.exports = router;
