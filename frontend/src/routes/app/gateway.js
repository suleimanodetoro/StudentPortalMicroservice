import ROLES from "../../constants/Roles";
import DashboardScreen from "../../screens/DashboardScreen";
import IsGraduatedScreen from "../../screens/IsGraduatedScreen";
import LoginScreen from "../../screens/LoginScreen";
import NotFoundScreen from "../../screens/NotFoundScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import StudentScreen from "../../screens/Student/StudentScreen";
import Testing from "../../Testing";
import { BOOK_ROUTES } from "./book";
import { COURSE_ROUTES } from "./course";
import { INVOICE_ROUTES } from "./invoice";

const ROUTES = [
  {
    path: "/login",
    component: LoginScreen,
    isPublic: true,
    isProtected: false,
  },

  {
    path: "/register",
    component: RegisterScreen,
    isPublic: true,
    isProtected: false,
  },
  {
    path: "/",
    component: DashboardScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.FINANCE, ROLES.LIBRARIAN, ROLES.STUDENT],
  },
  {
    path: "/testing",
    component: Testing,
    isPublic: false,
    isProtected: true,
    allowedRoles: Object.values(ROLES),
  },
  {
    path: "/is-graduated",
    component: IsGraduatedScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.STUDENT],
  },

  {
    path: "/student/:id",
    component: StudentScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.STUDENT],
  },

  ...COURSE_ROUTES,
  ...INVOICE_ROUTES,
  ...BOOK_ROUTES,
  { path: "*", component: NotFoundScreen, isPublic: true, isProtected: false },
];

export default ROUTES;
