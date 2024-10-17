import { Typography, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "./sass/events.scss";
import { useCallback } from "react";

function EventDescription({ name, value, onChange: onDescriptionChange }) {
  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: "Пожалуйста, введите описание мероприятия",
        },
        {
          max: 1000,
          message: "Максимум 1000 символов",
        },
        {
          min: 5,
          message: "Минимум 5 символов",
        },
      ]}
    >
      <div className="events__event-description">
        <Typography.Text>Описание мероприятия</Typography.Text>
        <ReactQuill
          value={value}
          placeholder="Введите описание мероприятия"
          className="events__event-description__editor"
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "link",
          ]}
        />
      </div>
    </FormItem>
  );
}

export default EventDescription;
