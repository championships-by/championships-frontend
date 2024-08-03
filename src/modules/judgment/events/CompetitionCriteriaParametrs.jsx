import React from "react";
import { Form, Space, Button, Input, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function CriteriaParametrs() {
  return (
    <div className="events__competition-criteria__div">
      <Form
        name="dynamic_form_nest_item"
        className="events__competition-criteria__form"
        autoComplete="off"
      >
        <Form.List name="criteria">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  align="baseline"
                  className="events__competition-criteria__space"
                >
                  <Form.Item
                    {...restField}
                    className="events__competition-criteria__item"
                    name={[name, "criterion"]}
                    fieldKey={[fieldKey, "criterion"]}
                    rules={[
                      {
                        required: true,
                        message: "Не ввели критерий",
                      },
                    ]}
                  >
                    <Typography.Text>Критерии оценки</Typography.Text>
                    <Input placeholder="Введите критерий" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "maxPoints"]}
                    fieldKey={[fieldKey, "maxPoints"]}
                    className="events__competition-criteria__item"
                    rules={[
                      {
                        required: true,
                        message: "Не ввели максимальное количество баллов",
                      },
                    ]}
                  >
                    <Typography.Text>
                      Укажите максимальное количество баллов
                    </Typography.Text>
                    <Input placeholder="Введите максимальное количество баллов" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  className="events__competition-criteria__addButton"
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Добавить критерий
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
}

export default CriteriaParametrs;
