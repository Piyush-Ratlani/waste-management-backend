const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');
const Employee = mongoose.model('Employee');
const jwt = require('jsonwebtoken');
const { errorRes } = require('../utility/utility');
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
const JWT_SECRET_EMPLOYEE = process.env.JWT_SECRET_EMPLOYEE;

module.exports.requireAdminLogin = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return errorRes(res, 401, 'Unauthorized access.');

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, JWT_SECRET_ADMIN, (err, payload) => {
    if (err) return errorRes(res, 401, 'Unauthorized access.');

    const { _id } = payload;
    Admin.findById(_id)
      .then(adminData => {
        const { _id, displayName, email, accountType } = adminData;
        req.admin = { _id, displayName, email, accountType, token };
        next();
      })
      .catch(err => {
        console.log(err);
        return errorRes(res, 500, 'Internal server error.');
      });
  });
};

module.exports.requireEmployeeLogin = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return errorRes(res, 401, 'Unauthorized access.');

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, JWT_SECRET_EMPLOYEE, (err, payload) => {
    if (err) return errorRes(res, 401, 'Unauthorized access.');

    const { _id } = payload;
    Employee.findById(_id)
      .then(employeeData => {
        const {
          _id,
          displayName,
          contactNumber,
          employeeId,
          address,
          displayImage,
          accountType,
        } = employeeData;
        req.employee = {
          _id,
          displayName,
          contactNumber,
          employeeId,
          address,
          displayImage,
          accountType,
        };
        next();
      })
      .catch(err => {
        console.log(err);
        return errorRes(res, 500, 'Internal server error.');
      });
  });
};
