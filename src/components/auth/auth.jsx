import './sass/auth.scss'
import { Form, message, Button } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useEffect, useState } from 'react'
import logo from '@src/assets/img/logo.png'
import AuthEmailInput from '@src/UI/auth/auth-email-input'
import AuthPasswordInput from '@src/UI/auth/auth-password-input'
import { useNavigate } from 'react-router-dom'
import Loader from '@components/loader/loader'
import { ROUTES } from '@components/enums'

function Auth() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    if (isLoading) {
      fetch(`${API_PATH}/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        credentials: 'include',
      })
        .then((response) => {
          if (response.ok) {
            navigate('/settings')
          } else {
            setIsLoading(false)
          }
        })
        .catch(() => {
          message.error(
            'Ошибка: Невозможно получить данные. Обратитесь к администратору...'
          )
        })
    }
  }, [isLoading, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsFormLoading(true)

    const requestBody = {
      email: email,
      password: password,
    }

    try {
      const response = await fetch(`${API_PATH}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        redirect: 'follow',
        credentials: 'include',
      })

      if (response.ok) {
        navigate(ROUTES.USER_SETTINGS.PATH)
      } else {
        message.error('Ошибка: Неверный email или пароль.')
      }
    } catch (error) {
      message.error(
        'Ошибка: Невозможно авторизовать пользователя. Попробуйте еще раз...'
      )
    }

    setIsFormLoading(false)
  }

  const onFinish = () => {
    setIsFormLoading(false)
  }

  const onFinishFailed = () => {
    message.error('Проверьте поля для ввода!')

    setIsFormLoading(false)
  }

  return (
    <>
      <Loader show={isLoading} />
      <div className="auth">
        <div className="auth__container">
          <div className="auth__header">
            <div className="auth__logo">
              <a href="https://zubronok.by/" target="_blank">
                <img src={logo} alt="" />
              </a>
            </div>
          </div>
          <div className="auth__body">
            <Form
              layout="vertical"
              requiredMark="Default"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <AuthEmailInput value={email} onChange={setEmail} />
              <AuthPasswordInput value={password} onChange={setPassword} />

              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isFormLoading}
                  onClick={(e) => handleSubmit(e)}
                  className="auth__button"
                >
                  Войти
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
