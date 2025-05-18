import { NavLink } from "react-router-dom";
import { ROUTES, Roles } from "@/const";

function MobileAdminPanelNav({ role }) {
  return (
    <nav className="mobile-admin-panel__nav">
      <ul className="mobile-admin-panel__menu-list">
        {(role === Roles.ADMIN ||
          role === Roles.JUDGE ||
          role === Roles.SPECIALIST) && (
          <li className="mobile-admin-panel__item">
            <NavLink
              to={ROUTES.EVENTS.PATH}
              className="mobile-admin-panel__menu-link mobile-admin-panel__menu-link--event"
            />
          </li>
        )}
        {(role === Roles.ADMIN || role === Roles.JUDGE) && (
          <li className="mobile-admin-panel__item">
            <NavLink
              to={ROUTES.JUDGMENT.PATH}
              className="mobile-admin-panel__menu-link mobile-admin-panel__menu-link--judgment"
            />
          </li>
        )}
        {(role === Roles.ADMIN ||
          role === Roles.SPECIALIST ||
          role === Roles.JUDGE) && (
          <li className="mobile-admin-panel__item">
            <NavLink
              to={ROUTES.PARTICIPANTS.PATH}
              className="mobile-admin-panel__menu-link mobile-admin-panel__menu-link--add-participants"
            />
          </li>
        )}
        {role === Roles.ADMIN && (
          <li className="mobile-admin-panel__item">
            <NavLink
              to={ROUTES.USERS_CONTROL.PATH}
              className="mobile-admin-panel__menu-link mobile-admin-panel__menu-link--users"
            />
          </li>
        )}
        {(role === Roles.ADMIN ||
          role === Roles.JUDGE ||
          role === Roles.SPECIALIST) && (
          <li className="mobile-admin-panel__item">
            <NavLink
              to={ROUTES.USER_SETTINGS.PATH}
              className="mobile-admin-panel__menu-link mobile-admin-panel__menu-link--settings"
            />
          </li>
        )}
        {(role === Roles.ADMIN ||
          role === Roles.JUDGE ||
          role === Roles.SPECIALIST) && (
          <li className="mobile-admin-panel__item">
            <NavLink
              to={ROUTES.LOGOUT.PATH}
              className="mobile-admin-panel__menu-link mobile-admin-panel__menu-link--logout"
            />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default MobileAdminPanelNav;
