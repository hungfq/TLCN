const _Comment = require('../models/comment.model');

const createComment = async (message, time, createdBy) => {
  const comment = await _Comment.create({
    message,
    time,
    createdBy,
  });
  return comment;
};
module.exports = {
  createComment,
};
