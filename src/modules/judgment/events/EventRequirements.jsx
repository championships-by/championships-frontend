import { useLayoutEffect } from "react";
import { Typography, Flex } from "antd";
import { validateDescription } from "@utils";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "./sass/events.scss";

function EventRequirements({ name, value, form, onChange: onChangeBase }) {
  const { t } = useTranslation();

  const onChange = (newValue) => {
    onChangeBase({
      [name]: newValue,
    });

    form.setFieldsValue({ [name]: newValue });
  };

  useLayoutEffect(() => {
    const styleSheet = document.styleSheets[0];

    if (styleSheet) {
      styleSheet.insertRule(
        `.events__event-description__quill .ql-snow .ql-tooltip.ql-editing a.ql-action::after { content: "${t(
          "COMMON.SAVE"
        )}"; }`,
        styleSheet.cssRules.length
      );

      styleSheet.insertRule(
        `.events__event-description__quill .ql-snow .ql-tooltip a.ql-action::after { content: "${t(
          "COMMON.EDIT"
        )}"; }`,
        styleSheet.cssRules.length
      );

      styleSheet.insertRule(
        `.events__event-description__quill .ql-snow .ql-tooltip a.ql-remove::before { content: "${t(
          "COMMON.DELETE"
        )}"; }`,
        styleSheet.cssRules.length
      );
    }
  }, [t]);

  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: t("RULES.PLEASE_ENTER_REQUIREMENTS"),
        },
        {
          validator: (_, value) => validateDescription(value, t),
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>
          {t("COMMON.WHAT_NEED_TO_PARTICIPATE")}
        </Typography.Text>
        <ReactQuill
          value={value}
          onChange={onChange}
          placeholder={t("COMMON.ENTER_REQUIREMENTS")}
          className="events__event-description__quill"
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
            ],
          }}
        />
      </Flex>
    </FormItem>
  );
}
export default EventRequirements;
