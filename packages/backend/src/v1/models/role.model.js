const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  roleTitle: { type: String },
  roleDescription: { type: String },
});

module.exports = mongoose.model('Role', RoleSchema);
