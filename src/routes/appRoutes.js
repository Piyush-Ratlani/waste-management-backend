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
  '/employee/:_id/password/update',
  requireEmployeeLogin,
  appController.updateEmployeePassword_post
);
router.post(
  '/employee/:_id/avatar/update',
  requireEmployeeLogin,
  appController.updateEmployeeDisplayImage_post
);
router.post('/dustbin/add', requireAdminLogin, appController.addDustbin_post);
router.get('/dustbin/all', appController.allDustbin_get);
router.post(
  '/dustbin/:dustbin_Id/update/level',
  requireEmployeeLogin,
  appController.updateDustbinLevel_post
);
router.delete(
  '/employee/:employeeId/delete',
  requireAdminLogin,
  appController.deleteEmployee_delete
);
router.post(
  '/employee/:employeeId/update',
  requireAdminLogin,
  appController.updateEmployee_post
);
router.delete(
  '/dustbin/:dustbin_Id/delete',
  requireAdminLogin,
  appController.deleteDustbin_delete
);
router.post(
  '/dustbin/:dustbin_Id/update',
  requireAdminLogin,
  appController.updateDustbin_post
);

module.exports = router;
