import { Typography, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "./sass/events.scss";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
];

function EventDescription({ name, value, onChange: onDescriptionChange }) {
  const onChange = (value) => {
    onDescriptionChange({ [name]: value });
  };

  const isContentEmpty = (content) => {
    try {
      const text = content.replace(/<[^>]*>/g, "").trim();
      return text.length === 0;
    } catch {
      return true;
    }
  };

  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          max: 1000,
          message: "Максимум 1000 символов",
        },
        {
          min: 5,
          message: "Минимум 5 символов",
        },
        {
          validator: (_) => {
            if (isContentEmpty(value)) {
              return Promise.reject(
                new Error("Пожайлуста, введите описание мероприятия")
              );
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <div className="events__event-description">
        <Typography.Text>Описание мероприятия</Typography.Text>
        <ReactQuill
          value={value}
          placeholder="Введите описание мероприятия"
          className="events__event-description__editor"
          onChange={onChange}
          modules={modules}
          formats={formats}
        />
      </div>
    </FormItem>
  );
}

export default EventDescription;
