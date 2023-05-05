import ROLES from "../../constants/Roles";
import CourseListScreen from "../../screens/Course/CourseListScreen";
import CreateCourseScreen from "../../screens/Course/CreateCourseScreen";
import EditCourseScreen from "../../screens/Course/EditCourseScreen";

export const COURSE_ROUTES = [
  {
    path: "/course-list",
    component: CourseListScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.FINANCE, ROLES.STUDENT],
  },
  {
    path: "/add-course",
    component: CreateCourseScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.FINANCE],
  },
  {
    path: "/edit-course/:id",
    component: EditCourseScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.FINANCE],
  },
];
