/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link, useLocation } from "react-router-dom";
import { adminSidebar } from "../../routes/sidebarRoutes";
import CopyTranslate from "../common/CopyTranslate";

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <aside id="sidebar" data-testid="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {/* <!-- End Dashboard Nav --> */}
        {adminSidebar.map((nav, index) =>
          nav.child ? (
            <li className="nav-item" key={index}>
              <a
                className="nav-link collapsed"
                data-bs-target={`#${nav.title.replace(/\s/g, "")}-nav`}
                data-bs-toggle="collapse"
                href="#!"
              >
                <i className="bi bi-menu-button-wide"></i>
                <span className="text-capitalize">
                  {<CopyTranslate>{nav.title}</CopyTranslate>}
                </span>
                <i className={`bi bi-chevron-down ms-auto`}></i>
              </a>
              <ul
                id={`${nav.title.replace(/\s/g, "")}-nav`}
                className={`nav-content collapse ${
                  nav.child.map((childNav) => childNav.link).includes(pathname)
                    ? "show"
                    : "hide"
                }`}
                data-bs-parent="#sidebar-nav"
              >
                {nav.child.map((childNav, index) => (
                  <li key={index} onClick={() => childNav?.handleClick()}>
                    <Link to={childNav.link}>
                      <i className="bi bi-circle"></i>
                      <span
                        className={
                          pathname === childNav.link
                            ? "text-primary  text-capitalize"
                            : " text-capitalize"
                        }
                      >
                        <CopyTranslate>{childNav.title}</CopyTranslate>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li className="nav-item" key={index + nav.title}>
              <Link className="nav-link collapsed" to={nav.link}>
                <i className={nav.icon}></i>
                <span className={pathname === nav.link ? "text-primary" : ""}>
                  <CopyTranslate>{nav.title}</CopyTranslate>
                </span>
              </Link>
            </li>
          )
        )}

        {/* <!-- End Components Nav --> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
