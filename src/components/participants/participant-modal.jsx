import React from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'
import { Button, Flex, Form, Modal, message, Checkbox } from 'antd'
import ParticipantAdditionalOrganizationInput from '@src/UI/participant/participant-additional-organization-input.jsx'
import ParticipantBirthdayInput from '@src/UI/participant/participant-birthday-input.jsx'
import ParticipantEmailInput from '@src/UI/participant/participant-email-input.jsx'
import ParticipantFirstnameInput from '@src/UI/participant/participant-firstname-input.jsx'
import ParticipantLastnameInput from '@src/UI/participant/participant-lastname-input.jsx'
import ParticipantPatronymicInput from '@src/UI/participant/participant-patronymic-input.jsx'
import ParticipantRegionSelect from '@src/UI/participant/participant-region-select.jsx'
import ParticipantTeacherFirstnameInput from '@src/UI/participant/participant-teacher-firstname-input.jsx'
import ParticipantTeacherLastnameInput from '@src/UI/participant/participant-teacher-lastname-input.jsx'
import ParticipantTeacherPatronymicInput from '@src/UI/participant/participant-teacher-patronymic-input.jsx'
import ParticipantOrganizationInput from '@src/UI/participant/particopant-organization-input.jsx'

function ParticipantModal({ isOpen, onOk, onCancel }) {
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm()
  const [isAgreeChecked, setIsAgreeChecked] = useState(false)

  const onFinish = () => {
    message.success('Всё в порядке!')
    setIsLoading(false)
  }

  const onFinishFailed = () => {
    message.error('Проверьте поля для ввода!')
    setIsLoading(false)
  }

  const create_participant_request = async () => {
    const myHeaders = new Headers()
    myHeaders.append('accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      email: form.getFieldValue('email'),
      first_name: form.getFieldValue('first_name'),
      second_name: form.getFieldValue('second_name'),
      third_name: form.getFieldValue('third_name'),
      region: form.getFieldValue('region'),
      birth_date: dayjs(form.getFieldValue('birth_date')).format('YYYY-MM-DD'),
      educational_institution: form.getFieldValue('organization'),
      additional_educational_institution: form.getFieldValue(
        'additional_organization'
      ),
      supervisor_first_name: form.getFieldValue('supervisor_first_name'),
      supervisor_second_name: form.getFieldValue('supervisor_second_name'),
      supervisor_third_name: form.getFieldValue('supervisor_third_name'),
      hidden: false,
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      credentials: 'include',
    }
    await fetch(`${API_PATH}/participant/participant`, requestOptions)
  }

  return (
    <Modal
      title="Настройка участника"
      className="participants__modal"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={[]}
    >
      <Form
        form={form}
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="participant"
      >
        <ParticipantLastnameInput name="second_name" />
        <ParticipantFirstnameInput name="first_name" />
        <ParticipantPatronymicInput name="third_name" />
        <ParticipantBirthdayInput name="birth_date" />
        <ParticipantEmailInput name="email" />
        <ParticipantRegionSelect name="region" />
        <ParticipantOrganizationInput name="organization" />
        <ParticipantTeacherLastnameInput name="supervisor_second_name" />
        <ParticipantTeacherFirstnameInput name="supervisor_first_name" />
        <ParticipantTeacherPatronymicInput name="supervisor_third_name" />
        <ParticipantAdditionalOrganizationInput name="additional_organization" />
        <Flex vertical gap="large">
          <Checkbox
            checked={isAgreeChecked}
            onChange={() => setIsAgreeChecked(!isAgreeChecked)}
          >
            Даю согласие на обработку и хранение персональных данных, проведение
            фото и видеосъемок с моим участием, на размещение фото и видео
            материалов на сайтах и информационных площадках; использовать
            фотографии и видео на выставках, в презентациях, в докладах и иных
            материалах, не противоречащих действущему законодательству
            Республики Беларусь.
          </Checkbox>
        </Flex>
        <Flex gap="middle">
          <Button
            disabled={!isAgreeChecked}
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={() => {
              setIsLoading(true)
              create_participant_request()
            }}
          >
            Сохранить
          </Button>
          <Button onClick={onCancel}>Отмена</Button>
        </Flex>
      </Form>
    </Modal>
  )
}

export default ParticipantModal
