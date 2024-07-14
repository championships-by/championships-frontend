import { Button, Flex, Typography, Tooltip } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import AdminPanelControls from '@components/admin-panel/admin-panel-controls'
import ParticipantModal from './participant-modal.jsx'
import ParticipantsTable from './participants-table.jsx'
import Loader from '@components/loader/loader'
import './sass/participants.scss'

function Participants() {
  const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
    useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [dataParticipants, setParticipants] = useState([])
  if (isLoading) {
    fetch(`${API_PATH}/participant/participant?offset=0&limit=10`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
      redirect: 'follow',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setParticipants(data))
      .catch(() =>
        message.error('Невозможно получить данные. Обратитесь к администратору')
      )
      .finally(() => setTimeout(() => setIsLoading(false), 300))
  }

  return (
    <>
      <Loader show={isLoading} />
      <Typography.Title level={2}>Управление участниками</Typography.Title>

      <AdminPanelControls>
        <Flex gap="small">
          <Tooltip title="Сохранить список участников">
            <Button type="primary" icon={<DownloadOutlined />} />
          </Tooltip>
          <Button
            type="primary"
            onClick={() => setIsAddParticipantModalOpen(true)}
          >
            Добавить участника
          </Button>
        </Flex>
      </AdminPanelControls>

      <ParticipantsTable ParticipantData={dataParticipants} />

      <ParticipantModal
        isOpen={isAddParticipantModalOpen}
        onOk={() => setIsAddParticipantModalOpen(false)}
        onCancel={() => setIsAddParticipantModalOpen(false)}
      />
    </>
  )
}
export default Participants
