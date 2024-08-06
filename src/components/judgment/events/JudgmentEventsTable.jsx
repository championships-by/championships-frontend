import { Table, Flex, List, Button, Typography, Modal, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@constants";

function JudgmentEventsTable({ EventsData }) {
  const navigate = useNavigate();

  const deleteUserConfirm = () => {
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
    });
  };

  const columns = [
    {
      title: "Название мероприятия",
      key: "nameEvent",
      dataIndex: "name",
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
              onClick={() => deleteUserConfirm()}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return <Table dataSource={EventsData} columns={columns} />;
}

export default JudgmentEventsTable;
