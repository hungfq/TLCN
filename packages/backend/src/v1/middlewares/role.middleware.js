exports.permit = (...permittedRoles) => async (request, response, next) => {
  const { user } = request;
  const { role } = user;
  const isRoleExist = permittedRoles.find(
    (x) => x === role,
  );

  if (isRoleExist) {
    next();
  } else {
    response.status(403).json({ message: 'Permission denied' });
  }
};
