const mongoose = require('mongoose');
const { successRes, errorRes } = require('../utility/utility');
const Employee = mongoose.model('Employee');
const Dustbin = mongoose.model('Dustbin');

module.exports.allEmployees_get = (req, res) => {
  Employee.find()
    .select('-password')
    .then(employees => successRes(res, { employees }))
    .catch(err => {
      console.log(err);
      return errorRes(res, 500, 'Internal server error.');
    });
};

module.exports.addDustbin_post = (req, res) => {
  const { place, level, channel } = req.body;

  if (!place || !channel) return errorRes(res, 400, 'All fields are required.');

  Dustbin.findOne({ place })
    .then(savedDustbin => {
      if (savedDustbin)
        return errorRes(res, 400, 'Dustbin already added for given place.');
      else {
        const dustbin = new Dustbin({ place, level, channel });
        dustbin
          .save()
          .then(newDustbin => {
            const { _id, place, level, channel } = newDustbin;
            return successRes(res, {
              dustbin: { _id, place, level, channel },
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
  const { dustbinId } = req.params;

  if (level) {
    Dustbin.findByIdAndUpdate(dustbinId, { level }, { new: true })
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

module.exports.updateEmployee_post = (req, res) => {
  const { _id } = req.params;
  const { displayImage, password } = req.body;
  console.log(req.employee);

  if (_id !== req.employee._id.toString())
    return errorRes(res, 401, 'Invalid access.');
  else if (!displayImage) return errorRes(res, 400, 'Avatar is required.');
  else if (!password) return errorRes(res, 400, 'Password is required.');
  else {
    Employee.findByIdAndUpdate(_id, { displayImage, password }, { new: true })
      .then(updatedEmployee =>
        successRes(res, {
          employee: updatedEmployee,
          message: 'Employee updated.',
        })
      )
      .catch(err => {
        console.log(err);
        return errorRes(res, 500, 'Internal server error.');
      });
  }
};
