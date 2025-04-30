import { Typography, Upload, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { REACT_APP_API_URL } from "@const";

import "./sass/participant.scss";

function ParticipantPhotoUpload({
  name,
  onChange: onChangeBase,
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
    <FormItem name={name}>
      <Flex vertical>
        <Typography.Text>{t("COMMON.PHOTO_OPTIONAL")}</Typography.Text>
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
                    src={`${REACT_APP_API_URL}/${existingImage}`}
                    className="participant__existing-image"
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

export default ParticipantPhotoUpload;
