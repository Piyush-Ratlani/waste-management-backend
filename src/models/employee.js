const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    unique: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  displayImage: {
    url: {
      type: String,
      default:
        'https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg',
    },
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
    default: 'employee',
  },
});

mongoose.model('Employee', EmployeeSchema);
