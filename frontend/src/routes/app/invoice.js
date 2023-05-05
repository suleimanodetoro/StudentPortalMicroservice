import ROLES from "../../constants/Roles";
import InvoiceListScreen from "../../screens/Invoice/InvoiceListScreen";
import InvoiceSearchScreen from "../../screens/Invoice/InvoiceSearchScreen";

export const INVOICE_ROUTES = [
  {
    path: "/invoice-list",
    component: InvoiceListScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.FINANCE, ROLES.STUDENT],
  },
  {
    path: "/search-invoice",
    component: InvoiceSearchScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.STUDENT],
  },
];
