import { Flex, Space, Typography, Tooltip } from "antd";
import Select from "@components/Select";
import { InfoCircleOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";
import { Roles } from "@constants";

import "./sass/user.scss";

function UserRoleInput({ name, ...props }) {
  const { t } = useTranslation();

  const disabled = props.disabled ?? false;

  const rules = [
    {
      required: true,
      message: t("COMMON.CHOOSE_USER_ROLE"),
    },
  ];

  return (
    <Flex vertical className="user__role-input__flex">
      <Typography.Text>{t("COMMON.ROLE")}</Typography.Text>
      <Flex>
        <Space.Compact className="user__role-input__space">
          <FormItem
            name={name}
            className="user__role-input__formitem"
            rules={rules}
          >
            <Select
              disabled={disabled}
              name="role_select"
              value="specialist"
              placeholder={t("COMMON.CHOOSE_ROLE")}
              options={[
                {
                  value: Roles.ADMIN,
                  label: t("COMMON.ADMIN"),
                },
                {
                  value: Roles.JUDGE,
                  label: t("COMMON.JUDGE"),
                },
                {
                  value: Roles.SPECIALIST,
                  label: t("COMMON.MANAGER"),
                },
              ]}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
      <Typography.Text type="secondary">
        {t("COMMON.MORE_ABOUT_ROLES")}{" "}
        <Tooltip
          placement="rightTop"
          title={
            <Typography.Text className="user__role-input__tooltip">
              <Typography.Text strong className="user__role-input__tooltip">
                {t("COMMON.ADMIN")}
              </Typography.Text>{" "}
              {t("COMMON.ADMIN_DESCRIPTION")}
              <br />
              <br />
              <Typography.Text strong className="user__role-input__tooltip">
                {t("COMMON.MANAGER")}
              </Typography.Text>{" "}
              {t("COMMON.MANAGER_DESCRIPTION")}
              <br />
              <br />
              <Typography.Text strong className="user__role-input__tooltip">
                {t("COMMON.JUDGE")}
              </Typography.Text>{" "}
              {t("COMMON.JUDGE_DESCRIPTION")}
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
