import { Typography, Upload, message, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";

function EventLogo({ name, onChange }) {
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
          message: "Пожалуйста, загрузите логотип",
        },
      ]}
    >
      <Flex gap="middle">
        <Typography.Text>Логотип: </Typography.Text>
        <Upload
          accept="image/jpg, image/jpeg, image/png"
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

export default EventLogo;
