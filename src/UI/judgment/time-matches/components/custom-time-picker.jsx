import { TimePicker } from 'antd'
import locale from 'antd/es/date-picker/locale/ru_RU'

export const CustomTimePicker = () => {
  return (
    <TimePicker
      locale={{
        ...locale,
        lang: {
          ...locale.lang,
          now: 'Дискв.',
          ok: 'Ок',
        },
      }}
      format={{ format: 'mm:ss.SSS', type: 'mask' }}
    />
  )
}
