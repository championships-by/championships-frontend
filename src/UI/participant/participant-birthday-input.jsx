import React from 'react'
import { DatePicker, Flex, Input, Space, Typography } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/participant.scss'
import { Locale } from '@src/components/enums'

const ParticipantBirthdayInput = () => {
  return (
    <>
      <Typography.Text>Дата рождения</Typography.Text>
      <Flex>
        <Space.Compact className="participant__birthday-input__space">
          <Input
            prefix={<CalendarOutlined />}
            disabled
            className="participant__birthday-input__input"
          />
          <FormItem
            name="event_date"
            hasFeedback
            validateFirst
            rules={[
              {
                type: 'object',
                required: true,
                message: 'Пожалуйста, выбирите дату рождения',
              },
            ]}
            className="participant__birthday-input__formitem"
          >
            <DatePicker
              format="DD-MM-YYYY"
              className="participant__birthday-input__datepicker"
              placeholder="Выберите дату рождения"
              locale={Locale}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
    </>
  )
}

export default ParticipantBirthdayInput
