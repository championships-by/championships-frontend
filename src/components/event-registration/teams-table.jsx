import { Table, Flex, List, Button, Typography } from 'antd'
import { useState } from 'react'
import {
  EditOutlined,
  DeleteOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import TeamEditModal from '@components/event-registration/team-edit-modal'
import ParticipantNominationModal from '@components/event-registration/participant-nomination-modal'
import TeamDeleteModal from '@components/event-registration/team-delete-modal'

function TeamsTable({ TeamsData }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false)

  const openEditModal = () => {
    setIsEditModalOpen(true)
  }

  const changeTeamData = () => {
    setIsEditModalOpen(false)
  }

  const openParticipantModal = () => {
    setIsParticipantModalOpen(true)
  }

  const changeParticipantData = () => {
    setIsParticipantModalOpen(false)
  }

  const columns = [
    {
      title: 'Команда',
      key: 'nameTeam',
      width: '15%',
      dataIndex: 'name',
    },
    {
      title: 'Компетенция - участники ',
      key: 'nomination_particioant',
      width: '75%',
      children: [
        {
          title: 'Компетенции',
          key: 'nomination',
          width: '25%',
          dataIndex: 'nomination',
        },
        {
          title: 'Cтатус участника',
          children: [
            {
              title: 'Участники',
              key: 'participants',
              width: '40%',
              render: (_, { participants }) => (
                <List
                  locale={{
                    emptyText: 'Участники пока отсутствуют',
                  }}
                  split={false}
                  dataSource={participants}
                  renderItem={(item) => (
                    <List.Item>
                      <Typography.Text>{`${item.second_name} ${item.first_name} ${item.third_name}`}</Typography.Text>
                    </List.Item>
                  )}
                />
              ),
            },
            {
              title: 'Статус',
              key: 'Status',
              width: '10%',
              dataIndex: 'Status',
            },
          ],
        },
      ],
    },
    {
      title: 'Действия',
      width: '10%',
      key: 'action',
      fixed: 'right',
      render: () => (
        <Flex>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => openEditModal()}
          ></Button>
          <Button
            type="text"
            icon={<UsergroupAddOutlined />}
            onClick={openParticipantModal()}
          ></Button>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => TeamDeleteModal}
          ></Button>
        </Flex>
      ),
    },
  ]

  return (
    <>
      <Table dataSource={TeamsData} columns={columns} bordered />

      <TeamEditModal
        isOpen={isEditModalOpen}
        onOk={() => changeTeamData()}
        onCancel={() => setIsEditModalOpen(false)}
      />
      {/* <ParticipantNominationModal
        isOpen={isParticipantModalOpen}
        onOk={() => changeParticipantData()}
        onCancel={() => setIsParticipantModalOpen(false)}
      /> */}
    </>
  )
}

export default TeamsTable
