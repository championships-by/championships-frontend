import { Typography, Upload, Button, Flex, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";

import "./sass/feedback.scss";

function FeedbackFile({ name, onChange: onChangeBase }) {
  const MAX_FILE_SIZE = 499 * 1024 * 1024;
  const onChange = ({ file }) => {
    onChangeBase({ [name]: file });
  };

  const beforeUpload = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      message.error("Размер файла не должен превышать 499 МБ.");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  return (
    <FormItem name={name}>
      <Flex gap="middle">
        <Typography.Text>Файл: </Typography.Text>
        <Upload
          accept=".png, .jpg, .jpeg, .doc, .docx, .pdf, .zip, .rar, .tar, .7zip, .mp4, .avi, .mov, .mkv, .mpeg"
          maxCount={1}
          beforeUpload={beforeUpload}
          onChange={onChange}
        >
          <Button icon={<UploadOutlined />}>Загрузить</Button>
        </Upload>
      </Flex>
      <Typography.Text type="secondary">
        Максимальный размер - 499 МБ
      </Typography.Text>
    </FormItem>
  );
}

export default FeedbackFile;
