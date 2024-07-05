import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Flex, Form, Modal, message } from 'antd'
import TeamParticipantsInput from '@src/UI/team/team-participants-input'
import TeamNominationInput from '@src/UI/team/team-nomination-select'

function ParticipantNominationModal({ isOpen, onOk, onCancel }) {
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  const [dataTeamParticipants, setTeamParticipants] = useState([])
  const [dataNominations, setNomination] = useState({})
  const { eventID } = useParams()

  const onFinish = () => {
    message.success('Всё в порядке!')
    setIsLoading(false)
  }

  const onFinishFailed = () => {
    message.error('Проверьте поля для ввода!')
    setIsLoading(false)
  }

  useEffect(() => {
    if (isOpen) {
      fetch(`${API_PATH}/event/event/get_by_id?event_id=${eventID}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
        redirect: 'follow',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) =>
          setNomination(
            data?.event_data?.nominations.map((nomination) => ({
              value: nomination.name,
              label: nomination.name,
            }))
          )
        )
        .catch(() =>
          message.error(
            'Невозможно получить данные. Обратитесь к администратору'
          )
        )

      fetch(`${API_PATH}/participant/participant?offset=0&limit=10`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
        redirect: 'follow',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) =>
          setTeamParticipants(
            data.map((participant) => ({
              value: participant.email,
              label: `${participant.first_name} ${participant.second_name} ${participant.third_name}`,
            }))
          )
        )
        .catch(() =>
          message.error(
            'Невозможно получить данные. Обратитесь к администратору'
          )
        )
        .finally(() => setTimeout(() => setIsLoading(false), 300))
    }
  }, [isOpen, eventID])

  const create_team_request = async () => {
    const myHeaders = new Headers()
    myHeaders.append('accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      name: form.getFieldValue('teamName'),
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      credentials: 'include',
    }
    await fetch(`${API_PATH}/team/teams`, requestOptions)
  }

  return (
    <Modal
      title="Редактирование команды"
      className="event-registration__participant-nomination-modal"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={[]}
    >
      <Form
        form={form}
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <TeamParticipantsInput
          name="teamParticipants"
          options={dataTeamParticipants}
        />
        <TeamNominationInput
          name="nomination_select"
          options={dataNominations}
        />
        <Flex gap="middle">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={() => {
              setIsLoading(true)
              create_team_request()
            }}
          >
            Сохранить
          </Button>
          <Button onClick={onCancel}>Отмена</Button>
        </Flex>
      </Form>
    </Modal>
  )
}

export default ParticipantNominationModal
