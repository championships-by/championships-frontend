import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { eventApi } from "@api";
import { ROUTES } from "@constants";
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
          id: id,
        });
        try {
          eventApi.deleteEvent(body);
          message.success("Мероприятие успешно удалено.");
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
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
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
      dataIndex: "date",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: "Действия",
      key: "action",
      render: ({ id }) => (
        <Flex>
          <Tooltip title={ROUTES.JUDGMENT_EVENT_SETTINGS.TITLE}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => navigate(ROUTES.JUDGMENT_EVENT_SETTINGS.PATH(id))}
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

  return <Table dataSource={EventsData} columns={columns} />;
}

export default JudgmentEventsTable;
