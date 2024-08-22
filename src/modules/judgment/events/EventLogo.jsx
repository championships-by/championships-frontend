import { Typography, Upload, message, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";

function EventLogo({ name, onChange }) {
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
          message: "Пожалуйста, загрузите логотип",
        },
      ]}
    >
      <Flex gap="middle">
        <Typography.Text>Логотип: </Typography.Text>
        <Upload
          accept=".jpg,.jpeg,.png,.gif,.bmp,.svg"
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
