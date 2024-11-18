import { Typography, Upload, message, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

function EventRegulation({ name, onChange: onChangeBase, required, form }) {
  const { t } = useTranslation();

  const onChange = ({ file }) => {
    onChangeBase({ [name]: file });
    form.setFieldsValue({ [name]: file });
  };

  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: required,
          message: t("RULES.PLEASE_UPLOAD_REGULATION"),
        },
      ]}
    >
      <Flex gap="middle">
        <Typography.Text>{t("EVENTS.EVENT_REGULATION")}: </Typography.Text>
        <Upload
          accept=".pdf"
          maxCount={1}
          beforeUpload={() => false}
          onChange={onChange}
        >
          <Button icon={<UploadOutlined />}>{t("COMMON.UPLOAD")}</Button>
        </Upload>
      </Flex>
      <Typography.Text type="secondary">
        {t("COMMON.EXTENSION")}: PDF.
      </Typography.Text>
    </FormItem>
  );
}

export default EventRegulation;
