import { Typography, Upload, message, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";

function EventRegulation({ name, onChange }) {
  const handleFileChange = ({ file }) => {
    if (file.status === "done" || file.status === "removed") {
      onChange(name, file.originFileObj);
    }
  };

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
          accept=".doc,.docx,.jpg,.png,.xls,.scv,.ppt,.txt,.rtf,.pdf,.tiff"
          maxCount={1}
          beforeUpload={() => false}
          onChange={handleFileChange}
        >
          <Button icon={<UploadOutlined />}>Загрузить</Button>
        </Upload>
      </Flex>
    </FormItem>
  );
}

export default EventRegulation;
