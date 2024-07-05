import React from 'react'
import { useState } from 'react'
import { Button, Flex, Form, Modal, message } from 'antd'
import Compitation from '@src/UI/judgment/events/сompitation-name.jsx'

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
    >
      <Form
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Compitation name="CompitationName" />

        <Flex gap="middle">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={() => setIsLoading(true)}
          >
            Сохранить компетенцию
          </Button>
          <Button onClick={onCancel}>Отмена</Button>
        </Flex>
      </Form>
    </Modal>
  )
}

export default EventSettingsCompitations
