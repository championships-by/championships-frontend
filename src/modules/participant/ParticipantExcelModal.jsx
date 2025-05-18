import React, { useState } from "react";
import { Modal, Upload, Button, message, Checkbox, Flex, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { participantExcelUpload } from "@/api";
import { useTranslation } from "react-i18next";

import "./sass/participant.scss";

const ParticipantExcelModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [excelFile, setExcelFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);

  const handleUpload = async () => {
    if (!isAgreeChecked) {
      message.warning(t("MESSAGES.AGREE_REQUIRED"));
      return;
    }
    if (!excelFile) {
      message.error(t("MESSAGES.SELECT_EXCEL_FILE"));
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", excelFile);

      await participantApi.uploadExcel(formData);
      message.success(t("MESSAGES.SUCCESS_UPLOAD_EXCEL"));
      onClose();
      form.resetFields();
      setExcelFile(null);
    } catch {
      message.error(t("MESSAGES.DATA_UPLOAD_ERROR"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = ({ fileList }) => {
    const file = fileList.length > 0 ? fileList[0].originFileObj : null;
    setExcelFile(file);
    if (file) {
      message.info(`${t("COMMON.CHOSEN_FILE")}: ${file.name}`);
    }
  };

  return (
    <Modal
      title={t("COMMON.PARTICIPANTS_UPLOAD_EXCEL")}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          {t("COMMON.CANCEL")}
        </Button>,
        <Button
          key="upload"
          type="primary"
          onClick={handleUpload}
          loading={isLoading}
          disabled={!isAgreeChecked}
        >
          {t("COMMON.UPLOAD")}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label={t("COMMON.FILESELECT")} name="excelFile">
          <Upload
            beforeUpload={() => false}
            accept=".xls,.xlsx"
            maxCount={1}
            onChange={handleFileChange}
          >
            <Button icon={<UploadOutlined />}>{t("COMMON.FILESELECT")}</Button>
          </Upload>
          <div className="excel-template-link">
            <a
              href="https://championships.by/static/files/participants_template.xlsx"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 {t("COMMON.DOWNLOAD_EXCEL_TEMPLATE")}
            </a>
          </div>
        </Form.Item>

        <Flex vertical gap="large" sx={{ mt: 2 }}>
          <Checkbox
            checked={isAgreeChecked}
            onChange={() => setIsAgreeChecked(!isAgreeChecked)}
          >
            {t("PARTICIPANTS.PERSONAL_DATA_AGREE")}
          </Checkbox>
        </Flex>
      </Form>
    </Modal>
  );
};

export default ParticipantExcelModal;
