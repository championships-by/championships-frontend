import React from 'react'
import { Modal } from 'antd'

function TeamDeleteModal() {
  return Modal.confirm({
    title: 'Вы уверены?',
    content: 'Вы уверены что хотите удалить эту команду?',
    footer: (_, { OkBtn, CancelBtn }) => (
      <>
        <OkBtn />
        <CancelBtn />
      </>
    ),
    okText: 'Да',
    cancelText: 'Отмена',
  })
}
export default TeamDeleteModal
