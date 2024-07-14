import React from 'react'
import { Flex, Input, Typography } from 'antd'
import { TeamOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/team.scss'

function TeamNameInput({ name }) {
  return (
    <Flex vertical className="team__team-name-input__flex">
      <Typography.Text>Название команды</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите название команды',
          },
          {
            max: 255,
            message: 'Максимальное значение 255',
          },
        ]}
        className="team__team-name-input__formitem"
      >
        <Input
          allowClear
          prefix={<TeamOutlined />}
          placeholder="Введите название команды"
          maxLength={255}
        />
      </FormItem>
      <Typography.Text type="secondary">Пример: Эврика</Typography.Text>
    </Flex>
  )
}

export default TeamNameInput
