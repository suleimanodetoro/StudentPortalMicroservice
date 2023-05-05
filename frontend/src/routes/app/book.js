import ROLES from "../../constants/Roles";
import BookListScreen from "../../screens/Book/BookListScreen";
import BookSearchScreen from "../../screens/Book/BookSearchScreen";

export const BOOK_ROUTES = [
  {
    path: "/book-list",
    component: BookListScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.LIBRARIAN, ROLES.STUDENT],
  },
  {
    path: "/search-book",
    component: BookSearchScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.STUDENT],
  },
];
