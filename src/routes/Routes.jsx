import { createBrowserRouter } from 'react-router-dom'
import DragAndDrop from '../components/DragAndDrop'
import Login from '../page/auth/Login'
import ErrorPage from '../page/ErrorPage'
import RegistrationForm from '../page/auth/RegistrationForm'
import PrivateRoute from './PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute><DragAndDrop /></PrivateRoute>,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <RegistrationForm />
  },
])
