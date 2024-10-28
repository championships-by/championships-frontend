import React, { useEffect, useState } from "react";
import {
  Form,
  Space,
  Button,
  Input,
  Typography,
  Tooltip,
  message,
  Flex,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function CriteriaParametrs({ onCriteriaChange, value }) {
  const [form] = Form.useForm();
  const [allScoreCount, setAllScoreCount] = useState(0);

  const handleValuesChange = (changedValues, allValues) => {
    const criteria = allValues.criteria || [];
    const newCriteria = criteria.map((item) => {
      return {
        name: item.criterion || "",
        max_score: parseInt(item.maxPoints, 10) || 0,
      };
    });

    const totalScore = criteria.reduce(
      (acc, curr) => acc + (parseInt(curr.maxPoints, 10) || 0),
      0
    );
    setAllScoreCount(totalScore);

    onCriteriaChange(newCriteria);
  };

  useEffect(() => {
    if (value && value.length) {
      form.setFieldsValue({
        criteria: value.map((item) => ({
          criterion: item.name,
          maxPoints: item.max_score,
        })),
      });

      const totalScore = value.reduce(
        (acc, curr) => acc + (curr.max_score || 0),
        0
      );
      setAllScoreCount(totalScore);
    }
  }, [value, form]);

  return (
    <div className="events__competition-criteria__div">
      <Form
        form={form}
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
                  <Flex align="center">
                    <Typography.Text>Критерии оценки:</Typography.Text>
                    <Typography.Text className="events__competition-criteria__max-points">
                      Максимальное
                      <br />
                      количество
                      <br />
                      баллов:
                    </Typography.Text>
                  </Flex>
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
                    rules={[{ required: true, message: "Неверное значение" }]}
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
              <br />
              <Typography.Text className="events__competition-criteria__score-count">
                Итого: {allScoreCount}
              </Typography.Text>
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
