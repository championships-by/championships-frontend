import { Typography, Upload, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";

import "./sass/feedback.scss";

function FeedbackFile({ name, onChange: onChangeBase }) {
  const onChange = ({ file }) => {
    onChangeBase({ [name]: file });
  };

  return (
    <FormItem name={name}>
      <Flex gap="middle">
        <Typography.Text>Файл: </Typography.Text>
        <Upload maxCount={1} beforeUpload={() => false} onChange={onChange}>
          <Button icon={<UploadOutlined />}>Загрузить</Button>
        </Upload>
      </Flex>
    </FormItem>
  );
}

export default FeedbackFile;
