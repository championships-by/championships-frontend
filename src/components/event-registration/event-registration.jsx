import { Button, Typography, message, Breadcrumb } from 'antd'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TeamCreateModal from '@components/event-registration/team-create-modal'
import TeamsTable from '@components/event-registration/teams-table'
import Loader from '@components/loader/loader'
import AdminPanelControls from '@components/admin-panel/admin-panel-controls'
import './sass/event-registration.scss'

function EventsRegistration() {
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [dataTeams, setTeams] = useState([])
  const [dataEvent, setEvent] = useState({})
  const { eventID } = useParams()

  useEffect(() => {
    if (isLoading) {
      fetch(`${API_PATH}/event/event/get_by_id?event_id=${eventID}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
        redirect: 'follow',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => setEvent(data))
        .catch(() =>
          message.error(
            'Невозможно получить данные. Обратитесь к администратору'
          )
        )

      fetch(`${API_PATH}/team/teams?offset=0&limit=49`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
        redirect: 'follow',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => setTeams(data))
        .catch(() =>
          message.error(
            'Невозможно получить данные. Обратитесь к администратору'
          )
        )
        .finally(() => setTimeout(() => setIsLoading(false), 300))
    }
  }, [isLoading, eventID])

  return (
    <>
      <Loader show={isLoading} />
      <Typography.Title level={2}>Регистрация участников</Typography.Title>
      <Breadcrumb
        items={[
          {
            title: 'Мероприятия',
          },
          {
            title: dataEvent?.event_data?.name ?? '',
          },
          {
            title: 'Регистрация участников',
          },
        ]}
      />
      <AdminPanelControls>
        <Button type="primary" onClick={() => setIsAddTeamModalOpen(true)}>
          Добавить команду
        </Button>
      </AdminPanelControls>

      <TeamsTable TeamsData={dataTeams} />

      <TeamCreateModal
        isOpen={isAddTeamModalOpen}
        onOk={() => setIsAddTeamModalOpen(false)}
        onCancel={() => setIsAddTeamModalOpen(false)}
      />
    </>
  )
}

export default EventsRegistration
