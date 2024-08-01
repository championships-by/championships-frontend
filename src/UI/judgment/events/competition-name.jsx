import React,{ useState } from 'react'
import FormItem from 'antd/es/form/FormItem'
import { Flex, Input, Space, Typography } from 'antd'
import { FlagOutlined } from '@ant-design/icons'
import './sass/events.scss'

function CompitationNameInput({ name }) {
  return (
    <div className="events_compitation-name__div">
      <Typography.Text>Компетенция</Typography.Text>
      <Flex>
        <Space.Compact className="events__compitation-name__space">
          <Input
            prefix={<FlagOutlined />}
            className="events__compitation-name__image"
            disabled
          />
          <FormItem
            name={name}
            hasFeedback
            validateFirst
            rules={[
              {
                required: true,
                message: 'Пожалуйста, выберите мероприятие',
              },
              {
                min: 5,
                message: 'Минимальное значение 5',
              },
            ]}
          >
            <Flex vertical>
                <Input
                className="events__compitation-name__input"
                placeholder='Введите название'
                maxLength={30}  
                >
                </Input>
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
