import { Typography, Upload, message, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

function EventLogo({ name, onChange: onChangeBase, required, form }) {
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
          message: t("RULES.PLEASE_UPLOAD_LOGO"),
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>{t("COMMON.LOGO")}</Typography.Text>
        <Upload
          accept="image/jpg, image/jpeg, image/png"
          maxCount={1}
          beforeUpload={() => false}
          onChange={onChange}
          listType="picture-card"
        >
          <Typography.Text type="secondary">
            <Flex vertical align="center">
              <UploadOutlined />
              {t("COMMON.UPLOAD")}
            </Flex>
          </Typography.Text>
        </Upload>
      </Flex>
      <Typography.Text type="secondary">
        {t("COMMON.EXTENSIONS")}: PNG, JPG, JPEG.
      </Typography.Text>
    </FormItem>
  );
}

export default EventLogo;
