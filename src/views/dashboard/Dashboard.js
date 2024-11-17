import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
} from '@coreui/react';

import CIcon from '@coreui/icons-react';
import { cilCloudDownload } from '@coreui/icons';
import WidgetsDropdown from '../widgets/WidgetsDropdown';
import MainChart from './MainChart';
import { helpFetch } from '../../helpers/helpFetch.js';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';

const Dashboard = () => {
  const API = helpFetch();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar los datos de usuarios y roles
  const fetchData = async () => {
    try {
      const usersData = await API.get('users');
      const rolesData = await API.get('roles');

      console.log('Fetched users:', usersData); // Verifica si los datos de usuarios son correctos
      console.log('Fetched roles:', rolesData); // Verifica si los datos de roles son correctos

      setUsers(usersData);
      setRoles(rolesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);  // Asegúrate de parar el loading en caso de error
    }
  };

  // Cargar los datos cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  // Crear un mapa de roles para traducir IDs a nombres
  const roleMap = roles.reduce((acc, role) => {
    acc[role.id] = role.name; // Asegúrate de que user.role y role.id coincidan
    return acc;
  }, {});

  // Verificar que el mapa de roles se esté construyendo correctamente
  useEffect(() => {
    console.log('Role Map:', roleMap); // Verifica que el mapa de roles se crea correctamente
  }, [roleMap]);

  // Contar usuarios por nombre de rol
  const userRoleCounts = users.reduce((acc, user) => {
    const roleName = roleMap[user.role] || 'Desconocido'; // Asegúrate de que `user.role` coincida con `role.id`
    console.log('User Role:', user.role, 'Mapped Role Name:', roleName); // Verifica cómo se están mapeando los roles
    acc[roleName] = (acc[roleName] || 0) + 1;
    return acc;
  }, {});

  // Verificar el conteo de roles
  useEffect(() => {
    console.log('User Role Counts:', userRoleCounts); // Verifica el conteo final de los roles
  }, [userRoleCounts]);

  // Preparar los datos para el gráfico
  const chartData = {
    labels: Object.keys(userRoleCounts),
    datasets: [
      {
        label: 'Usuarios por Rol',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colores para cada barra
        data: Object.values(userRoleCounts),
      },
    ],
  };

  // Verificar que los datos de chartData estén correctos
  useEffect(() => {
    console.log('Chart Data:', chartData); // Verifica si los datos para el gráfico están bien formados
  }, [chartData]);

  return (
    <>

      <WidgetsDropdown className="mb-4" />


      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 className="card-title mb-0">Usuarios por Rol</h4>
              <div className="small text-body-secondary">Estadísticas de usuarios</div>
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
  );
};

export default Dashboard;
