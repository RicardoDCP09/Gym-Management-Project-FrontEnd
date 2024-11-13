import CIcon from '@coreui/icons-react'
import {
    cilSpeedometer,
    cilUser,
    cilColorBorder,
    cilWeightlifitng,
    cilDescription,
    cilChart,

} from '@coreui/icons'
import {
    CCard,
    CButton,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CRow,
    CTable,
    CTableDataCell,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CFormSelect,
    CTableBody,
    CFormTextarea,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CFormInput

} from '@coreui/react';
import { useState } from 'react'

const report = () => {
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)

    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Report Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4">
                    <CRow className="g-3">
                        <CCol md={12}>
                            <label className='fw-bold'> Report Type</label>
                            <CFormSelect
                                aria-label="Report Type"
                                options={[
                                    'Select a Type',
                                    { label: 'Progress', value: '1' },
                                    { label: 'Assistance', value: '2' },
                                    { label: 'Financial', value: '3' }
                                ]}
                            />
                        </CCol>
                        <CCol md={12}>
                            <label className='fw-bold'> Users </label>
                            <CFormSelect
                                aria-label="Users"
                                options={[
                                    'Select a User',
                                    { label: 'Ricardo Colmenares', value: '1' },
                                    { label: 'Jose Alcachofa', value: '2' },
                                    { label: 'James Stewart', value: '3' }
                                ]}
                            />
                        </CCol>
                        <CCol md={12}>
                            <label className='fw-bold'> Description Report</label>
                            <CFormTextarea
                                id="exampleFormControlTextarea1"
                                placeholder='Describe the Report'
                                rows={3}
                            ></CFormTextarea>
                        </CCol>
                        <CCol md={12}>
                            <CButton color="primary" className='w-100'>
                                Add report
                            </CButton>
                        </CCol>
                    </CRow>
                </CForm>
                <CTable hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Type
                                <CIcon icon={cilChart} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>User
                                <CIcon icon={cilWeightlifitng} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Description
                                <CIcon icon={cilDescription} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Actions
                                <CIcon icon={cilColorBorder} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>{"Progress"}</CTableDataCell>
                            <CTableDataCell>{"Ricardo Colmenares"}</CTableDataCell>
                            <CTableDataCell>{"Report of progress Quarterly."}</CTableDataCell>
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
                                            <CCol md={12} className='mb-3'>
                                                <label className='fw-bold'> Report Type</label>
                                                <CFormSelect
                                                    aria-label="Report Type"
                                                    options={[
                                                        'Select a Type',
                                                        { label: 'Progress', value: '1' },
                                                        { label: 'Assistance', value: '2' },
                                                        { label: 'Financial', value: '3' }
                                                    ]}
                                                />
                                            </CCol>
                                            <CCol md={12} className='mb-3'>
                                                <label className='fw-bold'> Users </label>
                                                <CFormSelect
                                                    aria-label="Users"
                                                    options={[
                                                        'Select a User',
                                                        { label: 'Ricardo Colmenares', value: '1' },
                                                        { label: 'Jose Alcachofa', value: '2' },
                                                        { label: 'James Stewart', value: '3' }
                                                    ]}
                                                />
                                            </CCol>
                                            <CCol md={12} className='mb-3'>
                                                <label className='fw-bold'> Description Report</label>
                                                <CFormTextarea
                                                    id="Descrip Report"
                                                    placeholder='Describe the Report'
                                                    rows={3}
                                                ></CFormTextarea>
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
        </CCard >
    )
}
export default report 
