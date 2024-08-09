import React from "react";
import FormItem from "antd/es/form/FormItem";
import { Flex, Input, Space, Typography } from "antd";
import { FlagOutlined } from "@ant-design/icons";

import "./sass/events.scss";

function CompitationNameInput() {
  return (
    <div className="events_compitation-name__div">
      <Typography.Text className="events__compitation-name__text">
        Название компетенции
      </Typography.Text>
      <Flex>
        <Space.Compact className="events__compitation-name__space">
          <FormItem
            name="compitation"
            hasFeedback
            validateFirst
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите название компетенции",
              },
              {
                min: 5,
                message: "Минимальное значение 5",
              },
            ]}
          >
            <Flex vertical>
              <Input
                className="events__compitation-name__input"
                placeholder="Введите название"
                maxLength={30}
                prefix={<FlagOutlined/>}
              />
              <Typography.Text type="secondary">
                Пример: Робофутбол
              </Typography.Text>
            </Flex>
          </FormItem>
        </Space.Compact>
      </Flex>
    </div>
  );
}
export default CompitationNameInput;
