import { useState } from "react";
import { Typography, Row, Col, Form, message, Button } from "antd";
import laptop from "@assets/img/laptop-simple.png";
import { mailZubronok } from "@constants";
import FeedbackFirstnameInput from "@modules/feedback/FeedbackFirstnameInput";
import FeedbackLastnameInput from "@modules/feedback/FeedbackLastnameInput";
import FeedbackEmailInput from "@modules/feedback/FeedbackEmailInput";
import FeedbackFile from "@modules/feedback/FeedbackFile";
import FeedbackDescription from "@modules/feedback/FeedbackDescription";
import { feedbackApi } from "@api";

import "./sass/user-support.scss";

function Feedback() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();
  const [form] = Form.useForm();

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
      message.success("Сообщение успешно отправлено");
      form.resetFields();
    } catch {}

    setIsLoading(false);
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");
  };

  return (
    <div className="user-support">
      <Typography.Title level={2}>Обратная связь</Typography.Title>
      <Typography.Text className="user-support__feedback__text">
        Спасибо, что посетили наш РЕСУРС. Если вы хотите оставить отзыв о
        Республиканской единой системе удалённой регистрации соревнований, а
        также по проблемам работы портала, вы можете воспользоваться формой
        обратной связи или написать нам на почту:
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
            Внимание!{" "}
          </Typography.Text>
          Для связи с организаторами выбранного мероприятия воспользуйтесь email
          для вопросов участников на странице этого мероприятия.
        </Typography.Text>
      </div>
      <Row align="middle">
        <Col span={8}>
          <Form
            name="event"
            form={form}
            layout="vertical"
            requiredMark="optional"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Typography.Title level={3}>Отправить сообщение</Typography.Title>

            <FeedbackFirstnameInput name="first_name" />
            <FeedbackLastnameInput name="second_name" />
            <FeedbackEmailInput name="email" />
            <FeedbackFile name="file" onChange={onChangeFile} />
            <FeedbackDescription name="message" />
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Отправить
            </Button>
          </Form>
          <br />
          <Typography.Text type="secondary">
            * - обязательное поле
          </Typography.Text>
        </Col>
        <Col span={16}>
          <div className="user-support__feedback__img-container">
            <img src={laptop} className="user-support__feedback__laptop-img" />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Feedback;
