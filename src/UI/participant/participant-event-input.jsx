import React from 'react'
import FormItem from 'antd/es/form/FormItem'
import { Flex, Input, Space, Typography, AutoComplete } from 'antd'
import { TrophyOutlined } from '@ant-design/icons'
import './sass/participant.scss'

function ParticipantEventInput({ name }) {
  return (
    <div className="participant__event-input__div">
      <Typography.Text>Мероприятие</Typography.Text>
      <Flex>
        <Space.Compact className="participant__event-input__space">
          <Input
            prefix={<TrophyOutlined />}
            className="participant__event-input__input"
            disabled
          />
          <FormItem
            name={name}
            hasFeedback
            validateFirst
            // rules={[
            //     {
            //         required: true,
            //         message: 'Пожалуйста, выбирите мероприятие',
            //     },
            //     {
            //         max: 255,
            //         message: "Максимальное значение 255"
            //     }
            // ]}
          >
            <Flex vertical>
              <AutoComplete
                allowClear
                className="participant__event-input__autocomplete"
                placeholder="Выбирите мероприятие"
                id="participant_event_input"
                maxLength={255}
                options={[
                  { value: 'РобИн-2024' },
                  { value: 'РобИн-2025' },
                  { value: 'Техносфера' },
                ]}
              />
              <Typography.Text type="secondary">
                Пример: РобИн-2024
              </Typography.Text>
            </Flex>
          </FormItem>
        </Space.Compact>
      </Flex>
    </div>
  )
}
export default ParticipantEventInput
