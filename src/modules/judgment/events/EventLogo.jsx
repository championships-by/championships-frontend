import { useState } from "react";
import { Typography, Upload, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { API_URL } from "@/const";

import "./sass/events.scss";

function EventLogo({
  name,
  onChange: onChangeBase,
  required,
  form,
  existingImage,
  fileList,
  setFileList,
}) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const file = newFileList.length > 0 ? newFileList[0].originFileObj : null;
    onChangeBase({ [name]: file });
    form.setFieldsValue({ [name]: file });
  };

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const replaceLabel = (
    <Typography.Text type="secondary">
      <Flex vertical align="center">
        <UploadOutlined />
        {t("COMMON.REPLACE")}
      </Flex>
    </Typography.Text>
  );

  const uploadLabel = (
    <Typography.Text type="secondary">
      <Flex vertical align="center">
        <UploadOutlined />
        {t("COMMON.UPLOAD")}
      </Flex>
    </Typography.Text>
  );

  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required,
          message: t("RULES.PLEASE_UPLOAD_LOGO"),
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>{t("COMMON.LOGO")}</Typography.Text>
        <Upload
          accept="image/jpg, image/jpeg, image/png"
          maxCount={1}
          beforeUpload={() => false}
          onChange={onChange}
          listType="picture-card"
          fileList={fileList}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {fileList.length === 0 && (
            <div className="upload-placeholder">
              {existingImage && existingImage !== "/" ? (
                isHovered ? (
                  replaceLabel
                ) : (
                  <img
                    src={`${API_URL}/${existingImage}`}
                    className="events__existing-image"
                  />
                )
              ) : (
                uploadLabel
              )}
            </div>
          )}
        </Upload>
      </Flex>
      <Typography.Text type="secondary">
        {t("COMMON.EXTENSIONS")}: PNG, JPG, JPEG.
      </Typography.Text>
    </FormItem>
  );
}

export default EventLogo;
