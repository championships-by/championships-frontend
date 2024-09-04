import { Typography, Upload, message, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";

import "./sass/events.scss";

function EventLogo({ name, onChange: onChangeBase, required, form }) {
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
          onChange={onChange}
        >
          <Button icon={<UploadOutlined />}>Загрузить</Button>
        </Upload>
      </Flex>
      <Typography.Text type="secondary">
        Расширения: PNG, JPG, JPEG.
      </Typography.Text>
    </FormItem>
  );
}

export default EventLogo;
