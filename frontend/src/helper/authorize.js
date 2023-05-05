const authorize = (userRole, allowedRoles) => allowedRoles.includes(userRole);
export default authorize;
