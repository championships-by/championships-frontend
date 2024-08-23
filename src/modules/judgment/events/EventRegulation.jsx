import { Typography, Upload, message, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";

function EventRegulation({ name, onChange }) {
  const handleFileChange = ({ file }) => {
    onChange({ [name]: file });
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
          accept=".pdf"
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
