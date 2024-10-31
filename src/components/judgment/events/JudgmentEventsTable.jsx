import {
  EditOutlined,
  InfoCircleOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Locale, ROUTES } from "@constants";
import { changeDateFormat } from "@utils";
import { Button, Flex, List, Table, Tooltip, Typography } from "antd";
import { useNavigate } from "react-router-dom";

function JudgmentEventsTable({ EventsData }) {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Название мероприятия",
      key: "nameEvent",
      render: (data) => data.event?.name,
      sorter: (a, b) => a.event.name.localeCompare(b.event.name),
    },
    {
      title: "Компетенции",
      key: "nominations",
      render: (_, { nominations }) => (
        <List
          locale={{
            emptyText: "Компетенции пока отсутствуют",
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
      title: "Дата мероприятия",
      key: "dateEvent",
      render: (data) =>
        changeDateFormat(data.event?.holding_start_date) !==
        changeDateFormat(data.event?.holding_finish_date)
          ? `с ${changeDateFormat(
              data.event?.holding_start_date
            )} по ${changeDateFormat(data.event?.holding_finish_date)}`
          : changeDateFormat(data.event?.holding_start_date),
      sorter: (a, b) =>
        new Date(a.event.holding_start_date) -
        new Date(b.event.holding_start_date),
    },
    {
      title: "Действия",
      key: "action",
      render: ({ event }) => (
        <Flex>
          <Tooltip title={ROUTES.JUDGMENT_EVENT_SETTINGS.TITLE}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() =>
                navigate(ROUTES.JUDGMENT_EVENT_SETTINGS.PATH(event.id))
              }
            />
          </Tooltip>
          <Tooltip title={ROUTES.EVENTS_DESCRIPTION.TITLE}>
            <Button
              type="text"
              icon={<InfoCircleOutlined />}
              onClick={() => navigate(ROUTES.EVENTS_DESCRIPTION.PATH(event.id))}
            />
          </Tooltip>
          <Tooltip title={ROUTES.EVENTS_REGISTRATION.TITLE}>
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
      locale={Locale}
      dataSource={EventsData}
      pagination={{
        position: ["bottomCenter"],
        locale: Locale.pagination,
      }}
      columns={columns}
    />
  );
}

export default JudgmentEventsTable;
