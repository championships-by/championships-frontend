/* eslint-disable prettier/prettier */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTER_ROUTES } from '@src/components/enums'
import AdminPanel from '@components/admin-panel/admin-panel'
import EventsRegistration from '@components/event-registration/event-registration'
import EventSettings from '@components/judgment/event-settings/event-settings'
import Events from '@components/events/events'
import UserSettings from '@components/user-settings/user-settings'
import UsersControl from '@components/users-control/users-control'
import Participants from '@components/participants/participants'
import NotFound from '@components/notfound/notfound'
import Auth from '@components/auth/auth'
import Logout from '@components/logout/logout'
import Judgment from '@components/judgment/events/judgment-events'
import Unauthorized from '@components/unauthorized/unauthorized'
import GroupStage from '@components/judgment/group-stage/group-stage'
import TimeMatches from '@components/judgment/time-matches/time-matches'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTER_ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path={ROUTER_ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
        <Route path={ROUTER_ROUTES.ROOT}>
          <Route index element={<Auth />} />
          <Route path={ROUTER_ROUTES.LOGOUT} element={<Logout />} />
          <Route path={ROUTER_ROUTES.ADMIN_PANEL} element={<AdminPanel />}>
            <Route
              path={ROUTER_ROUTES.PARTICIPANTS}
              element={<Participants />}
            />
            <Route
              path={ROUTER_ROUTES.USERS_CONTROL}
              element={<UsersControl />}
            />
            <Route
              path={ROUTER_ROUTES.USER_SETTINGS}
              element={<UserSettings />}
            />
            <Route path={ROUTER_ROUTES.EVENTS}>
              <Route index element={<Events />} />
              <Route
                path={ROUTER_ROUTES.EVENT_DESCRIPTION}
                element={<EventSettings />}
              />
              <Route
                path={ROUTER_ROUTES.EVENTS_REGISTRATION}
                element={<EventsRegistration />}
              />
            </Route>
            <Route
              path={ROUTER_ROUTES.JUDGMENT_GROUP_STAGE}
              element={<GroupStage />}
            />
            <Route
              path={ROUTER_ROUTES.JUDGMENT_TIME_MATCHES}
              element={<TimeMatches />}
            />
            <Route path={ROUTER_ROUTES.JUDGMENT}>
              <Route index element={<Judgment />} />
              <Route
                path={ROUTER_ROUTES.JUDGMENT_CREATE}
                element={<EventSettings />}
              />
              <Route
                path={ROUTER_ROUTES.JUDGMENT_EVENT_SETTINGS}
                element={<EventSettings />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
