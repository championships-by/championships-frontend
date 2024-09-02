import { PhoneOutlined } from "@ant-design/icons";
import { Flex, Input, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import "./sass/user.scss";

function UserPhoneInput({ name }) {
  return (
    <Flex vertical className="user__phone-input__flex">
      <Typography.Text>Телефон</Typography.Text>
      <FormItem
        name={name}
        normalize={(value) => {
          const formattedValue = value.replace(/[^0-9]/g, '');
          const parts = [
            formattedValue.length >= 0 ? "+375" : "",
            formattedValue.length > 3 ? `(${formattedValue.slice(3, 5)}` : "",
            formattedValue.length > 5 ? `)${formattedValue.slice(5, 8)}` : "",
            formattedValue.length > 8 ? `-${formattedValue.slice(8, 10)}` : "",
            formattedValue.length > 10 ? `-${formattedValue.slice(10, 12)}` : "",
          ];
          return parts.filter(Boolean).join("");
        }}
        hasFeedback
        validateFirst
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите номер телефона",
          },
          {
            pattern: /\+\d{3}\(\d{2}\)\d{3}-\d{2}-\d{2}/,
            message:
              "Пожалуйста, введите номер телефона в соответствии с примером",
          },
        ]}
        className="user__phone-input__formitem"
      >
        <Input
          prefix={<PhoneOutlined />}
          type="tel"
          allowClear
          placeholder="Введите телефон"
          maxLength={19}
        />
      </FormItem>
      <Typography.Text type="secondary">
        Пример: +375(25)123-45-67
      </Typography.Text>
    </Flex>
  );
}

export default UserPhoneInput;
