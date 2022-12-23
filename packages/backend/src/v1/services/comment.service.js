const _Comment = require('../models/comment.model');
const userService = require('./user.service');

const getMultiComment = async (commentIds) => {
  const comments = await _Comment.find({ _id: { $in: commentIds } });
  return comments;
};

const getMultiCommentWithUserInfo = async (commentIds) => {
  const comments = await _Comment.find({ _id: { $in: commentIds } })
    .sort({ createdAt: -1 });
  const result = await Promise.all(
    comments.map(async (comment) => {
      const { createdBy } = comment;
      const createdByFilter = await userService.findOneWithOnlyId(createdBy);
      return { ...comment._doc, createdByFilter };
    }),
  );
  return result;
};

const createComment = async (message, createdBy) => {
  const comment = await _Comment.create({
    message,
    createdBy,
  });
  return comment;
};

const deleteComment = async (commentId) => {
  await _Comment.deleteOne({ _id: commentId });
};

const deleteMany = async (ids) => {
  await _Comment.deleteMany({ _id: { $in: ids } });
};

module.exports = {
  getMultiComment,
  getMultiCommentWithUserInfo,
  createComment,
  deleteComment,
  deleteMany,
};
