import { IS_LOGIN, USER_ROLE } from "../constants/APP_INFO";
import ROLES from "../constants/Roles";
import { generateNestedNav } from "../helper/generateSidenavs";

const studentNav = [
  {
    title: "Profile",
    icon: "bi bi-grid",
    link: "/student/self",
  },
  {
    title: "Course",
    icon: "bi bi-grid",
    link: "/course-list",
  },
  {
    title: "Books",
    icon: "bi bi-chevron-down",
    child: [
      {
        title: `Search/ borrow books`,
        link: "/search-book",
      },
      {
        title: `Book List`,
        link: "/book-list",
      },
    ],
  },
  {
    title: "Invoices",
    icon: "bi bi-chevron-down",
    child: [
      {
        title: `Search Invoice`,
        link: "/search-invoice",
      },
      {
        title: `Invoices`,
        link: "/invoice-list",
      },
    ],
  },
  {
    title: "Status",
    icon: "bi bi-grid",
    link: "/is-graduated",
  },
];
const librarianNav = [
  {
    title: "Books",
    icon: "bi bi-grid",
    link: "/book-list",
  },
];

const financeNav = [
  ...generateNestedNav("Course"),
  {
    title: "Invoices",
    icon: "bi bi-grid",
    link: "/invoice-list",
  },
];

function getSidebar() {
  if (IS_LOGIN) {
    if (USER_ROLE === ROLES.STUDENT) {
      return studentNav;
    }
    if (USER_ROLE === ROLES.LIBRARIAN) {
      return librarianNav;
    }
    if (USER_ROLE === ROLES.FINANCE) {
      return financeNav;
    }
  }
  return [];
}

export const adminSidebar = [
  {
    title: "Dashboard",
    icon: "bi bi-grid",
    link: "/",
  },
  ...getSidebar(),
];

export const userSidebar = [
  {
    title: "Dashboard",
    icon: "bi bi-grid",
    link: "/",
  },
];
