import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTER_ROUTES } from "@constants";
import AdminPanel from "@components/adminPanel/AdminPanel";
import EventsRegistration from "@components/eventRegistration/EventRegistration";
import EventSettings from "@components/judgment/eventSettings/eventSettings";
import Events from "@components/events/Events";
import UserSettings from "@components/userSettings/UserSettings";
import UsersControl from "@components/usersControl/UsersControl";
import Participants from "@components/participants/Participants";
import NotFound from "@components/notFound/Notfound";
import Auth from "@components/auth/Auth";
import Logout from "@components/logout/Logout";
import Judgment from "@components/judgment/events/JudgmentEvents";
import Unauthorized from "@components/unauthorized/Unauthorized";
import GroupStage from "@components/judgment/groupStage/GroupStage";
import Competencies from "@components/judgment/competencies/Competencies";
import UsersSettingsTest from "@components/userSettings/UserSettingsTest";

function App() {
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
            <Route
              path={ROUTER_ROUTES.USER_SETTINGS_TEST}
              element={<UsersSettingsTest />}
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
              path={ROUTER_ROUTES.JUDGMENT_COMPETENCIES}
              element={<Competencies />}
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
  );
}
export default App;
