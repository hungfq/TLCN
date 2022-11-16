const seeder = require('mongoose-seed');

const roles = [
  { name: 'ADMIN' },
  { name: 'TEACHER' },
  { name: 'STUDENT' },
];

const rolesData = [{
  model: 'Role',
  documents: roles,
}];

// connect mongodb
seeder.connect('mongodb://localhost:27017/db-cnpmm', () => {
  seeder.loadModels([
    '../../models/role.model', // load mongoose model
  ]);
  seeder.clearModels(['Role'], () => {
    seeder.populateModels(rolesData, () => {
      seeder.disconnect();
    });
  });
});
