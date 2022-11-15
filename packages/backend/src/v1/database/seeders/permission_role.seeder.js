/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const seeder = require('mongoose-seed');
const async = require('async');

const _Role = require('../../models/role.model');
const _Permission = require('../../models/permission.model');

new Promise((resolve) => {
  mongoose.connect(
    'mongodb://localhost:27017/db-cnpmm-test',
    { promiseLibrary: require('bluebird') },
  );
  async.parallel(
    [
      (callback) => {
        _Role.find({}, { _id: 0 })
          .exec((err, _id) => {
            callback(null, _id);
          });
      },
      (callback) => {
        _Permission.find({})
          .exec((err, _id) => {
            callback(null, _id);
          });
      },
    ],
    (err, results) => {
      resolve(results);
      mongoose.connection.close();
    },
  );
}).then((results) => new Promise((resolve) => {
  const items = [];
  for (const role of results[0]) {
    for (const permission of results[1]) {
      items.push({
        roleId: role._id,
        permissionId: permission._id,
      });
    }
  }
  resolve(items);
})).then((items) => {
  seeder.connect('mongodb://localhost:27017/db-cnpmm-test', () => {
    const data = [{
      model: 'Role_Has_Permissions',
      documents: items,
    }];
    seeder.loadModels([
      '../../models/role_has_permissions.model',
    ]);
    seeder.clearModels(['Role_Has_Permissions'], () => {
      seeder.populateModels(data, () => {
        seeder.disconnect();
      });
    });
  });
});
