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
    CFormInput,
    CRow,
    CTable,
    CTableDataCell,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CFormSelect,
    CTableBody,
    CFormTextarea,

} from '@coreui/react';

const exercise = () => {


    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Exercise Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4">
                    <CRow className="g-3">
                        <CCol md={12}>
                            <label className='fw-bold'> Exercise Name</label>
                            <CFormInput
                                type="text"
                                placeholder="Name"
                                value={""}
                            />
                        </CCol>
                        <CCol md={12}>
                            <label className='fw-bold'> Description</label>
                            <CFormTextarea
                                id="exampleFormControlTextarea1"
                                placeholder='Describe the Exercise'
                                rows={3}

                            ></CFormTextarea>
                        </CCol>
                        <CCol md={12}>
                            <label className='fw-bold'> Type of Exercise</label>
                            <CFormSelect
                                aria-label="Main Exercise"
                                options={[
                                    'Select a Type',
                                    { label: 'Strong', value: '1' },
                                    { label: 'Cardio', value: '2' },
                                    { label: 'Flexibility', value: '3' }
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
                            <CTableHeaderCell>Description
                                <CIcon icon={cilDescription} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Type
                                <CIcon icon={cilChart} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Actions
                                <CIcon icon={cilColorBorder} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>{"Squats"}</CTableDataCell>
                            <CTableDataCell>{"Bend your knees and lower your body as if you were going to sit down."}</CTableDataCell>
                            <CTableDataCell>{"Strong"}</CTableDataCell>
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
export default exercise 
