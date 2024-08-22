import React from "react";
import { Modal, Table } from "antd";

function ParticipantModal({ isOpen, onOk, onCancel, name }) {
  return (
    <div>
      <Modal title={name} open={isOpen} onOk={onOk} onCancel={onCancel}>
        <Table></Table>
      </Modal>
    </div>
  );
}

export default ParticipantModal;
