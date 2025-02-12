import { Typography, Upload, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function ParticipantPhotoUpload({ name, onChange: onChangeBase, form }) {
  const { t } = useTranslation();

  const onChange = ({ file }) => {
    onChangeBase({ [name]: file });
    form.setFieldsValue({ [name]: file });
  };

  return (
    <FormItem name={name}>
      <Flex vertical>
        <Typography.Text>{t("COMMON.PHOTO_OPTIONAL")}</Typography.Text>
        <Upload
          accept="image/jpg, image/jpeg, image/png"
          maxCount={1}
          beforeUpload={() => false}
          onChange={onChange}
          listType="picture-card"
        >
          <Typography.Text type="secondary">
            <Flex vertical align="center">
              <UploadOutlined />
              {t("COMMON.UPLOAD")}
            </Flex>
          </Typography.Text>
        </Upload>
      </Flex>
      <Typography.Text type="secondary">
        {t("COMMON.EXTENSIONS")}: PNG, JPG, JPEG.
      </Typography.Text>
    </FormItem>
  );
}

export default ParticipantPhotoUpload;
