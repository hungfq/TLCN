const mongoose = require('mongoose');

const { Schema: { Types: { ObjectId } } } = mongoose;
const PermissionSchema = new mongoose.Schema({
  actor_id: { type: ObjectId },
  resource_id: { type: ObjectId },
  permission: { type: String },

});

module.exports = mongoose.model('Permission', PermissionSchema);
