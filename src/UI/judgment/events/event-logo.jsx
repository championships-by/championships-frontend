import { Typography, Upload, message, Button, Flex } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { UploadOutlined } from '@ant-design/icons'
import { FILE_UPLOADING } from '@components/enums.js'
import './sass/events.scss'

function EventLogo({ name }) {
  return (
    <FormItem name={name} hasFeedback validateFirst>
      <Flex gap="middle">
        <Typography.Text>Логотип: </Typography.Text>
        <Upload
          {...FILE_UPLOADING.UPLOAD}
          onChange={(info) => {
            if (info.file.status !== FILE_UPLOADING.UPLOADING) {
            }
            if (info.file.status === FILE_UPLOADING.DONE) {
              message.success(`${info.file.name} Файл загружен успешно`)
            } else if (info.file.status === FILE_UPLOADING.ERROR) {
              message.error(`${info.file.name} Ошибка загрузки файла`)
            }
          }}
        >
          <Button icon={<UploadOutlined />}>Нажмите что бы загрузить</Button>
        </Upload>
      </Flex>
    </FormItem>
  )
}
export default EventLogo
