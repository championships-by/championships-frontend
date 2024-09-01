import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { eventApi } from "@api";
import { Locale, ROUTES } from "@constants";
import { changeDateFormat } from "@utils";
import {
  Button,
  Flex,
  List,
  Modal,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";

function JudgmentEventsTable({ EventsData }) {
  const navigate = useNavigate();

  const deleteEventConfirm = (id) => {
    Modal.confirm({
      title: "Вы уверены?",
      content: "Вы уверены что хотите удалить это мероприятие?",
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <OkBtn />
          <CancelBtn />
        </>
      ),
      okText: "Да",
      cancelText: "Отмена",
      onOk: () => {
        const body = JSON.stringify({
          id,
        });
        try {
          eventApi.deleteEvent(body);
          message.success("Мероприятие успешно удалено");
        } catch (error) {
          message.error("Ошибка: Невозможно удалить мероприятие.");
        }
      },
    });
  };
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
          <Tooltip title="Удалить мероприятие">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => deleteEventConfirm(id)}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return (
    <Table
      locale={Locale.tableLocale}
      dataSource={EventsData}
      columns={columns}
    />
  );
}

export default JudgmentEventsTable;
