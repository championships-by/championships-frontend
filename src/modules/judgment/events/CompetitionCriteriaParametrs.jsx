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
  Row,
  Col,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function CriteriaParametrs({ onCriteriaChange, value }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [allScoreCount, setAllScoreCount] = useState(0);

  const handleValuesChange = (changedValues, allValues) => {
    const criteria = allValues.criteria || [];
    const newCriteria = criteria.map((item) => {
      return {
        id: item.id || undefined,
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
          id: item.id,
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
                  <Flex align="center" justify="space-between" offset={1}>
                    <Typography.Text>
                      {t("TOURNAMENTS.EVALUATION_CRITERIA")}
                    </Typography.Text>
                    <Typography.Text className="events__competition-criteria__max-points">
                      {t("TOURNAMENTS.MAX_COUNT_POINTS")}
                    </Typography.Text>
                  </Flex>
                  <br />
                </>
              )}
              {fields.map((field) => (
                <Row
                  key={field.key}
                  className="events__competition-criteria__space"
                >
                  <Col span={1}>
                    <Tooltip title={t("COMMON.DELETE")}>
                      <MinusCircleOutlined
                        onClick={() => {
                          if (fields.length > 1) {
                            remove(field.name);
                          } else {
                            message.warning(
                              t(
                                "MESSAGES.EVALUAAT_LEAST_ONE_EVALUATION_CRITERIATION_CRITERIA"
                              )
                            );
                          }
                        }}
                      />
                    </Tooltip>
                  </Col>
                  <Col span={14} offset={1}>
                    <Form.Item
                      {...field}
                      name={[field.name, "criterion"]}
                      rules={[
                        {
                          required: true,
                          message: t("RULES.DONT_INSERT_CRITERION"),
                        },
                      ]}
                    >
                      <Input
                        placeholder={t("TOURNAMENTS.INSERT_CRITERION")}
                        className="events__competition-criteria__input"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5} offset={3}>
                    <Form.Item
                      {...field}
                      name={[field.name, "maxPoints"]}
                      rules={[
                        { required: true, message: t("RULES.INVALID_VALUE") },
                      ]}
                    >
                      <Input
                        type="number"
                        className="events__competition-criteria__inputPoints"
                        min={0}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ))}
              <br />
              <Typography.Text className="events__competition-criteria__score-count">
                {t("COMMON.TOTAL")}: {allScoreCount}
              </Typography.Text>
              <Form.Item>
                <Button
                  className="events__competition-criteria__addButton"
                  type="dashed"
                  onClick={() => add({ criterion: "", maxPoints: "" })}
                  block
                  icon={<PlusOutlined />}
                >
                  {t("TOURNAMENTS.ADD_CRITERION")}
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
