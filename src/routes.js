import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Membership = React.lazy(() => import('./views/pages/membership/membership.js'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/membership', name: 'Membership', element: Membership },
]

export default routes
