const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoleHasPermissionsSchema = new mongoose.Schema({
  roleId: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
  permissionId: {
    type: Schema.Types.ObjectId,
    ref: 'Permission',
  },
});

module.exports = mongoose.model('Role_Has_Permissions', RoleHasPermissionsSchema);
