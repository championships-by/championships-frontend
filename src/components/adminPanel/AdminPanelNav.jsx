import { NavLink } from "react-router-dom";
import { Tooltip } from "antd";
import { ROUTES } from "@constants";
import { Roles } from "@constants";

function AdminPanelNav({ role }) {
  return (
    <nav className="admin-panel__nav">
      <ul className="admin-panel__menu-list">
        {(role === Roles.ADMIN ||
          role === Roles.JUDGE ||
          role === Roles.SPECIALIST) && (
          <Tooltip placement="right" title={ROUTES.EVENTS.TITLE}>
            <li className="admin-panel__item">
              <NavLink
                to={ROUTES.EVENTS.PATH}
                className="admin-panel__menu-link admin-panel__menu-link--event"
              />
            </li>
          </Tooltip>
        )}
        {(role === Roles.ADMIN || role === Roles.JUDGE) && (
          <Tooltip placement="right" title={ROUTES.JUDGMENT.TITLE}>
            <li className="admin-panel__item">
              <NavLink
                to={ROUTES.JUDGMENT.PATH}
                className="admin-panel__menu-link admin-panel__menu-link--judgment"
              />
            </li>
          </Tooltip>
        )}
        {(role === Roles.ADMIN ||
          role === Roles.SPECIALIST ||
          role === Roles.JUDGE) && (
          <li className="admin-panel__item">
            <Tooltip placement="right" title={ROUTES.PARTICIPANTS.TITLE}>
              <NavLink
                to={ROUTES.PARTICIPANTS.PATH}
                className="admin-panel__menu-link admin-panel__menu-link--add-participants"
              />
            </Tooltip>
          </li>
        )}
        {role === Roles.ADMIN && (
          <li className="admin-panel__item">
            <Tooltip placement="right" title={ROUTES.USERS_CONTROL.TITLE}>
              <NavLink
                to={ROUTES.USERS_CONTROL.PATH}
                className="admin-panel__menu-link admin-panel__menu-link--users"
              />
            </Tooltip>
          </li>
        )}
        {(role === Roles.ADMIN ||
          role === Roles.JUDGE ||
          role === Roles.SPECIALIST) && (
          <li className="admin-panel__item">
            <Tooltip placement="right" title={ROUTES.USER_SETTINGS.TITLE}>
              <NavLink
                to={ROUTES.USER_SETTINGS.PATH}
                className="admin-panel__menu-link admin-panel__menu-link--settings"
              />
            </Tooltip>
          </li>
        )}
      </ul>
      <ul className="admin-panel__menu-list">
        {(role === Roles.ADMIN ||
          role === Roles.JUDGE ||
          role === Roles.SPECIALIST) && (
          <li>
            <Tooltip placement="right" title={ROUTES.LOGOUT.TITLE}>
              <NavLink
                to={ROUTES.LOGOUT.PATH}
                className="admin-panel__menu-link admin-panel__menu-link--logout"
              />
            </Tooltip>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default AdminPanelNav;
