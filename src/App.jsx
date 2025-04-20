import AdminPanel from "@components/adminPanel/AdminPanel";
import Auth from "@components/auth/Auth";
import FirstAuth from "@components/auth/FirstAuth";
import EventsRegistration from "@components/eventRegistration/EventRegistration";
import EventInformation from "@components/events/EventInformation";
import Events from "@components/events/Events";
import Forbidden from "@components/forbidden/Forbidden";
import Competencies from "@components/judgment/competencies/Competencies";
import Judgment from "@components/judgment/events/JudgmentEvents";
import EventSettings from "@components/judgment/eventSettings/EventSettings";
import JudgmentGroupStage from "@components/judgment/groupStage/JudgmentGroupStage";
import JudgmentPlayOff from "@components/judgment/playOff/JudgmentPlayOff";
import TimeMatches from "@components/judgment/timeMatches/TimeMatches";
import Logout from "@components/logout/Logout";
import NotFound from "@components/notFound/Notfound";
import Participants from "@components/participants/Participants";
import ParticipantInformation from "@components/participants/ParticipantInformation";
import Unauthorized from "@components/unauthorized/Unauthorized";
import UsersControl from "@components/usersControl/UsersControl";
import UserSettings from "@components/userSettings/UserSettings";
import AboutProgram from "@components/userSupport/AboutProgram";
import Feedback from "@components/userSupport/Feedback";
import UserSupport from "@components/userSupport/UserSupport";
import SettingsButton from "@components/settingsButton/SettingsButton";
import SocialLinkButton from "@components/socialLink/SocialLinkButton";
import PasswordReset from "@components/passwordReset/PasswordReset";
import YandexMetrika from "@components/yandexMetrika/YandexMetrika";
import TitleAndMeta from "@components/titleAndMeta/TitleAndMeta";
import CookiesNotification from "@components/cookies/CookiesNotification";
import EmailVerification from "@components/verification/EmailVerification";
import CheckCertificate from "@components/checkCertificate/CheckCertificate";
import { ROUTER_ROUTES, Roles } from "@constants";
import { store } from "@store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const { t } = useTranslation();

  return (
    <Provider store={store}>
      <Helmet>
        <meta property="og:title" content="РЕСУРС" />
        <meta
          property="og:description"
          content={t("COMMON.META_DESCRIPTION")}
        />
        <meta property="og:image" content="./assets/icons/meta_icon.png" />
        <meta property="og:url" content={API_URL} />
      </Helmet>
      <Layout>
        <BrowserRouter>
          <TitleAndMeta />
          <UserSupport />
          <SettingsButton />
          <SocialLinkButton />
          <Routes>
            <Route path={ROUTER_ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route
              path={ROUTER_ROUTES.UNAUTHORIZED}
              element={<Unauthorized />}
            />
            <Route path={ROUTER_ROUTES.FORBIDDEN} element={<Forbidden />} />
            <Route
              path={ROUTER_ROUTES.RESET_PASSWORD}
              element={<PasswordReset />}
            />
            <Route
              path={ROUTER_ROUTES.FIRST_AUTHORIZATION}
              element={<FirstAuth />}
            />
            <Route
              path={ROUTER_ROUTES.EMAIL_VERIFICATION}
              element={<EmailVerification />}
            />
            <Route path={ROUTER_ROUTES.ROOT}>
              <Route index element={<Auth />} />
              <Route path={ROUTER_ROUTES.LOGOUT} element={<Logout />} />
              <Route path={ROUTER_ROUTES.ADMIN_PANEL} element={<AdminPanel />}>
                <Route path={ROUTER_ROUTES.PARTICIPANTS}>
                  <Route
                    index
                    element={
                      <ProtectedRoute
                        allowedRoles={[
                          Roles.ADMIN,
                          Roles.JUDGE,
                          Roles.SPECIALIST,
                        ]}
                      >
                        <Participants />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTER_ROUTES.PARTICIPANT_INFORMATION}
                    element={<ParticipantInformation />}
                  />
                </Route>
                <Route
                  path={ROUTER_ROUTES.USERS_CONTROL}
                  element={
                    <ProtectedRoute allowedRoles={[Roles.ADMIN]}>
                      <UsersControl />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={ROUTER_ROUTES.USER_SETTINGS}
                  element={
                    <ProtectedRoute
                      allowedRoles={[
                        Roles.ADMIN,
                        Roles.JUDGE,
                        Roles.SPECIALIST,
                      ]}
                    >
                      <UserSettings />
                    </ProtectedRoute>
                  }
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
                  />
                  <Route
                    path={ROUTER_ROUTES.EVENTS_REGISTRATION}
                    element={
                      <ProtectedRoute
                        allowedRoles={[
                          Roles.ADMIN,
                          Roles.JUDGE,
                          Roles.SPECIALIST,
                        ]}
                      >
                        <EventsRegistration />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTER_ROUTES.EVENTS_CHECK_CERTIFICATE}
                    element={<CheckCertificate />}
                  />
                </Route>
                <Route path={ROUTER_ROUTES.JUDGMENT}>
                  <Route
                    index
                    element={
                      <ProtectedRoute allowedRoles={[Roles.ADMIN, Roles.JUDGE]}>
                        <Judgment />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTER_ROUTES.JUDGMENT_CREATE}
                    element={
                      <ProtectedRoute allowedRoles={[Roles.ADMIN, Roles.JUDGE]}>
                        <EventSettings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTER_ROUTES.JUDGMENT_EVENT_SETTINGS}
                    element={
                      <ProtectedRoute allowedRoles={[Roles.ADMIN, Roles.JUDGE]}>
                        <EventSettings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path={ROUTER_ROUTES.JUDGMENT_GROUP_STAGE}
                    element={<JudgmentGroupStage />}
                  />
                  <Route
                    path={ROUTER_ROUTES.JUDGMENT_PLAYOFF_STAGE}
                    element={<JudgmentPlayOff />}
                  />
                  <Route
                    path={ROUTER_ROUTES.JUDGMENT_TIME_MATCHES}
                    element={<TimeMatches />}
                  />
                  <Route
                    path={ROUTER_ROUTES.JUDGMENT_CRITERIA}
                    element={<Competencies />}
                  />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Layout>
      <YandexMetrika />
      <CookiesNotification />
    </Provider>
  );
}
export default App;
