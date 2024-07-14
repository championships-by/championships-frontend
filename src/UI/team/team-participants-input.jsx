import { Flex, Input, Select, Space, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/team.scss'
import { FILTER_OPTION } from '@src/components/enums'

function TeamParticipantsInput({ name, options }) {
  return (
    <Flex vertical className="team__team-participants-input__flex">
      <Typography.Text>Участники</Typography.Text>
      <Flex>
        <Space.Compact className="team__team-participants-input__space">
          <Input
            prefix={<UserOutlined />}
            className="team__team-participants-input__input"
            disabled
          />
          <FormItem
            name={name}
            className="team__team-participants-input__formitem"
          >
            <Select
              allowClear
              mode="multiple"
              showSearch
              name="team_participants_select"
              value=""
              filterOption={FILTER_OPTION}
              options={options}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
      <Typography.Text type="secondary">Робофутбол</Typography.Text>
    </Flex>
  )
}

export default TeamParticipantsInput
