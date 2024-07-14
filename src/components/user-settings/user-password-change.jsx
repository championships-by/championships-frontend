import { Button, Modal, Flex, message, Form } from 'antd'
import { useState } from 'react'
import OldPassword from '@src/UI/user/password-change/old-password'
import NewPassword from '@src/UI/user/password-change/new-password'
import SecondNewPassword from '@src/UI/user/password-change/second-new-password'

function UserPasswordModal({ isOpen, onOk, onCancel }) {
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
      title="Добавить участника"
      className="user-settings__password-change-modal"
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
        <OldPassword name="OldPassword" />
        <NewPassword name="NewPassword" />
        <SecondNewPassword name="SecondNewPassword" />

        <Flex gap="middle">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={() => setIsLoading(true)}
          >
            Сохранить данные
          </Button>
          <Button onClick={onCancel}>Отмена</Button>
        </Flex>
      </Form>
    </Modal>
  )
}

export default UserPasswordModal
