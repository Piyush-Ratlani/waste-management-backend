const mongoose = require('mongoose');

const DustbinSchema = new mongoose.Schema(
  {
    place: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: Number,
      required: true,
      default: 0,
    },
    channel: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.model('Dustbin', DustbinSchema);
