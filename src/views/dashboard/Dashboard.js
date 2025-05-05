import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CRow, CCol, CButton } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { helpFetch } from '../../helpers/helpFetch.js'
import { CChart } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const Dashboard = () => {
  const API = helpFetch()
  const [users, setUsers] = useState([])
  const [staff, setStaff] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const usersData = await API.get('users')
      const staffData = await API.get('staff')
      const rolesData = await API.get('roles')
      setUsers(usersData)
      setStaff(staffData) // Guardar los datos de staff
      setRoles(rolesData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const roleMap = roles.reduce((acc, role) => {
    acc[role.id_role] = role.name_role
    return acc
  }, {})

  // Contar usuarios por nombre de rol
  const userRoleCounts = users.reduce((acc, user) => {
    const roleName = roleMap[user.role] || 'Desconocido'
    acc[roleName] = (acc[roleName] || 0) + 1
    return acc
  }, {})

  // Contar staff por nombre de rol (si aplica)
  const staffRoleCounts = staff.reduce((acc, member) => {
    const roleName = roleMap[member.role] || 'Desconocido'
    acc[roleName] = (acc[roleName] || 0) + 1
    return acc
  }, {})

  // Combinar los conteos de usuarios y staff
  const combinedRoleCounts = { ...userRoleCounts }
  for (const [role, count] of Object.entries(staffRoleCounts)) {
    combinedRoleCounts[role] = (combinedRoleCounts[role] || 0) + count
  }

  const chartData = {
    labels: Object.keys(combinedRoleCounts),
    datasets: [
      {
        label: 'Usuarios y Staff por Rol',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        data: Object.values(combinedRoleCounts),
      },
    ],
  }

  return (
    <>
      <WidgetsDropdown className="mb-4" />

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 className="card-title mb-0">Usuarios y Staff por Rol</h4>
              <div className="small text-body-secondary">Estadísticas de usuarios y staff</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
            </CCol>
          </CRow>
          {loading ? (
            <p>Cargando datos...</p>
          ) : (
            <CChart
              type="bar"
              data={chartData}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: getStyle('--cui-body-color'),
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: getStyle('--cui-border-color-translucent'),
                    },
                    ticks: {
                      color: getStyle('--cui-body-color'),
                    },
                  },
                  y: {
                    grid: {
                      color: getStyle('--cui-border-color-translucent'),
                    },
                    ticks: {
                      color: getStyle('--cui-body-color'),
                    },
                  },
                },
              }}
            />
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
