import { Flex, Input, Select, Space, Typography } from 'antd'
import { CrownOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/user.scss'

function UserRoleInput({ name, ...props }) {
  const disabled = props.disabled ?? false

  return (
    <Flex vertical className="user__role-input__flex">
      <Typography.Text>Роль пользователя</Typography.Text>
      <Flex>
        <Space.Compact className="user__role-input__space">
          <Input
            prefix={<CrownOutlined />}
            className="user__role-input__input"
            disabled
          />
          <FormItem name={name} className="user__role-input__formitem">
            <Select
              disabled={disabled}
              name="role_select"
              value="specialist"
              options={[
                {
                  value: 'admin',
                  label: 'Администратор',
                },
                {
                  value: 'judge',
                  label: 'Судья',
                },
                {
                  value: 'specialist',
                  label: 'Специалист',
                },
              ]}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
      <Typography.Text type="secondary">
        Обратитесь к администратору сайта, чтобы изменить роль
      </Typography.Text>
    </Flex>
  )
}

export default UserRoleInput
