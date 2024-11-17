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
            message: t("RULES.PLEASE_ENTER_LAST_NAME"),
          },
          {
            pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
            message: t("RULES.LAST_NAME_CAN_CONTAIN_ONLY_LETTERS"),
          },
          {
            min: 2,
            message: t("RULES.MIN_2_SYMBOLS"),
          },
          {
            max: 255,
            message: t("RULES.MAX_255_SYMBOLS"),
          },
          {
            validator(_, value) {
              if (value && value.trim()) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(t("RULES.PLEASE_ENTER_CORRECT_LAST_NAME"))
              );
            },
          },
        ]}
        className="user__lastname-input__formitem"
      >
        <Input
          prefix={<UserOutlined />}
          allowClear
          placeholder={t("COMMON.ENTER_LAST_NAME")}
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
