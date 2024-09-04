import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ROUTER_ROUTES } from "@constants";
import { store } from "@store"
import AdminPanel from "@components/adminPanel/AdminPanel";
import Auth from "@components/auth/Auth";
import EventsRegistration from "@components/eventRegistration/EventRegistration";
import Events from "@components/events/Events";
import Competencies from "@components/judgment/competencies/Competencies";
import EventSettings from "@components/judgment/eventSettings/EventSettings";
import EventInformation from "@components/events/EventInformation";
import Judgment from "@components/judgment/events/JudgmentEvents";
import JudgmentGroupStage from "@components/judgment/groupStage/JudgmentGroupStage";
import TimeMatches from "@components/judgment/timeMatches/TimeMatches";
import Logout from "@components/logout/Logout";
import NotFound from "@components/notFound/Notfound";
import Participants from "@components/participants/Participants";
import Unauthorized from "@components/unauthorized/Unauthorized";
import UserSettings from "@components/userSettings/UserSettings";
import UsersSettingsTest from "@components/userSettings/UserSettingsTest";
import UsersControl from "@components/usersControl/UsersControl";
import UserSupport from "@components/userSupport/UserSupport";
import Feedback from "@components/userSupport/Feedback";
import AboutProgram from "@components/userSupport/AboutProgram";
import { ROUTER_ROUTES } from "@constants";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <UserSupport />
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
            <Route path={ROUTER_ROUTES.FEEDBACK} element={<Feedback />} />
            <Route
              path={ROUTER_ROUTES.ABOUT_PROGRAM}
              element={<AboutProgram />}
            />
            <Route path={ROUTER_ROUTES.EVENTS}>
              <Route index element={<Events />} />
              <Route
                path={ROUTER_ROUTES.EVENTS_DESCRIPTION}
                element={<EventInformation />}
    <Provider store={store}>
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
            </Route>
            <Route path={ROUTER_ROUTES.JUDGMENT}>
              <Route index element={<Judgment />} />
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
              <Route
                path={ROUTER_ROUTES.JUDGMENT_GROUP_STAGE}
                element={<JudgmentGroupStage />}
              />
              <Route
                path={ROUTER_ROUTES.JUDGMENT_TIME_MATCHES}
                element={<TimeMatches />}
              />
              <Route
                path={ROUTER_ROUTES.JUDGMENT_CRITERIA}
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
    </Provider>
  );
}
export default App;
