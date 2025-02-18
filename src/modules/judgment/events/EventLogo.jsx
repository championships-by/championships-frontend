import { useState } from "react";
import { Typography, Upload, message, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { url } from "@constants";

import "./sass/events.scss";

function EventLogo({
  name,
  onChange: onChangeBase,
  required,
  form,
  existingImage,
}) {
  const { t } = useTranslation();
  const [fileList, setFileList] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const file = newFileList.length > 0 ? newFileList[0].originFileObj : null;
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {fileList.length === 0 && (
            <div className="upload-placeholder">
              {existingImage && existingImage !== "/" ? (
                isHovered ? (
                  <Typography.Text type="secondary">
                    <Flex vertical align="center">
                      <UploadOutlined />
                      {t("COMMON.REPLACE")}
                    </Flex>
                  </Typography.Text>
                ) : (
                  <img
                    src={`${url}/${existingImage}`}
                    className="events__existing-image"
                  />
                )
              ) : (
                <Typography.Text type="secondary">
                  <Flex vertical align="center">
                    <UploadOutlined />
                    {t("COMMON.UPLOAD")}
                  </Flex>
                </Typography.Text>
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
