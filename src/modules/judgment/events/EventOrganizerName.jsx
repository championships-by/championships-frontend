import { Typography, Input, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { SolutionOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

function EventOrganizerName({ name, value }) {
  const { t } = useTranslation();

  return (
    <FormItem name={name} hasFeedback validateFirst rules={[]}>
      <Flex vertical>
        <Typography.Text>{t("COMMON.ORGANIZER_NAME")}</Typography.Text>
        <Input
          value={value}
          prefix={<SolutionOutlined />}
          allowClear
          placeholder={t("COMMON.ENTER_ORGANIZER_NAME")}
          id="organizer_name_input"
          maxLength={255}
          className="events__organizer_name__input"
        />
      </Flex>
    </FormItem>
  );
}

export default EventOrganizerName;
