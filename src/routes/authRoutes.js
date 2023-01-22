const express = require('express');
const authController = require('../controllers/authController');
const { requireAdminLogin } = require('../middlewares/requireLogin');
const router = express.Router();

router.post('/admin/signup', authController.adminSignup_post);
router.post('/admin/signin', authController.adminSignin_post);
router.post(
  '/employee/signup',
  requireAdminLogin,
  authController.employeeSignup_post
);
router.post('/employee/signin', authController.employeeSignin_post);
module.exports = router;
