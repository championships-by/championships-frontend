import { NavLink } from 'react-router-dom'
import { Tooltip } from 'antd'
import { ROUTES } from '@components/enums'

function AdminPanelNav({ role }) {
  return (
    <nav className="admin-panel__nav">
      <ul className="admin-panel__menu-list">
        {(role === 'admin' || role === 'judge') && (
          <Tooltip title={ROUTES.EVENTS.TITLE}>
            <li>
              <NavLink
                to={ROUTES.EVENTS.PATH}
                className="admin-panel__menu-link admin-panel__menu-link--event"
              />
            </li>
          </Tooltip>
        )}
        {(role === 'admin' || role === 'judge') && (
          <Tooltip title={ROUTES.JUDGMENT.TITLE}>
            <li>
              <NavLink
                to={ROUTES.JUDGMENT.PATH}
                className="admin-panel__menu-link admin-panel__menu-link--judgment"
              />
            </li>
          </Tooltip>
        )}
        {(role === 'admin' || role === 'specialist') && (
          <li>
            <Tooltip title={ROUTES.PARTICIPANTS.TITLE}>
              <NavLink
                to={ROUTES.PARTICIPANTS.PATH}
                className="admin-panel__menu-link admin-panel__menu-link--add-participants"
              />
            </Tooltip>
          </li>
        )}
        {role === 'admin' && (
          <li>
            <Tooltip title={ROUTES.USERS_CONTROL.TITLE}>
              <NavLink
                to={ROUTES.USERS_CONTROL.PATH}
                className="admin-panel__menu-link admin-panel__menu-link--users"
              />
            </Tooltip>
          </li>
        )}
        <li>
          <Tooltip title={ROUTES.USER_SETTINGS.TITLE}>
            <NavLink
              to={ROUTES.USER_SETTINGS.PATH}
              className="admin-panel__menu-link admin-panel__menu-link--settings"
            />
          </Tooltip>
        </li>
      </ul>
      <ul className="admin-panel__menu-list">
        <li>
          <Tooltip title={ROUTES.LOGOUT.TITLE}>
            <NavLink
              to={ROUTES.LOGOUT.PATH}
              className="admin-panel__menu-link admin-panel__menu-link--logout"
            />
          </Tooltip>
        </li>
      </ul>
    </nav>
  )
}

export default AdminPanelNav
