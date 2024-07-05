import AdminPanelLogo from './admin-panel-logo.jsx'
import AdminPanelNav from './admin-panel-nav.jsx'
import './sass/admin-panel.scss'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import { Outlet, useNavigate, Navigate } from 'react-router-dom'
import { RESPONSE_STATUS } from '@components/enums'

function AdminPanel() {
  const [isLoading, setIsLoading] = useState(true)
  const [role, setRole] = useState('unauthorized')
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoading) {
      fetch(`${API_PATH}/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        credentials: 'include',
      })
        .then((response) => {
          if (response.status === RESPONSE_STATUS.STATUS_OK) {
            return response.json()
          } else if (response.status === RESPONSE_STATUS.STATUS_UNAUTHORIZED) {
            navigate('/401', { replace: true })
          } else {
            throw new Error(`Error ${response.status}`)
          }
        })
        .then((user) => {
          setRole(user.role)
          setIsLoading(false)
        })
        .catch(() => {
          message.error(
            'Невозможно получить данные. Обратитесь к администратору'
          )
        })
    }
  })

  return (
    <>
      <div className="admin-panel">
        <div className="admin-panel__menu">
          <AdminPanelLogo />
          <AdminPanelNav role={role} />
        </div>
        <div className="admin-panel__content">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AdminPanel
