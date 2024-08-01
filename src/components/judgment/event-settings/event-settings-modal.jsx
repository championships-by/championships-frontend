import React from 'react'
import { useState } from 'react'
import { Button, Flex, Form, Modal, message } from 'antd'
import Competition from '../../../UI/judgment/events/competition-name'
import ReglamentName from '@src/UI/judgment/events/reglament-name'
import CompetitionJudge from '@src/UI/judgment/events/competition-judge-name'
import CompetitionType from '../../../UI/judgment/events/competition-type'

function EventSettingsCompitations({ isOpen, onOk, onCancel }) {
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = () => {
    message.success('Всё в порядке!')
    setIsLoading(false)
  }

  const onFinishFailed = () => {
    message.error('Проверьте поля для ввода!')
    setIsLoading(false)
  }

  return (
    <Modal
      title="Добавить компетенцию"
      className="event-settings__modal"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={[]}
      width={800}
    >
      <Form
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Competition name="CompitationName" />
        <ReglamentName/>
        <CompetitionJudge/>
        <CompetitionType/>

        <Flex gap="middle">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={() => setIsLoading(true)}
          >
            Сохранить
          </Button>
          <Button onClick={onCancel}>Отмена</Button>
        </Flex>
      </Form>
    </Modal>
  )
}

export default EventSettingsCompitations
