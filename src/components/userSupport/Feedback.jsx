import { useState } from "react";
import { Typography, Row, Col, Form, message, Button } from "antd";
import laptop from "@assets/img/laptop-simple.png";
import { mailZubronok } from "@constants";
import FeedbackFirstnameInput from "@modules/feedback/FeedbackFirstnameInput";
import FeedbackLastnameInput from "@modules/feedback/FeedbackLastnameInput";
import FeedbackEmailInput from "@modules/feedback/FeedbackEmailInput";
import FeedbackFile from "@modules/feedback/FeedbackFile";
import FeedbackCheckbox from "@modules/feedback/FeedbackCheckbox";
import FeedbackDescription from "@modules/feedback/FeedbackDescription";
import { feedbackApi } from "@api";
import { useTranslation } from "react-i18next";

import "./sass/user-support.scss";

function Feedback() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();
  const [form] = Form.useForm();
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);

  const onChangeFile = (fileData) => {
    setFile(fileData.file);
  };

  const onFinish = async () => {
    setIsLoading(true);
    const formData = new FormData();
    const params = {
      name: form.getFieldValue("first_name"),
      surname: form.getFieldValue("second_name"),
      user_email: form.getFieldValue("email"),
      message: form.getFieldValue("message"),
    };

    const queryString = new URLSearchParams(params).toString();

    if (file) {
      formData.append("file", file);
    }

    try {
      await feedbackApi.sendFeedback(queryString, file ? formData : undefined);
      message.success(t("USER_SUPPORT.SUCCESS_SEND_MESSAGE"));
      form.resetFields();
    } catch {}

    setIsLoading(false);
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
  };

  return (
    <div className="user-support">
      <Typography.Title level={2}>
        {t("USER_SUPPORT.FEEDBACK")}
      </Typography.Title>
      <Typography.Text className="user-support__feedback__text">
        {t("USER_SUPPORT.THANKS_FOR_VISITING")}
        <br />
        <br />
        <a href={`mailto:${mailZubronok}`}> {mailZubronok}</a>
      </Typography.Text>
      <div className="user-support__feedback__warning-container">
        <Typography.Text className="user-support__feedback__text__white">
          <Typography.Text
            strong
            className="user-support__feedback__text__white"
          >
            {t("COMMON.ATTENTION")}{" "}
          </Typography.Text>
          {t("USER_SUPPORT.USE_EMAIL_TO_CONTACT")}
        </Typography.Text>
      </div>
      <Row align="middle">
        <Col xs={24} sm={24} md={24} lg={8}>
          <Form
            name="event"
            form={form}
            layout="vertical"
            requiredMark="optional"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Typography.Title level={3}>
              {t("USER_SUPPORT.SEND_MESSAGE")}
            </Typography.Title>

            <FeedbackFirstnameInput name="first_name" />
            <FeedbackLastnameInput name="second_name" />
            <FeedbackEmailInput name="email" />
            <FeedbackFile name="file" onChange={onChangeFile} />
            <FeedbackDescription name="message" />
            <FeedbackCheckbox
              name="checkbox"
              onChange={() => setIsAgreeChecked(!isAgreeChecked)}
            />
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={!isAgreeChecked}
            >
              {t("COMMON.SEND")}
            </Button>
          </Form>
          <br />
          <Typography.Text type="secondary">
            * - {t("COMMON.REQUIRED_FIELD")}
          </Typography.Text>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16}>
          <div className="user-support__feedback__img-container">
            <img src={laptop} className="user-support__feedback__laptop-img" />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Feedback;
