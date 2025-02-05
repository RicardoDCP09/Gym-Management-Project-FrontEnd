import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react';
import { getStyle } from '@coreui/utils';
import { CChartLine } from '@coreui/react-chartjs';
import CIcon from '@coreui/icons-react';
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons';
import { helpFetch } from '../../helpers/helpFetch';

const WidgetsDropdown = (props) => {
  const API = helpFetch();
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [staff, setStaff] = useState([]); // Nuevo estado para el staff
  const widgetChartRef1 = useRef(null);
  const widgetChartRef2 = useRef(null);
  const widgetChartRef3 = useRef(null);
  const widgetChartRef4 = useRef(null); // Referencia para el gráfico de staff

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await API.get('users');
        setUsers(usersData);

        const paymentsData = await API.get('payments');
        setPayments(paymentsData);

        const classesData = await API.get('classes');
        setClasses(classesData);

        const staffData = await API.get('staff'); // Llamada al endpoint de staff
        setStaff(staffData); // Guardar los datos de staff
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalUsers = users.length;
  const totalStaff = staff.length; // Calcular el total de staff
  const totalPayments = payments.reduce((acc, payment) => acc + (parseFloat(payment.amount) || 0), 0);
  const totalClasses = classes.length; // Calculamos el total de clases
  const totalPeople = totalUsers + totalStaff; // Total combinado de usuarios y staff

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="primary"
          value={
            <>
              {totalPeople}{' '} {/* Mostrar total combinado */}
              <span className="fs-6 fw-normal">
                (-12.4% <CIcon icon={cilArrowBottom} />)
              </span>
            </>
          }
          title="Total Registered Users and Staff"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Users and Staff Over Time',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [
                      totalPeople,
                      totalPeople * 0.9,
                      totalPeople * 0.85,
                      totalPeople * 0.95,
                      totalPeople * 1.1,
                      totalPeople * 1.2,
                      totalPeople * 1.3,
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>

      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={
            <>
              ${totalPayments.toFixed(2)}{' '}
              <span className="fs-6 fw-normal">
                (40.9% <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title="Total Payments"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Income Over Time',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [
                      totalPayments * 0.8,
                      totalPayments * 0.9,
                      totalPayments * 1.0,
                      totalPayments * 1.1,
                      totalPayments * 1.2,
                      totalPayments * 1.3,
                      totalPayments * 1.4,
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>

      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={totalClasses}
          title="Total Classes"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              ref={widgetChartRef3}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Classes Over Time',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-warning'),
                    data: [
                      totalClasses * 0.8,
                      totalClasses * 0.9,
                      totalClasses * 1.0,
                      totalClasses * 1.1,
                      totalClasses * 1.2,
                      totalClasses * 1.3,
                      totalClasses * 1.4,
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  );
};

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
};

export default WidgetsDropdown; 