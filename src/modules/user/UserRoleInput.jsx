import { Flex, Input, Select, Space, Typography, Tooltip } from "antd";
import { CrownOutlined, InfoCircleOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import "./sass/user.scss";

function UserRoleInput({ name, ...props }) {
  const disabled = props.disabled ?? false;

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
                  value: "admin",
                  label: "Администратор",
                },
                {
                  value: "judge",
                  label: "Судья",
                },
                {
                  value: "specialist",
                  label: "Менеджер",
                },
              ]}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
      <Typography.Text type="secondary">
        Подробнее о ролях{" "}
        <Tooltip
          placement="rightTop"
          title={
            <Typography.Text className="user__role-input__tooltip">
              <Typography.Text strong className="user__role-input__tooltip">
                Администратор
              </Typography.Text>{" "}
              - курирует работу портала.
              <br />
              <br />
              <Typography.Text strong className="user__role-input__tooltip">
                Менеджер
              </Typography.Text>{" "}
              - регистрирует участников на мероприятия, при этом не может
              создавать мероприятия и входить в судейский состав.
              <br />
              <br />
              <Typography.Text strong className="user__role-input__tooltip">
                Судья
              </Typography.Text>{" "}
              - создает мероприятия, регистрирует участников на мероприятия,
              может входить в судейский состав.
            </Typography.Text>
          }
        >
          <InfoCircleOutlined />
        </Tooltip>
      </Typography.Text>
    </Flex>
  );
}

export default UserRoleInput;
