const majorService = require('../services/major.service');

const create = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const major = await majorService.create(name, description);
    return res.status(201).send(major);
  } catch (err) {
    return next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const majors = await majorService.list();
    return res.status(200).send(majors);
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name, description,
    } = req.body;
    await majorService.update(id, name, description);
    return res.status(200).send('success');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
  list,
  update,
};
