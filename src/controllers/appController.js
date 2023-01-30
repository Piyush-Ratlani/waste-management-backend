const mongoose = require('mongoose');
const { successRes, errorRes } = require('../utility/utility');
const Employee = mongoose.model('Employee');
const Dustbin = mongoose.model('Dustbin');

module.exports.allEmployees_get = (req, res) => {
  Employee.find()
    .sort({ employeeId: 1 })
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
    .sort({ dustbinId: 1 })
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

module.exports.deleteDustbin_delete = (req, res) => {
  const { dustbin_Id } = req.params;

  Dustbin.findByIdAndDelete(dustbin_Id, (err, deletedBin) => {
    if (err) {
      console.log(err);
      errorRes(res, 500, 'Internal server error.');
    }
    if (!deletedBin) return errorRes(res, 404, 'Item not found.');
    return successRes(res, {
      deletedBin,
      message: 'Bin deleted successfully',
    });
  });
};

module.exports.deleteEmployee_delete = (req, res) => {
  const { employeeId } = req.params;

  Employee.findByIdAndDelete(employeeId, (err, deletedEmployee) => {
    if (err) {
      console.log(err);
      errorRes(res, 500, 'Internal server error.');
    }
    if (!deletedEmployee) return errorRes(res, 404, 'Employee not found.');
    return successRes(res, {
      deletedEmployee,
      message: 'Employee deleted successfully',
    });
  });
};

module.exports.updateEmployee_post = (req, res) => {
  const { employeeId } = req.params;
  const { displayName, contactNumber, address } = req.body;

  if (!displayName) return errorRes(res, 400, 'Name is required.');
  else if (!contactNumber)
    return errorRes(res, 400, 'Contact Number is required.');
  else if (!address) return errorRes(res, 400, 'Address is required.');
  else {
    Employee.findByIdAndUpdate(
      employeeId,
      { displayName, contactNumber, address },
      { new: true }
    )
      .then(updatedEmployee => {
        if (!updatedEmployee)
          return errorRes(res, 400, 'Employee does not exist.');
        successRes(res, {
          employee: updatedEmployee,
          message: 'Employee updated.',
        });
      })
      .catch(err => {
        console.log(err);
        return errorRes(res, 500, 'Internal server error.');
      });
  }
};

module.exports.updateDustbin_post = (req, res) => {
  const { dustbin_Id } = req.params;
  const { place, channel } = req.body;

  if (!place) return errorRes(res, 400, 'Place is required.');
  else {
    Dustbin.findByIdAndUpdate(dustbin_Id, { place, channel }, { new: true })
      .then(updatedDustbin => {
        if (!updatedDustbin)
          return errorRes(res, 400, 'Dustbin does not exist.');
        successRes(res, {
          dustbin: updatedDustbin,
          message: 'Dustbin updated.',
        });
      })
      .catch(err => {
        console.log(err);
        return errorRes(res, 500, 'Internal server error.');
      });
  }
};
