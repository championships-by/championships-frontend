import { Typography, Upload, message, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";
import { FILE_UPLOADING } from "@constants";

import "./sass/events.scss";

function EventRegulation({ name }) {
  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: "Пожалуйста, загрузите положение о проведении мероприятия",
        },
      ]}
    >
      <Flex gap="middle">
        <Typography.Text>Положение о проведении мероприятия: </Typography.Text>
        <Upload
          {...FILE_UPLOADING.UPLOAD}
          accept=".doc,.docx,.jpg,.png,.xls,.scv,.ppt,.txt,.rtf,.pdf,.tiff"
          maxCount={1}
          onChange={(info) => {
            if (info.file.status !== FILE_UPLOADING.UPLOADING) {
            }
            if (info.file.status === FILE_UPLOADING.DONE) {
              message.success(`${info.file.name} Файл загружен успешно`);
            } else if (info.file.status === FILE_UPLOADING.ERROR) {
              message.error(`${info.file.name} Ошибка загрузки файла`);
            }
          }}
        >
          <Button icon={<UploadOutlined />}>Загрузить</Button>
        </Upload>
      </Flex>
    </FormItem>
  );
}
export default EventRegulation;
