import { Flex, Checkbox } from "antd";
import FormItem from "antd/es/form/FormItem";

const rules = [
  {
    required: true,
    message: "Обязательное поле",
  },
];

function FeedbackCheckbox({ name, onChange }) {
  return (
    <FormItem name={name} rules={rules}>
      <Flex gap="middle">
        <Checkbox
          onChange = {(e) => onChange(e.target.checked)}
        >
          Нажимая кнопку «Отправить, я принимаю условия пользовательского
          соглашения и даю согласие на обработку моих персональных данных на
          условиях и для целей, определенных в Согласии на обработку
          персональных данных.
        </Checkbox>
      </Flex>
    </FormItem>
  );
}

export default FeedbackCheckbox;
