import React from "react";
import { Form, Space, Button, Input, Typography, Tooltip, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function CriteriaParametrs({ onCriteriaChange }) {
  const handleValuesChange = (changedValues, allValues) => {
    const criteria = allValues.criteria || [];
    const newCriteria = criteria.map((item) => {
      return {
        name: item.criterion || "",
        max_score: parseInt(item.maxPoints, 10) || 0,
      };
    });

    onCriteriaChange(newCriteria);
  };

  return (
    <div className="events__competition-criteria__div">
      <Form
        name="dynamic_form_nest_item"
        className="events__competition-criteria__form"
        autoComplete="off"
        onValuesChange={handleValuesChange}
      >
        <Form.List
          name="criteria"
          initialValue={[{ criterion: "", maxPoints: "" }]}
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
              {fields.map((field) => (
                <Space
                  key={field.key}
                  align="baseline"
                  className="events__competition-criteria__space"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "criterion"]}
                    rules={[{ required: true, message: "Не ввели критерий" }]}
                  >
                    <Input
                      placeholder="Введите критерий"
                      className="events__competition-criteria__input"
                    />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "maxPoints"]}
                    rules={[
                      { required: true, message: "Не ввели количество баллов" },
                    ]}
                  >
                    <Input
                      type="number"
                      className="events__competition-criteria__inputPoints"
                      min={0}
                    />
                  </Form.Item>
                  <Tooltip title="Удалить">
                    <MinusCircleOutlined
                      onClick={() => {
                        if (fields.length > 1) {
                          remove(field.name);
                        } else {
                          message.warning(
                            "Минимум один критерий оценки должен быть установлен"
                          );
                        }
                      }}
                    />
                  </Tooltip>
                </Space>
              ))}
              <Form.Item>
                <Button
                  className="events__competition-criteria__addButton"
                  type="dashed"
                  onClick={() => add({ criterion: "", maxPoints: "" })}
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
