const mongoose = require('mongoose');
const { successRes, errorRes } = require('../utility/utility');
const Employee = mongoose.model('Employee');
const Dustbin = mongoose.model('Dustbin');

module.exports.allEmployees_get = (req, res) => {
  Employee.find()
    .then(employees => successRes(res, { employees }))
    .catch(err => {
      console.log(err);
      return errorRes(res, 500, 'Internal server error.');
    });
};

module.exports.addDustbin_post = (req, res) => {
  const { place, level, channel, dustbinId } = req.body;

  if (!place || !channel || !dustbinId)
    return errorRes(res, 400, 'All fields are required.');

  Dustbin.findOne({ dustbinId })
    .then(savedDustbin => {
      if (savedDustbin)
        return errorRes(res, 400, 'Dustbin already exist with given ID.');
      else {
        const dustbin = new Dustbin({ place, level, channel, dustbinId });
        dustbin
          .save()
          .then(newDustbin => {
            const { _id, place, level, channel, dustbinId } = newDustbin;
            return successRes(res, {
              dustbin: { _id, place, level, channel, dustbinId },
              message: 'Dustbin added successfully.',
            });
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

module.exports.allDustbin_get = (req, res) => {
  Dustbin.find()
    .then(dustbins => successRes(res, { dustbins }))
    .catch(err => {
      console.log(err);
      return errorRes(res, 500, 'Internal server error.');
    });
};

module.exports.updateDustbinLevel_post = (req, res) => {
  const { level } = req.body;
  const { dustbin_Id } = req.params;

  if (level !== undefined || level !== null) {
    Dustbin.findByIdAndUpdate(dustbin_Id, { level }, { new: true })
      .then(updatedDustbin =>
        successRes(res, {
          dustbin: updatedDustbin,
          message: 'Dustbin updated.',
        })
      )
      .catch(err => {
        console.log(err);
        return errorRes(res, 500, 'Internal server error.');
      });
  } else return errorRes(res, 400, 'Level is required.');
};

module.exports.updateEmployeePassword_post = (req, res) => {
  const { _id } = req.params;
  const { password } = req.body;
  console.log(req.employee);

  if (_id !== req.employee._id.toString())
    return errorRes(res, 401, 'Invalid access.');
  else if (!password) return errorRes(res, 400, 'Password is required.');
  else {
    Employee.findByIdAndUpdate(_id, { password }, { new: true })
      .then(updatedEmployee =>
        successRes(res, {
          employee: updatedEmployee,
          message: 'Password updated.',
        })
      )
      .catch(err => {
        console.log(err);
        return errorRes(res, 500, 'Internal server error.');
      });
  }
};

module.exports.updateEmployeeDisplayImage_post = (req, res) => {
  const { _id } = req.params;
  const { displayImage } = req.body;
  console.log(req.employee);

  if (_id !== req.employee._id.toString())
    return errorRes(res, 401, 'Invalid access.');
  else if (!displayImage) return errorRes(res, 400, 'Avatar is required.');
  else {
    Employee.findByIdAndUpdate(_id, { displayImage }, { new: true })
      .then(updatedEmployee =>
        successRes(res, {
          employee: updatedEmployee,
          message: 'Avatar updated.',
        })
      )
      .catch(err => {
        console.log(err);
        return errorRes(res, 500, 'Internal server error.');
      });
  }
};
