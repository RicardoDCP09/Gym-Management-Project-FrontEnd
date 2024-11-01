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


const Membership = () => {

  return (

    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Membership Management</h4>
      </CCardHeader>
      <CCardBody>
        <CForm className="mb-4">
          <CRow className="g-3">
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Name"
                value={"Yearly"}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="number"
                placeholder="Duration(days)"
                value={"365"}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="number"
                placeholder="Price"
                value={"800"}
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
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Duration (days)</CTableHeaderCell>
              <CTableHeaderCell>Price</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>{"Monthly"}</CTableDataCell>
              <CTableDataCell>{30}</CTableDataCell>
              <CTableDataCell>${200}</CTableDataCell>
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
export default Membership
