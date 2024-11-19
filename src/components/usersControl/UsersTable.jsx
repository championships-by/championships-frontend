import { EditOutlined } from "@ant-design/icons";
import { getUsersSelector } from "@store/users";
import { useSelector } from "react-redux";
import UserModal from "@components/usersControl/UserModal";
import { Locale, ModalType, ROLE_FILTERS } from "@constants";
import { Button, Flex, Table, Tooltip, Form, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getRoleFilters } from "@utils";

function UsersTable() {
  const { t } = useTranslation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const users = useSelector(getUsersSelector);
  const usersData = users.data;

  const openEditModal = (id) => {
    setSelectedUserId(id);
    setIsEditModalOpen(true);
  };

  const changeUserData = () => {
    setIsEditModalOpen(false);
  };

  const columns = [
    {
      title: t("COMMON.SURNAME_NAME_THIRD_NAME"),
      key: "fullname",
      render: (_, { first_name, second_name, third_name }) => (
        <Typography.Text>{`${second_name} ${first_name} ${third_name}`}</Typography.Text>
      ),
      sorter: (a, b) => {
        const firstFullName = `${a.second_name} ${a.first_name} ${a.third_name}`;
        const secondFullName = `${b.second_name} ${b.first_name} ${b.third_name}`;

        return firstFullName.localeCompare(secondFullName);
      },
    },
    {
      title: t("COMMON.ROLE"),
      key: "role",
      render: (_, { role }) =>
        role === "admin" ? (
          <Typography.Text>{t("COMMON.ADMIN")}</Typography.Text>
        ) : role === "judge" ? (
          <Typography.Text>{t("COMMON.JUDGE")}</Typography.Text>
        ) : role === "specialist" ? (
          <Typography.Text>{t("COMMON.MANAGER")}</Typography.Text>
        ) : (
          <Typography.Text />
        ),
      filters: getRoleFilters(ROLE_FILTERS),
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: t("COMMON.ACTIONS"),
      key: "action",
      render: (_, record) => (
        <Flex>
          <Tooltip title={t("COMMON.EDIT")}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(record.id)}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={usersData}
        columns={columns}
        locale={Locale}
        pagination={{
          position: ["bottomCenter"],
          showSizeChanger: false,
          locale: Locale.pagination,
        }}
      />

      <UserModal
        type={ModalType.EDIT}
        userId={selectedUserId}
        isOpen={isEditModalOpen}
        onOk={changeUserData}
        onCancel={() => setIsEditModalOpen(false)}
      />
    </>
  );
}

export default UsersTable;
