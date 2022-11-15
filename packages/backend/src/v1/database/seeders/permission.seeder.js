const seeder = require('mongoose-seed');

const permissions = [
  { name: 'topic.search' },
  { name: 'topic.create' },
  { name: 'topic.view' },
  { name: 'topic.list' },
  { name: 'topic.update' },
  { name: 'topic.delete ' },
  { name: 'permission.list' },
  { name: 'registration.list' },
  { name: 'registration.create' },
  { name: 'registration.update' },
  { name: 'registration.delete' },
  { name: 'register.view' },
  { name: 'register.create' },
  { name: 'register.delete' },
  { name: 'role.list' },
  { name: 'role.view' },
  { name: 'role.sync' },
  { name: 'user.list' },
  { name: 'user.view' },
  { name: 'user.update' },
  { name: 'profile.view' },
  { name: 'profile.edit' },
  { name: 'major.list' },
  { name: 'major.create' },
  { name: 'major.update' },
];

const permissionsData = [{
  model: 'Permission',
  documents: permissions,
}];

// connect mongodb
seeder.connect('mongodb://localhost:27017/db-cnpmm-test', () => {
  seeder.loadModels([
    '../../models/permission.model', // load mongoose model
  ]);
  seeder.clearModels(['Permission'], () => {
    seeder.populateModels(permissionsData, () => {
      seeder.disconnect();
    });
  });
});
