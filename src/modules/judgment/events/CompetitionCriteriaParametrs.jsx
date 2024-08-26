import React, { useState } from "react";
import { Form, Space, Button, Input, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function CriteriaParametrs({ onCriteriaChange }) {
  const [criteria, setCriteria] = useState([]);
  const handleCriteriaChange = (newCriteria) => {
    setCriteria(newCriteria);
    onCriteriaChange(newCriteria);
  };

  const handleSetCriteria = (fields) => {
    const newCriteria = fields.map((field) => {
      return {
        criteria: field.name[1],
        maxPoints: field.name[2],
      };
    });
    handleCriteriaChange(newCriteria);
  };
  return (
    <div className="events__competition-criteria__div">
      <Form
        name="dynamic_form_nest_item"
        className="events__competition-criteria__form"
        autoComplete="off"
      >
        <Form.List
          name="criteria"
          onValuesChange={(values) => handleSetCriteria(values)}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.length > 0 && (
                <>
                  <Typography.Text>Критерии оценки:</Typography.Text>
                  <Typography.Text className="events__competition-criteria__maxPoints">
                    Максимальное количество баллов
                  </Typography.Text>
                  <br />
                </>
              )}
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
                    <Input
                      placeholder="Введите критерий"
                      className="events__competition-criteria__input"
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "maxPoints"]}
                    fieldKey={[fieldKey, "maxPoints"]}
                    className="events__competition-criteria__item"
                    rules={[
                      {
                        required: true,
                        message: "Не ввели количество баллов",
                      },
                    ]}
                  >
                    <Input className="events__competition-criteria__inputPoints" />
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
