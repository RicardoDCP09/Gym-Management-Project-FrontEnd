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
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CFormTextarea,

} from '@coreui/react';
import { useState } from 'react'

const Rutine = () => {
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)

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
                                <CButton color="info" onClick={() => setVisibleEdit(!visibleEdit)} variant='outline' size="sm" className="me-2" >Edit</CButton>
                                <CModal
                                    backdrop="static"
                                    visible={visibleEdit}
                                    onClose={() => setVisibleEdit(false)}
                                    aria-labelledby="Modal Info"
                                >
                                    <CModalHeader>
                                        <CModalTitle id="Create Users">Edit Membership</CModalTitle>
                                    </CModalHeader>
                                    <CModalBody>
                                        <CRow className="mb-3">
                                            <CCol md={6} className='mb-3'>
                                                <CFormInput
                                                    type="text"
                                                    placeholder="Name"
                                                    value={""}
                                                />
                                            </CCol>
                                            <CCol md={6} className='mb-3'>
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
                                            <CCol md={6} className='mb-3'>
                                                <CFormInput
                                                    type="text"
                                                    placeholder="Objective"
                                                    value={""}
                                                />
                                            </CCol>
                                            <CCol md={6} className='mb-3'>
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
                                            <CCol md={12} className='mb-3'>
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
                                        </CRow>
                                    </CModalBody>
                                    <CModalFooter>
                                        <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
                                            Close
                                        </CButton>
                                        <CButton color="primary">Save Edit</CButton>
                                    </CModalFooter>

                                </CModal>
                                <CButton color="danger" onClick={() => setVisibleDelete(!visibleDelete)} variant='outline' size="sm">Delete</CButton>
                                <CModal
                                    backdrop="static"
                                    visible={visibleDelete}
                                    onClose={() => setVisibleDelete(false)}
                                    aria-labelledby="Modal Info"
                                >
                                    <CModalHeader>
                                        <CModalTitle id="Create Users">Do you want delete?</CModalTitle>
                                    </CModalHeader>
                                    <CModalBody>
                                        <CRow className="mb-3">
                                            <label className='fw-bold mb-2'>Please write "confirm" if you want to delete this membership</label>
                                            <CCol className='mb-3' md={12}>
                                                <CForm>
                                                    <CFormTextarea
                                                        id="Delete"
                                                        rows={1}
                                                    ></CFormTextarea>
                                                </CForm>
                                            </CCol>
                                        </CRow>
                                    </CModalBody>
                                    <CModalFooter>
                                        <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                                            Close
                                        </CButton>
                                        <CButton color="primary">Delete</CButton>
                                    </CModalFooter>
                                </CModal>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )
}
export default Rutine 
