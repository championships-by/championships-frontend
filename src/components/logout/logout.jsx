import { useNavigate } from 'react-router-dom'
import Loader from '@components/loader/loader'
import { ROUTES, RESPONSE_STATUS } from '@components/enums'

const Logout = () => {
  const navigate = useNavigate()
  fetch(`${API_PATH}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    credentials: 'include',
  }).then((response) => {
    if (response.status === RESPONSE_STATUS.STATUS_OK) {
      navigate(ROUTES.AUTHORIZATION.PATH)
    }
  })

  return <Loader show={true} />
}

export default Logout
