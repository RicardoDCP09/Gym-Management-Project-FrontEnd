import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCreditCard,
  cilChartPie,
  cilLibrary,
  cilWallet,
  cilWeightlifitng,
  cilSpeedometer,
  cilStar,
  cilAddressBook,
  cilEqualizer,
  cilBell,
  cilBarChart,
  cilChartLine,
  cilBurn,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'


const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Modules',
  },
  {
    component: CNavItem,
    name: 'Membership',
    to: '/membership',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Class',
    to: '/classes',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/user',
    icon: <CIcon icon={cilWeightlifitng} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Inventory',
    to: '/inventory',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payments',
    to: '/payment',
    icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Progress',
    to: '/progress',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Guides',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Rutine',
        to: '/rutine',
        icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Exercises',
        to: '/exercise',
        icon: <CIcon icon={cilBurn} customClassName="nav-icon" />,
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Reports',
    to: '/reports',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Administration',
    icon: <CIcon icon={cilEqualizer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Staff',
        to: '/staff',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Reports',
        to: '/reports',
        icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
      },
    ]
  },
]

export default _nav
