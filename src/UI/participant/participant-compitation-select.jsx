import React from 'react'
import FormItem from 'antd/es/form/FormItem'
import { Select, Flex, Input, Space, Typography } from 'antd'
import { FlagOutlined } from '@ant-design/icons'
import './sass/participant.scss'

function ParticipantCompitationSelect({ name }) {
  return (
    <div className="participant__compitation-select__div">
      <Typography.Text>Компетенция</Typography.Text>
      <Flex>
        <Space.Compact className="participant__compitation-select__space">
          <Input
            prefix={<FlagOutlined />}
            className="participant__compitation-select__input"
            disabled
          />
          <FormItem
            name={name}
            className="participant__compitation-select__formitem"
            hasFeedback
            validateFirst
            // rules={[
            //     {
            //         required: true,
            //         message: 'Пожалуйста, выбирите компетенцию',
            //     },
            // ]}
          >
            <Select
              // disabled={disabled}
              className="participant__compitation-select__select"
              id="user_compitation_select"
              placeholder="Выберите компетенцию"
              options={[
                {
                  value: 'robofootball',
                  label: 'Робофутбол',
                },
                {
                  value: 'veb',
                  label: 'Веб-разработка',
                },
                {
                  value: 'robosumo',
                  label: 'Робосумо',
                },
              ]}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
    </div>
  )
}
export default ParticipantCompitationSelect
