import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import AdminPanel from '@components/admin-panel/admin-panel'
import EventSettings from '@components/event-settings/event-settings'
import Events from '@components/events/events'
import UserSettings from '@components/user-settings/user-settings'
import UsersControl from '@components/users-control/users-control'
import Participants from '@components/participants/participants'
import NotFound from '@components/notfound/notfound'
import Auth from '@components/auth/auth'
import Logout from '@components/logout/logout'
import GroupStage from '@components/judgement/group-stage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/auth" replace />} />
        <Route path="/admin/auth" Component={Auth} />
        <Route path="/admin/logout" Component={Logout} />
        <Route path="/admin" Component={AdminPanel}>
          <Route path=":judgement" Component={GroupStage} />
          <Route path="participants" Component={Participants} />
          <Route path="users" Component={UsersControl} />
          <Route path="settings" Component={UserSettings} />
          <Route path="events" Component={Events} />
          <Route path="events/settings" Component={EventSettings} />
          <Route path="*" Component={NotFound} />
        </Route>
        <Route path="*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
