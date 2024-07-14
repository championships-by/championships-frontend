import { Flex, Input, Select, Space, Typography } from 'antd'
import { FlagOutlined } from '@ant-design/icons'
import FormItem from 'antd/es/form/FormItem'
import './sass/team.scss'
import { FILTER_OPTION } from '@src/components/enums'

function TeamNominationInput({ name, options }) {
  return (
    <Flex vertical className="team__team-nomination-select__flex">
      <Typography.Text>Компетенция</Typography.Text>
      <Flex>
        <Space.Compact className="team__team-nomination-select__space">
          <Input
            prefix={<FlagOutlined />}
            className="team__team-nomination-select__input"
            disabled
          />
          <FormItem
            name={name}
            className="team__team-nomination-select__formitem"
          >
            <Select
              name="team_nomination_select"
              value=""
              showSearch
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

export default TeamNominationInput
