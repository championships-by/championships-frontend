import {
  EditOutlined,
  InfoCircleOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { paginationLocale, tableLocale, ROUTES } from "@constants";
import { changeDateFormat } from "@utils";
import { Button, Flex, List, Table, Tooltip, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { getTranslation } from "@utils";
import { useTranslation } from "react-i18next";

function JudgmentEventsTable({ EventsData }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      title: t("EVENTS.NAME_OF_EVENT"),
      key: "nameEvent",
      render: (data) => data.event?.name,
      sorter: (a, b) => a.event.name.localeCompare(b.event.name),
    },
    {
      title: t("COMMON.NOMINATIONS"),
      key: "nominations",
      render: (_, { nominations }) => (
        <List
          locale={{
            emptyText: t("COMMON.NO_NOMINATIONS"),
          }}
          split={false}
          dataSource={nominations}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>{`${item.name}`}</Typography.Text>
            </List.Item>
          )}
        />
      ),
    },
    {
      title: t("EVENTS.DATE_OF_EVENT"),
      key: "dateEvent",
      render: (data) =>
        changeDateFormat(data.event?.holding_start_date) !==
        changeDateFormat(data.event?.holding_finish_date)
          ? `${t("COMMON.FROM")} ${changeDateFormat(
              data.event?.holding_start_date
            )} ${t("COMMON.TO")} ${changeDateFormat(
              data.event?.holding_finish_date
            )}`
          : changeDateFormat(data.event?.holding_start_date),
      sorter: (a, b) =>
        new Date(a.event.holding_start_date) -
        new Date(b.event.holding_start_date),
    },
    {
      title: t("COMMON.ACTIONS"),
      key: "action",
      render: ({ event }) => (
        <Flex>
          <Tooltip title={t("COMMON.EDIT")}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() =>
                navigate(ROUTES.JUDGMENT_EVENT_SETTINGS.PATH(event.id))
              }
            />
          </Tooltip>
          <Tooltip title={t("EVENTS.EVENT_DESCRIPTION")}>
            <Button
              type="text"
              icon={<InfoCircleOutlined />}
              onClick={() => navigate(ROUTES.EVENTS_DESCRIPTION.PATH(event.id))}
            />
          </Tooltip>
          <Tooltip title={t("EVENTS.PARTICIPANT_REGISTRATION")}>
            <Button
              type="text"
              icon={<UsergroupAddOutlined />}
              onClick={() =>
                navigate(ROUTES.EVENTS_REGISTRATION.PATH(event.id))
              }
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return (
    <Table
      locale={getTranslation(tableLocale, t)}
      dataSource={EventsData}
      pagination={{
        position: ["bottomCenter"],
        locale: getTranslation(paginationLocale, t),
      }}
      columns={columns}
    />
  );
}

export default JudgmentEventsTable;
