import { Typography, Space, Input, Flex } from 'antd'
import { useState } from 'react'

function ReglamentName() {
  const [inputValue, setInputValue] = useState('')
  const [hasHttp, setHasHttp] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    if (!value.startsWith('http://') || !value.startsWith('https://')) {
      setHasHttp(true)
    } else {
      setHasHttp(false)
    }
  }
  return (
    <div className="events__competition-reglament__div">
      <Typography.Text className="events__competition-reglament__text">
        Регламент
      </Typography.Text>
      <Flex vertical>
        <Space.Compact>
          <Input
            placeholder={'Вставьте ссылку на регламент'}
            value={inputValue}
            onChange={handleChange}
          ></Input>
        </Space.Compact>
        {hasHttp && (
          <Typography.Text type="danger">
            Ссылка не соответствуют допустимому шаблону
          </Typography.Text>
        )}
        <Typography.Text type="danger">
          *Внимательно проверьте права доступа к файлу
        </Typography.Text>
      </Flex>
    </div>
  )
}

export default ReglamentName
