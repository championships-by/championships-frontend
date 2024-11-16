import { Flex, Checkbox } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

function FeedbackCheckbox({ name, onChange }) {
  const { t } = useTranslation();

  const rules = [
    {
      required: true,
      message: t("RULES.REQUIRED_FIELD"),
    },
  ];

  return (
    <FormItem name={name} rules={rules}>
      <Flex gap="middle">
        <Checkbox onChange={(e) => onChange(e.target.checked)}>
          {t("COMMON.I_AGREE_WITH_USER_TERMS")}
        </Checkbox>
      </Flex>
    </FormItem>
  );
}

export default FeedbackCheckbox;
