import CIcon from '@coreui/icons-react'
import {
    cilSpeedometer,
    cilUser,
    cilColorBorder,
    cilWeightlifitng,
    cilChartLine,
    cilChart,

} from '@coreui/icons'
import {
    CCard,
    CButton,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CRow,
    CTable,
    CTableDataCell,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CFormSelect,
    CTableBody,

} from '@coreui/react';

const Rutine = () => {


    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Rutine Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4">
                    <CRow className="g-3">
                        <CCol md={3}>
                            <CFormInput
                                type="text"
                                placeholder="Name"
                                value={""}
                            />
                        </CCol>
                        <CCol md={3}>
                            <CFormSelect
                                aria-label="Select Difficulty"
                                options={[
                                    'Select Difficulty',
                                    { label: 'Easy', value: '1' },
                                    { label: 'Medium', value: '2' },
                                    { label: 'Hard', value: '3' }
                                ]}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                placeholder="Objective"
                                value={""}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                aria-label="Main Exercise"
                                options={[
                                    'Select a Exercise',
                                    { label: 'Burpees', value: '1' },
                                    { label: 'Push-up', value: '2' },
                                    { label: 'Abs', value: '3' }
                                ]}
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                aria-label="Main Traineer"
                                options={[
                                    'Select a Traineer',
                                    { label: 'Jose Perez', value: '1' },
                                    { label: 'Carla Almeno', value: '2' },
                                    { label: 'Josefa Paez', value: '3' }
                                ]}
                            />
                        </CCol>
                        <CCol md={12}>
                            <CButton color="primary" className='w-100'>
                                Add Rutine
                            </CButton>
                        </CCol>
                    </CRow>
                </CForm>
                <CTable hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Name
                                <CIcon icon={cilWeightlifitng} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Difficulty
                                <CIcon icon={cilChartLine} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Objetive
                                <CIcon icon={cilChart} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Traineer
                                <CIcon icon={cilUser} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Main Exercise
                                <CIcon icon={cilSpeedometer} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Actions
                                <CIcon icon={cilColorBorder} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>{"Strong Rutine"}</CTableDataCell>
                            <CTableDataCell>{"Medium"}</CTableDataCell>
                            <CTableDataCell>{"Increase muscle mass"}</CTableDataCell>
                            <CTableDataCell>{"Jose Perez"}</CTableDataCell>
                            <CTableDataCell>{"Push Ups"}</CTableDataCell>
                            <CTableDataCell>
                                <CButton color="info" variant='outline' size="sm" className="me-2" >Edit</CButton>
                                <CButton color="danger" variant='outline' size="sm" >Delete</CButton>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )
}
export default Rutine 
