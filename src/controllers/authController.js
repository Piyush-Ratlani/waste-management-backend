const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');
const Employee = mongoose.model('Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { errorRes, successRes } = require('../utility/utility');
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
const JWT_SECRET_EMPLOYEE = process.env.JWT_SECRET_EMPLOYEE;

module.exports.adminSignup_post = async (req, res) => {
  const { displayName, email, password } = req.body;

  if (!displayName || !email || !password)
    return errorRes(res, 400, 'All fields are required');

  try {
    const savedAdmin = await Admin.findOne({ email });
    if (savedAdmin) {
      return errorRes(res, 400, 'Admin already exist.');
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt
          .hash(password, salt)
          .then(hashedPassword => {
            const admin = new Admin({
              displayName,
              email,
              password: hashedPassword,
            });
            admin
              .save()
              .then(admin => {
                const { _id, displayName, email, accountType } = admin;
                const token = jwt.sign({ _id }, JWT_SECRET_ADMIN);

                res.json({
                  status: 'success',
                  data: {
                    admin: { _id, displayName, email, accountType, token },
                  },
                  message: 'Admin added successfully.',
                });
              })
              .catch(err => {
                console.log(err);
                return errorRes(res, 500, 'Internal server error.');
              });
          })
          .catch(err => {
            console.log(err);
            return errorRes(res, 500, 'Internal server error.');
          });
      });
    }
  } catch (err) {
    console.log(err);
    return errorRes(res, 500, 'Internal server error.');
  }
};

module.exports.adminSignin_post = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return errorRes(res, 400, 'All fields are required.');

  Admin.findOne({ email })
    .then(savedAdmin => {
      if (!savedAdmin) return errorRes(res, 400, 'Invalid login credentials.');
      else {
        bcrypt
          .compare(password, savedAdmin.password)
          .then(doMatch => {
            if (!doMatch)
              return errorRes(res, 400, 'Invalid login credentials.');
            else {
              const { _id, displayName, email, accountType } = savedAdmin;
              const token = jwt.sign({ _id }, JWT_SECRET_ADMIN);
              return successRes(res, {
                admin: { _id, displayName, email, accountType, token },
                message: 'Signin success.',
              });
            }
          })
          .catch(err => {
            console.log(err);
            return errorRes(res, 500, 'Internal server error.');
          });
      }
    })
    .catch(err => {
      console.log(err);
      return errorRes(res, 500, 'Internal server error.');
    });
};

module.exports.employeeSignup_post = (req, res) => {
  const { displayName, contactNumber, address } = req.body;

  if (!displayName || !contactNumber || !address)
    return errorRes(res, 400, 'All fields are required');

  const employeeId =
    displayName.slice(0, 4).toUpperCase() + Math.floor(Math.random() * 1000);
  const password =
    displayName.slice(0, 3).toUpperCase() + Math.floor(Math.random() * 1000);

  Employee.findOne({ contactNumber })
    .then(savedUser => {
      if (savedUser) return errorRes(res, 400, 'Employee already exists.');

      const employee = new Employee({
        displayName,
        contactNumber,
        address,
        employeeId,
        password,
      });
      employee
        .save()
        .then(employee => {
          const {
            _id,
            displayName,
            displayImage,
            contactNumber,
            address,
            employeeId,
            password,
            accountType,
          } = employee;
          //   const token = jwt.sign({ _id }, JWT_SECRET_EMPLOYEE);

          return successRes(res, {
            employee: {
              _id,
              displayName,
              contactNumber,
              address,
              displayImage,
              employeeId,
              password,
              accountType,
            },
            message: 'Employee added successfully.',
          });
        })
        .catch(err => {
          console.log(err);
          return errorRes(res, 500, 'Internal server error.');
        });
    })
    .catch(err => {
      console.log(err);
      return errorRes(res, 500, 'Internal server error.');
    });
};

module.exports.employeeSignin_post = (req, res) => {
  const { employeeId, password } = req.body;

  if (!employeeId || !password)
    return errorRes(res, 400, 'All fields are required.');

  Employee.findOne({ employeeId })
    .then(savedEmployee => {
      if (!savedEmployee)
        return errorRes(res, 400, 'Invalid login credentials.');
      else {
        if (password !== savedEmployee.password)
          return errorRes(res, 400, 'Invalid login credentials.');
        else {
          const {
            _id,
            employeeId,
            displayName,
            displayImage,
            contactNumber,
            address,
            accountType,
          } = savedEmployee;
          const token = jwt.sign({ _id }, JWT_SECRET_EMPLOYEE);

          return successRes(res, {
            employee: {
              _id,
              employeeId,
              displayName,
              displayImage,
              contactNumber,
              address,
              token,
              accountType,
            },
            message: 'Signin success.',
          });
        }
      }
    })
    .catch(err => {
      console.log(err);
      return errorRes(res, 500, 'Internal server error.');
    });
};
