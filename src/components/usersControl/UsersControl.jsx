import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getUsersSelector} from '@store/users';
import AdminPanelControls from '@components/adminPanel/AdminPanelControls';
import Loader from '@components/loader/Loader';
import { ModalType } from '@constants';
import { Button, message, Typography, Row, Col, Divider } from 'antd';
import UserModal from './UserModal';
import UsersTable from './UsersTable';

import './sass/users-control.scss';

function UsersControl() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(getUsersSelector)
  const isLoading = users.isLoading;

  useEffect(() => {
    dispatch(getUsers())}
  ,[dispatch])

  return (
    <div className="users-control">
      <Loader show={isLoading} />
      <Row align="bottom">
        <Col>
          <Typography.Title level={2}>
            Управление пользователями
          </Typography.Title>
        </Col>
        <Col flex="auto">
          <AdminPanelControls>
            <Button type="primary" onClick={() => setIsAddUserModalOpen(true)}>
              Добавить пользователя
            </Button>
          </AdminPanelControls>
        </Col>
      </Row>
      <Divider />
      <UsersTable />
      <UserModal
        type={ModalType.ADD}
        isOpen={isAddUserModalOpen}
        onOk={() => setIsAddUserModalOpen(false)}
        onCancel={() => setIsAddUserModalOpen(false)}
      />
    </div>
  );
}

export default UsersControl;