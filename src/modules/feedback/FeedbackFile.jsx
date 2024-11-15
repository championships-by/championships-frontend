import { Typography, Upload, Button, Flex, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./sass/feedback.scss";

const MAX_FILE_SIZE = 499;

function FeedbackFile({ name, onChange: onChangeBase }) {
  const { t } = useTranslation();

  const onChange = ({ file }) => {
    onChangeBase({ [name]: file });
  };

  const beforeUpload = (file) => {
    if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
      message.error(
        `${t("MESSAGES.FILE_SIZE_MUST_NOT_EXCEED")} ${MAX_FILE_SIZE} ${t(
          "COMMON.MEGABYTES"
        )}`
      );
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  return (
    <FormItem name={name}>
      <Flex gap="middle">
        <Typography.Text>{t("COMMON.FILE")}: </Typography.Text>
        <Upload
          accept=".png, .jpg, .jpeg, .doc, .docx, .pdf, .zip, .rar, .tar, .7zip, .mp4, .avi, .mov, .mkv, .mpeg"
          maxCount={1}
          beforeUpload={beforeUpload}
          onChange={onChange}
        >
          <Button icon={<UploadOutlined />}>{t("COMMON.UPLOAD")}</Button>
        </Upload>
      </Flex>
      <Typography.Text type="secondary">
        {t("COMMON.MAX_SIZE")} - {MAX_FILE_SIZE} {t("COMMON.MEGABYTES")}
      </Typography.Text>
    </FormItem>
  );
}

export default FeedbackFile;
