/* eslint-disable prefer-const */
/* eslint-disable max-len */
const topicService = require('../services/topic.service');
const userService = require('../services/user.service');
const notificationService = require('../services/notification.service');
const scheduleService = require('../services/schedule.service');
const fileUtils = require('../utils/file');
const _TopicProposal = require('../models/topic_proposal.model');
const _Schedule = require('../models/schedule.model');
const _Topic = require('../models/topic.model');

const importTopics = async (req, res) => {
  try {
    const jsonData = fileUtils.excelToJson(req.file.path);

    jsonData.forEach(async (topic) => {
      const lecturer = await userService.findOneByCode('LECTURER', topic.LECTURER_CODE);
      const critical = await userService.findOneByCode('LECTURER', topic.CRITICAL_CODE);
      const schedule = await scheduleService.findOneByCode(topic.SCHEDULE);
      await topicService.upsertOne(
        topic.CODE,
        topic.TITLE,
        topic.DESCRIPTION,
        topic.LIMIT,
        topic.THESIS_DEFENSE_DATE ? Date.parse(topic.THESIS_DEFENSE_DATE) : null,
        lecturer ? lecturer._id : undefined,
        schedule ? schedule._id : undefined,
        critical ? critical._id : undefined,
      );
    });

    return res.status(201).send('Successfully');
  } catch (err) {
    return res.status(400).send('Error');
    // return next(err);
  }
};
const insertTopic = async (req, res, next) => {
  try {
    const value = req.body;
    if (!value.title) {
      return res.status(422).send('Title is required');
    }
    if (!value.description) {
      return res.status(422).send('Description is required');
    }
    if (!value.lecturerId) {
      value.lecturerId = null;
    }
    if (!value.scheduleId) {
      value.scheduleId = null;
    }
    const topic = await topicService.createOne(value);
    return res.status(201).send(topic);
  } catch (err) {
    return next(err);
  }
};

const findOneTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topic = await topicService.findOne(id);
    if (!topic) {
      return res.status(404).send('Not found');
    }
    // const { students } = topic;
    // const studentList = await userService.getStudentByCodes(students);
    // topic.students = studentList;
    return res.status(200).send(topic);
  } catch (err) {
    return next(err);
  }
};

const updateOneTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = req.body;
    if (!value.title) {
      return res.status(422).send('Title is required');
    }
    if (!value.description) {
      return res.status(422).send('Description is required');
    }
    if (!value.lecturerId) {
      value.lecturerId = null;
    }
    if (!value.scheduleId) {
      value.scheduleId = null;
    }
    delete value.id;
    const topic = await topicService.findOne(id);
    if (!topic) {
      return res.status(404).send('Not found');
    }
    await topicService.updateOne(id, value);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const deleteOneTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    await topicService.removeOne(id);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const listTopic = async (req, res, next) => {
  try {
    const { lecturerId, scheduleId } = req.query;
    const topics = await topicService.list(lecturerId, scheduleId);
    return res.status(200).send(topics);
  } catch (err) {
    return next(err);
  }
};

const updateTopicStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { students } = req.body;
    const topic = await topicService.findOne(id);
    if (!topic) {
      return res.status(404).send('Not found');
    }
    await topicService.updateStudents(id, students);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const updateTopicLecturer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { lecturerId } = req.body;
    const topic = await topicService.findOne(id);
    if (!topic) {
      return res.status(404).send('Not found');
    }
    await topicService.updateLecturer(id, lecturerId);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const getTopicMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await topicService.getTopicMember(id);
    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
};

const getTopicStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await topicService.getTopicStudent(id);
    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
};

const addProposalTopic = async (req, res, next) => {
  try {
    let {
      title, description, lecturerId, limit, students, scheduleId,
    } = req.body;

    if (!title) return res.status(400).send('Not valid title');
    if (!description) description = '';
    if (!lecturerId) return res.status(400).send('Not valid lecturerId');
    // const lecturer = await _Lecturer.findById(lecturerId);
    // if (!lecturer) return res.status(400).send('Not valid lecturerId');
    if (!limit) limit = 0;
    if (!scheduleId) scheduleId = '';
    if (!students) students = [];
    const createdBy = req.user._id;

    const value = {
      title, description, lecturerId, limit, students, createdBy, scheduleId,
    };

    if (!value.createdBy) {
      delete value.createdBy;
    }

    const topic = await _TopicProposal.create(value);
    if (lecturerId) {
      const notification = await notificationService.addNotification(
        'ĐỀ XUẤT ĐỀ TÀI',
        'Bạn được yêu cầu hướng dẫn trong một đề tài',
        req.user._id,
        [lecturerId],
      );

      await notificationService.sendNotification(lecturerId, notification);
    }
    return res.status(201).send(topic);
  } catch (err) {
    return next(err);
  }
};

const approveProposalTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = req.body;
    delete value.id;

    const topicProposal = await topicService.findOneProposalTopic(id);
    await topicService.createOne(value);

    await topicService.deleteOneProposalTopic(id);

    if (topicProposal.createdBy) {
      const notification = await notificationService.addNotification(
        'ĐỀ XUẤT ĐỀ TÀI',
        `Đề tài ${topicProposal.title} đã được chấp thuận.`,
        req.user._id,
        [topicProposal.createdBy],
      );

      await notificationService.sendNotification(topicProposal.createdBy, notification);
    }

    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const removeProposalTopic = async (req, res, next) => {
  try {
    const { id } = req.params;

    const topic = await topicService.findOneProposalTopic(id);
    if (!topic) {
      return res.status(404).send('Not found');
    }
    await topicService.deleteOneProposalTopic(id);
    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};
const declineProposalTopic = async (req, res, next) => {
  try {
    const { id } = req.params;

    const topic = await topicService.findOneProposalTopic(id);
    if (!topic) {
      return res.status(404).send('Not found');
    }

    if (topic.createdBy) {
      const notification = await notificationService.addNotification(
        'ĐỀ XUẤT ĐỀ TÀI',
        `Đề tài ${topic.title} bị từ chối!`,
        req.user._id,
        [topic.createdBy],
      );

      await notificationService.sendNotification(topic.createdBy, notification);
    }

    await topicService.deleteOneProposalTopic(id);

    return res.status(200).send('Successfully');
  } catch (err) {
    return next(err);
  }
};

const listProposalTopic = async (req, res, next) => {
  try {
    const topic = await topicService.listProposalTopic();
    return res.status(200).send(topic);
  } catch (err) {
    return next(err);
  }
};

const listTopicReviewByLecturer = async (req, res, next) => {
  try {
    const lecturerId = req.user._id;
    const { scheduleId } = req.query;
    let listTopics = [];
    if (scheduleId) {
      listTopics = await _TopicProposal.find({ lecturerId, scheduleId });
    } else {
      listTopics = await _TopicProposal.find({ lecturerId });
    }
    return res.status(200).send(listTopics);
  } catch (err) {
    return next(err);
  }
};

const listTopicReviewByAdmin = async (req, res, next) => {
  try {
    // TODO: need to refactor function isAuth in middleware
    // const lecturer = await _Lecturer.findById(lecturerId);
    // if (!lecturer) return res.status(401).send('Access Denied');
    const listTopics = await _TopicProposal.find({ status: 'ADMIN' });
    return res.status(200).send(listTopics);
  } catch (err) {
    return next(err);
  }
};

const listTopicProposalByCreatedId = async (req, res, next) => {
  try {
    const createdBy = req.user._id;
    const { scheduleId } = req.query;
    const listTopics = await _TopicProposal.find({ createdBy, scheduleId }).populate({ path: 'lecturerId', select: 'name _id' });
    return res.status(200).send(listTopics);
  } catch (err) {
    return next(err);
  }
};

const updateProposalByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    let {
      // eslint-disable-next-line prefer-const
      title, description, lecturerId, limit, students, scheduleId,
    } = req.body;
    const proposal = await _TopicProposal.findById(id);
    // TODO: Only the admin and created users update proposal
    if (!proposal) return res.status(404).send('Not found');

    await _TopicProposal.updateOne({ _id: id }, {
      title, description, lecturerId, limit, students, scheduleId,
    });
    return res.status(200).send(
      'Successfully updated proposal',
    );
  } catch (err) {
    return next(err);
  }
};

const approveProposalByLecturer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const proposal = await _TopicProposal.findById(id);
    // TODO: Only the admin and created users update proposal
    if (!proposal) return res.status(404).send('Not found');
    const {
      title, description, lecturerId, limit, students, scheduleId,
    } = proposal;
    await topicService.createOne({
      title, description, lecturerId, limit, students, scheduleId,
    });
    await _TopicProposal.deleteOne({ _id: id });

    if (proposal.createdBy) {
      const notification = await notificationService.addNotification(
        'ĐỀ XUẤT ĐỀ TÀI',
        `Đề tài ${proposal.title} đã được chấp thuận`,
        req.user._id,
        [proposal.createdBy],
      );

      await notificationService.sendNotification(proposal.createdBy, notification);
    }
    return res.status(200).send(
      'Successfully updated proposal',
    );
  } catch (err) {
    return next(err);
  }
};

const getListTopicAcceptRegister = async (req, res, next) => {
  try {
    const { code } = req.user;
    // console.log('🚀 ~ file: topic.controller.js:299 ~ getListTopicAcceptRegister ~ code', code);
    let listCodeTopic = [];
    const listSchedule = await _Schedule.find({
      startDate: {
        $lt: Date.now(),
      },
      endDate: {
        $gte: Date.now(),
      },
      students: {
        $in: [code],
      },
    });
    listSchedule.forEach((s) => {
      if (s.topics.length > 1) listCodeTopic.push(...s.topics);
      else listCodeTopic.push(s.topics);
    });
    const setSchedule = new Set(listCodeTopic);
    listCodeTopic = [...setSchedule];
    const listTopicAcceptRegisters = await _Topic.find({
      code: {
        $in: listCodeTopic,
      },
    });
    return res.status(200).send(listTopicAcceptRegisters);
  } catch (e) {
    return next(e);
  }
};

const addNewRegisterTopicStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code } = req.user;
    const topicOld = await _Topic.findById(id);
    const isRegister = await _Topic.findOne({
      students: {
        $in: [code],
      },
    });
    if (!topicOld) return res.status(404).send('Topic not found');
    if (isRegister) return res.status(400).send('Register is exist');
    if (topicOld.students.length >= topicOld.limit) return res.status(422).send('The register is out of limit');
    const oldStudent = topicOld.students;
    topicOld.students = [...oldStudent, code];
    await topicOld.save();
    const notification = await notificationService.addNotification(
      'ĐĂNG KÝ ĐỀ TÀI',
      `Có đăng ký mới trong đề tài: ${topicOld.code}`,
      req.user._id,
      null,
    );
    if (topicOld.lecturerId) {
      await notificationService.sendNotification(topicOld.lecturerId._id, notification);
    }
    return res.status(200).send('Register success');
  } catch (err) {
    return next(err);
  }
};
const addNewRegisterTopicStudentNew = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code } = req.user;
    const topicOld = await _Topic.findById(id);
    if (!topicOld) return res.status(404).send('Topic not found');
    const isRegister = await _Topic.findOne({
      students: {
        $in: [code],
      },
      scheduleId: {
        $in: [topicOld.scheduleId],
      },
    });
    if (isRegister) return res.status(400).send('Register is exist');
    if (topicOld.students.length >= topicOld.limit) return res.status(422).send('The register is out of limit');
    const oldStudent = topicOld.students;
    topicOld.students = [...oldStudent, code];
    await topicOld.save();
    const notification = await notificationService.addNotification(
      'ĐĂNG KÝ ĐỀ TÀI',
      `Có đăng ký mới trong đề tài: ${topicOld.code}`,
      req.user._id,
      null,
    );
    if (topicOld.lecturerId) {
      await notificationService.sendNotification(topicOld.lecturerId._id, notification);
    }
    return res.status(200).send('Register success');
  } catch (err) {
    return next(err);
  }
};
const removeRegisterTopicStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code } = req.user;
    const topicOld = await _Topic.findById(id);
    if (!topicOld) return res.status(404).send('Topic not found');
    const oldStudent = topicOld.students.filter((s) => s !== code);
    topicOld.students = [...oldStudent];
    await topicOld.save();
    const notification = await notificationService.addNotification(
      'ĐĂNG KÝ ĐỀ TÀI',
      `Hủy đăng ký mới trong đề tài: ${topicOld.code}`,
      req.user._id,
      null,
    );
    if (topicOld.lecturerId) {
      await notificationService.sendNotification(topicOld.lecturerId._id, notification);
    }
    return res.status(200).send('Remove success');
  } catch (err) {
    return next(err);
  }
};

const getResultRegister = async (req, res, next) => {
  try {
    const { code } = req.user;
    const topic = await _Topic.find({
      students: {
        $in: [code],
      },
    })
      .populate({ path: 'lecturerId', select: 'name _id' })
      .populate({ path: 'criticalLecturerId', select: 'name _id' })
      .populate({ path: 'scheduleId', select: 'name code _id' });
    return res.status(200).send(topic);
  } catch (err) {
    return next(err);
  }
};
const listTopicAdvisorApprove = async (req, res, next) => {
  try {
    const lecturerId = req.user._id;
    const topic = await _Topic.find({
      lecturerId,
      advisorLecturerApprove: false,
    }).populate({ path: 'lecturerId', select: 'name _id' })
      .populate({ path: 'criticalLecturerId', select: 'name _id' })
      .populate({ path: 'scheduleId' });
    return res.status(200).send(topic);
  } catch (err) {
    return next(err);
  }
};

const notifyToAdminIfBothApproved = async (id) => {
  const topic = await _Topic.findById(id);
  if (topic.advisorLecturerApprove && topic.criticalLecturerApprove) {
    const listAdmin = await userService.getAllAdmin();
    const listAdminIds = listAdmin.map((s) => s._id);
    const notification = await notificationService.addNotification(
      'DUYỆT HỘI ĐỒNG',
      `Đề tài ${topic.code} đã được giảng viên hướng dẫn và giảng viên phản biện duyệt.`,
      null,
      listAdminIds,
    );
    listAdminIds.forEach(async (t) => {
      await notificationService.sendNotification(t, notification);
    });
  }
};

const topicAdvisorApprove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topic = await _Topic.findById(id);
    topic.advisorLecturerApprove = true;
    topic.save();

    const { students, criticalLecturerId } = topic;
    const listStudents = await userService.getStudentByCodes(students);
    const listStudentIds = listStudents.map((s) => s._id);
    const notificationTo = [...listStudentIds, criticalLecturerId];
    const notification = await notificationService.addNotification(
      'DUYỆT HỘI ĐỒNG',
      `Đề tài ${topic.code} đã được giảng viên hướng dẫn duyệt.`,
      req.user._id,
      notificationTo,
    );
    notificationTo.forEach(async (t) => {
      await notificationService.sendNotification(t, notification);
    });

    notifyToAdminIfBothApproved(id);

    return res.status(200).send(topic);
  } catch (err) {
    return next(err);
  }
};
const topicCriticalApprove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const topic = await _Topic.findById(id);
    topic.criticalLecturerApprove = true;
    topic.save();
    const { students, lecturerId } = topic;
    const listStudents = await userService.getStudentByCodes(students);
    const listStudentIds = listStudents.map((s) => s._id);
    const notificationTo = [...listStudentIds, lecturerId];
    const notification = await notificationService.addNotification(
      'DUYỆT HỘI ĐỒNG',
      `Đề tài ${topic.code} đã được giảng viên phản biện duyệt.`,
      req.user._id,
      notificationTo,
    );
    notificationTo.forEach(async (t) => {
      await notificationService.sendNotification(t, notification);
    });
    notifyToAdminIfBothApproved(id);

    return res.status(200).send(topic);
  } catch (err) {
    return next(err);
  }
};
const listTopicCriticalApprove = async (req, res, next) => {
  try {
    const criticalLecturerId = req.user._id;
    const topic = await _Topic.find({
      criticalLecturerId,
      criticalLecturerApprove: false,
    }).populate({ path: 'lecturerId', select: 'name _id' })
      .populate({ path: 'criticalLecturerId', select: 'name _id' })
      .populate({ path: 'scheduleId' });
    return res.status(200).send(topic);
  } catch (err) {
    return next(err);
  }
};
const listTopicCommitteeApprove = async (req, res, next) => {
  try {
    const criticalLecturerId = req.params.id;
    const topic = await _Topic.find({
      advisorLecturerApprove: true,
      criticalLecturerApprove: true,
      criticalLecturerId,
    }).populate({ path: 'lecturerId', select: 'name _id' })
      .populate({ path: 'criticalLecturerId', select: 'name _id' })
      .populate({ path: 'scheduleId' });

    return res.status(200).send(topic);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  importTopics,
  insertTopic,
  findOneTopic,
  listTopic,
  updateOneTopic,
  deleteOneTopic,
  updateTopicStudent,
  updateTopicLecturer,
  getResultRegister,

  getTopicMember,
  getTopicStudent,
  addProposalTopic,
  approveProposalTopic,
  removeProposalTopic,
  declineProposalTopic,
  listProposalTopic,
  listTopicReviewByLecturer,
  listTopicProposalByCreatedId,
  updateProposalByUser,
  approveProposalByLecturer,
  listTopicReviewByAdmin,
  getListTopicAcceptRegister,
  addNewRegisterTopicStudent,
  removeRegisterTopicStudent,
  addNewRegisterTopicStudentNew,
  listTopicAdvisorApprove,
  listTopicCriticalApprove,
  topicAdvisorApprove,
  topicCriticalApprove,
  listTopicCommitteeApprove,
};
