const roleService = require('../services/role.service');

exports.permit = (...permittedRoles) => async (request, response, next) => {
  const { user } = request;
  const permissions = await roleService.getPermissions(user.roleId);
  const isPermissionExist = permissions.find(
    (x) => x.permissionId.name === permittedRoles[0],
  );

  if (isPermissionExist) {
    next();
  } else {
    response.status(403).json({ message: 'Forbidden' });
  }
};
