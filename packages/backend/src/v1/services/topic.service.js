const _Topic = require('../models/topic.model');

const insert = (title, description, type, lecturerId) => _Topic.create({
  title, description, type, lecturerId,
});
const remove = (id) => _Topic.delete({ _id: id });
module.exports = {
  insert,
  remove,
};
