import { Typography, Upload, message, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";

import "./sass/events.scss";

function EventRegulation({ name, onChange: onChangeBase, required, form }) {
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
          onChange={onChange}
        >
          <Button icon={<UploadOutlined />}>Загрузить</Button>
        </Upload>
      </Flex>
      <Typography.Text type="secondary">Расширение: PDF.</Typography.Text>
    </FormItem>
  );
}

export default EventRegulation;
