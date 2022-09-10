const index = async (req, res, next) => {
  try {
    const hello = 'Hello World!';
    return res.status(200).send(hello);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  index,
};
