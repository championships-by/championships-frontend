import { Flex, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

function ParticipantLastnameInput({ name, value }) {
  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      shouldUpdate
      rules={[
        {
          required: true,
          message: "Пожалуйста, введите фамилию",
        },
        {
          pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
          message: "Фамилия может содержать только буквы",
        },
        {
          min: 3,
          message: "Минимум 3 символа",
        },
        {
          max: 255,
          message: "Максимальное значение 255",
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>Фамилия</Typography.Text>
        <Input
          value={value}
          prefix={<UserOutlined />}
          allowClear
          placeholder="Введите фамилию"
          maxLength={255}
        />
        <Typography.Text type="secondary">Пример: Иванов</Typography.Text>
      </Flex>
    </FormItem>
  );
}

export default ParticipantLastnameInput;
