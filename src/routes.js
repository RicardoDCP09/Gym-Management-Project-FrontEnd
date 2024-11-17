import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('src/views/dashboard/Dashboard'))
const Membership = React.lazy(() => import('src/views/pages/membership/membership.js'))
const Classes = React.lazy(() => import('src/views/pages/classes_management/classes.js'))
const User = React.lazy(() => import('src/views/pages/users/users.js'))
const Inventory = React.lazy(() => import('src/views/pages/inventory/inventory.js'))
const Payment = React.lazy(() => import('src/views/pages/payment/payment.js'))
const Rutine = React.lazy(() => import('src/views/pages/rutine/rutine.js'))
const Exercise = React.lazy(() => import('src/views/pages/exercise/exercise.js'))
const Progress = React.lazy(() => import('src/views/pages/progress/progress.js'))
const Reports = React.lazy(() => import('src/views/pages/reportss/report.js'))
const Staff = React.lazy(() => import('src/views/pages/staff/staff.js'))
const Login = React.lazy(() => import('src/views/pages/login/login.js'))

const routes = [
  { path: '/', exact: true, name: 'Login', element: Login },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/membership', name: 'Membership', element: Membership },
  { path: '/classes', name: 'Classes', element: Classes },
  { path: '/user', name: 'Users', element: User },
  { path: '/inventory', name: 'Inventory', element: Inventory },
  { path: '/payment', name: 'Payment', element: Payment },
  { path: '/rutine', name: 'Rutine', element: Rutine },
  { path: '/exercise', name: 'Exercise', element: Exercise },
  { path: '/progress', name: 'Progress', element: Progress },
  { path: '/reports', name: 'Reports', element: Reports },
  { path: '/staff', name: 'Staff', element: Staff },
]

export default routes
