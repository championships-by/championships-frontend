import React from 'react'
import FormItem from 'antd/es/form/FormItem'
import { Flex, Input, Space, Typography, AutoComplete } from 'antd'
import { FlagOutlined } from '@ant-design/icons'
import './sass/events.scss'

function CompitationNameInput({ name }) {
  return (
    <div className="events_compitation-name__div">
      <Typography.Text>Компитенция</Typography.Text>
      <Flex>
        <Space.Compact className="events__compitation-name__space">
          <Input
            prefix={<FlagOutlined />}
            className="events__compitation-name__input"
            disabled
          />
          <FormItem
            name={name}
            hasFeedback
            validateFirst
            rules={[
              {
                required: true,
                message: 'Пожалуйста, выбирите мероприятие',
              },
              {
                min: 5,
                message: 'Минимальное значение 5',
              },
            ]}
          >
            <Flex vertical>
              <AutoComplete
                allowClear
                className="events__compitation-name__autocomlete"
                placeholder="Выбирите компетенцию"
                maxLength={255}
                options={[
                  { value: 'Робофутбол' },
                  { value: 'Веб-разработка' },
                  { value: 'Робосуммо' },
                ]}
              />
              <Typography.Text type="secondary">
                Пример: Робофутбол
              </Typography.Text>
            </Flex>
          </FormItem>
        </Space.Compact>
      </Flex>
    </div>
  )
}
export default CompitationNameInput
