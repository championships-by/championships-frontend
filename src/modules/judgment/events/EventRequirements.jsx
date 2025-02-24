import { Typography, Flex } from "antd";
import { validateDescription } from "@utils";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";
import TextEditor from "@modules/textEditor/TextEditor";

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
        <TextEditor
          value={value}
          onChange={onChange}
          placeholder={t("COMMON.ENTER_REQUIREMENTS")}
        />
      </Flex>
    </FormItem>
  );
}
export default EventRequirements;
