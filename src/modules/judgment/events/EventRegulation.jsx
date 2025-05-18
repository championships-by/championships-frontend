import { Typography, Upload, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { REACT_APP_API_URL } from "@/const";

import "./sass/events.scss";

function EventRegulation({
  name,
  onChange: onChangeBase,
  required,
  form,
  existing,
}) {
  const { t } = useTranslation();

  const onChange = ({ file }) => {
    onChangeBase({ [name]: file });
    form.setFieldsValue({ [name]: file });
  };

  const buttonLabel = existing ? t("COMMON.REPLACE") : t("COMMON.UPLOAD");

  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required,
          message: t("RULES.PLEASE_UPLOAD_REGULATION"),
        },
      ]}
    >
      <Flex vertical>
        <Flex justify="space-between">
          <Typography.Text>{t("EVENTS.EVENT_REGULATION")}</Typography.Text>
          {existing && (
            <Typography.Link
              href={`${REACT_APP_API_URL}/${existing}`}
              target="_blank"
            >
              ({t("COMMON.SEE")})
            </Typography.Link>
          )}
        </Flex>
        <Flex gap="middle">
          <Upload
            accept=".pdf"
            maxCount={1}
            beforeUpload={() => false}
            onChange={onChange}
          >
            <Button>
              <Flex gap="small">
                <UploadOutlined />
                <Typography.Text>{buttonLabel}</Typography.Text>
                <Typography.Text type="secondary"> (.pdf)</Typography.Text>
              </Flex>
            </Button>
          </Upload>
        </Flex>
      </Flex>
    </FormItem>
  );
}

export default EventRegulation;
