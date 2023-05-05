import ROLES from "./Roles";

export const IS_LOGIN = JSON.parse(localStorage.getItem("authInfo")) ?? false;
export const USER_INFO = JSON.parse(localStorage.getItem("userInfo"));

export const IS_ADMIN = USER_INFO?.auth
  ?.map((e) => e.authority)
  .includes(ROLES.ADMIN);

export const USER_ROLE = USER_INFO?.auth?.map((e) => e.authority)[0];

export const NEW_DATE_IN_ARRAY = new Date()
  .toISOString()
  .split("T")[0]
  .split("-")
  .map((e) => Number(e));
