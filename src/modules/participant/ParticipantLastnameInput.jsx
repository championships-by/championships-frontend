import { Flex, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

function ParticipantLastnameInput({ name, value }) {
  const { t } = useTranslation();

  return (
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
      ]}
    >
      <Flex vertical>
        <Typography.Text>{t("COMMON.LAST_NAME")}</Typography.Text>
        <Input
          value={value}
          prefix={<UserOutlined />}
          allowClear
          placeholder={t("COMMON.ENTER_LAST_NAME")}
          maxLength={255}
        />
        <Typography.Text type="secondary">
          {t("COMMON.LAST_NAME_EXAMPLE")}
        </Typography.Text>
      </Flex>
    </FormItem>
  );
}

export default ParticipantLastnameInput;
