import React from "react";
import { Form, Row, Col, Button, Input, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function CriteriaParametrs() {
  const defaultCriteria = [
    { criterion: "", maxPoints: "" },
    { criterion: "", maxPoints: "" },
    { criterion: "", maxPoints: "" },
  ];

  return (
    <div className="events__competition-criteria__div">
      <Typography.Text>Критерии оценки: </Typography.Text>
      <Typography.Text className="events__competition-criteria__div__maxPoints">
        Укажите максимальное количество баллов:
      </Typography.Text>
      <Form
        name="dynamic_form_nest_item"
        className="events__competition-criteria__form"
        autoComplete="off"
        initialValues={{ criteria: defaultCriteria }}
      >
        <Form.List name="criteria">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Row key={key} className="events__competition-criteria__row">
                  <Col span={10}>
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
                        className="events__competition-criteria__input"
                        placeholder="Введите критерий"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
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
                      <Input
                        className="events__competition-criteria__inputPoints"
                        placeholder="Введите максимальное количество баллов"
                      />
                      <MinusCircleOutlined
                        className="events__competition-criteria__deleteButton"
                        onClick={() => remove(name)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
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
