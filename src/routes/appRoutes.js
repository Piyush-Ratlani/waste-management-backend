const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const express = require('express');
const appController = require('../controllers/appController');
const {
  requireAdminLogin,
  requireEmployeeLogin,
} = require('../middlewares/requireLogin');

const router = express.Router();

router.get('/employee/all', requireAdminLogin, appController.allEmployees_get);
router.post(
  '/employee/:_id/update',
  requireEmployeeLogin,
  appController.updateEmployee_post
);
router.post('/dustbin/add', requireAdminLogin, appController.addDustbin_post);
router.get('/dustbin/all', appController.allDustbin_get);
router.post(
  '/dustbin/:dustbinId/update/level',
  requireEmployeeLogin,
  appController.updateDustbinLevel_post
);

module.exports = router;
