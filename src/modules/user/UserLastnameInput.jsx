import { Flex, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import "./sass/user.scss";
import { useTranslation } from "react-i18next";
import { handlePaste } from "@utils";

function UserLastnameInput({ name }) {
  const { t } = useTranslation();
  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <Flex vertical className="user__lastname-input__flex">
      <Typography.Text>{t("COMMON.LAST_NAME")}</Typography.Text>
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
            min: 2,
            message: "Минимум 2 символа",
          },
          {
            max: 255,
            message: "Максимальное значение 255",
          },
          {
            validator(_, value) {
              if (value && value.trim()) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Пожалуйста, введите корректную фамилию")
              );
            },
          },
        ]}
        className="user__lastname-input__formitem"
      >
        <Input
          prefix={<UserOutlined />}
          allowClear
          placeholder="Введите фамилию"
          maxLength={255}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
        />
      </FormItem>
      <Typography.Text type="secondary">
        {t("COMMON.LAST_NAME_EXAMPLE")}
      </Typography.Text>
    </Flex>
  );
}

export default UserLastnameInput;
