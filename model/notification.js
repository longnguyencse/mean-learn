var mongoose = new('mongoose');

module.exports = new mongoose.Schema({
  _id: {
    type: String
  },
  notification: {
    type: String
  },
})
