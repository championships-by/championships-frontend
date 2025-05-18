import {
  EditOutlined,
  InfoCircleOutlined,
  UsergroupAddOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { paginationLocale, tableLocale, ROUTES } from "@/const";
import { changeDateFormat } from "@/utils";
import { eventApi } from "@/api";
import {
  Button,
  Flex,
  List,
  Table,
  Tooltip,
  Typography,
  Modal,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { getTranslation } from "@/utils";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

function JudgmentEventsTable({ EventsData, onDelete }) {
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
      render: ({ event }) => {
        const startDate = dayjs(event.registration_start_date);
        const finishDate = dayjs(event.registration_finish_date);
        const currentDate = dayjs();

        return (
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
                onClick={() =>
                  navigate(ROUTES.EVENTS_DESCRIPTION.PATH(event.id))
                }
              />
            </Tooltip>
            {finishDate >= currentDate && startDate <= currentDate && (
              <Tooltip title={t("EVENTS.PARTICIPANT_REGISTRATION")}>
                <Button
                  type="text"
                  icon={<UsergroupAddOutlined />}
                  onClick={() =>
                    navigate(ROUTES.EVENTS_REGISTRATION.PATH(event.id))
                  }
                />
              </Tooltip>
            )}
            <Tooltip title={t("COMMON.DELETE")}>
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => deleteEvent(event.id)}
              />
            </Tooltip>
          </Flex>
        );
      },
    },
  ];

  const deleteEvent = async (eventID) => {
    Modal.confirm({
      title: t("COMMON.ARE_YOU_SURE"),
      content: t("EVENTS.ARE_YOU_SURE_REMOVE_EVENT"),
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <OkBtn />
          <CancelBtn />
        </>
      ),
      okText: t("COMMON.YES"),
      onOk: async () => {
        const params = {
          event_id: eventID,
        };

        try {
          await eventApi.deleteEvent(params);
          message.success(t("EVENTS.EVENT_DELETION_SUCCESS"));
        } catch {}

        await onDelete();
      },
      cancelText: t("COMMON.CANCEL"),
    });
  };

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
