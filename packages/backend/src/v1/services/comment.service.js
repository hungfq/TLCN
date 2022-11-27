const _Comment = require('../models/comment.model');

const createComment = async (message, createdBy) => {
  const comment = await _Comment.create({
    message,
    createdBy,
  });
  return comment;
};

const deleteMany = async (ids) => {
  await _Comment.deleteMany({ _id: { $in: ids } });
};

module.exports = {
  createComment,
  deleteMany,
};
