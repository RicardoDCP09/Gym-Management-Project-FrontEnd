import CIcon from '@coreui/icons-react'
import {
    cilClock,
    cilBadge,
    cilGroup,
    cilCheckAlt,
    cilTag,
    cilColorBorder,
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

const Classes = () => {
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)

    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Classes Management</h4>
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
                            <CFormInput
                                type="text"
                                placeholder="Traineer"
                                value={""}
                            />
                        </CCol>
                        <CCol md={3}>
                            <CFormInput
                                type="number"
                                placeholder="amount(People)"
                                value={""}
                            />
                        </CCol>
                        <CCol md={3}>
                            <CFormSelect
                                aria-label="Select a Status for the class"
                                options={[
                                    'Status',
                                    { label: 'Available', value: '1' },
                                    { label: 'Cancelled', value: '2' },
                                    { label: 'Complete', value: '3' }
                                ]}
                            />
                        </CCol>
                        <CCol md={3}>
                            <CFormInput
                                type="datetime-local"
                                placeholder="date(class)"
                                value={""}
                            />
                        </CCol>
                        <CCol md={3}>
                            <CButton color="primary">
                                Add
                            </CButton>
                        </CCol>
                    </CRow>
                </CForm>
                <CTable hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Name
                                <CIcon icon={cilTag} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Amount (People)
                                <CIcon icon={cilGroup} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Status
                                <CIcon icon={cilCheckAlt} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Traineer
                                <CIcon icon={cilBadge} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Daytime
                                <CIcon icon={cilClock} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Actions
                                <CIcon icon={cilColorBorder} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>{"Spinning"}</CTableDataCell>
                            <CTableDataCell>{30}</CTableDataCell>
                            <CTableDataCell>{"Available"}</CTableDataCell>
                            <CTableDataCell>{"Jose Alvarez"}</CTableDataCell>
                            <CTableDataCell>{"12 / 10 / 24 08:30"}</CTableDataCell>
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
                                                <CFormInput
                                                    type="text"
                                                    placeholder="Traineer"
                                                    value={""}
                                                />
                                            </CCol>
                                            <CCol md={6} className='mb-3'>
                                                <CFormInput
                                                    type="number"
                                                    placeholder="amount(People)"
                                                    value={""}
                                                />
                                            </CCol>
                                            <CCol md={6} className='mb-3'>
                                                <CFormSelect
                                                    aria-label="Select a Status for the class"
                                                    options={[
                                                        'Status',
                                                        { label: 'Available', value: '1' },
                                                        { label: 'Cancelled', value: '2' },
                                                        { label: 'Complete', value: '3' }
                                                    ]}
                                                />
                                            </CCol>
                                            <CCol md={12} className='mb-3'>
                                                <CFormInput
                                                    type="datetime-local"
                                                    placeholder="date(class)"
                                                    value={""}
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
export default Classes
