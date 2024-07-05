import { Flex, Input, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'

function ParticipantLastnameInput({ name }) {
  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      shouldUpdate={true}
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите фамилию',
        },
        {
          max: 255,
          message: 'Максимальное значение 255',
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>Фамилия</Typography.Text>
        <Input
          prefix={<UserOutlined />}
          allowClear
          placeholder="Введите фамилию"
          maxLength={255}
        />
        <Typography.Text type="secondary">Пример: Иванов</Typography.Text>
      </Flex>
    </FormItem>
  )
}

export default ParticipantLastnameInput
