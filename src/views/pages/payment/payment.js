import CIcon from '@coreui/icons-react'
import {
    cilClock,
    cilUser,
    cilColorBorder,
    cilCash,
    cilWallet,
    cilEnvelopeClosed,

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

const Payment = () => {


    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Payment Management</h4>
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
                                type="text-number"
                                placeholder="Amount"
                                value={"$"}
                            />
                        </CCol>
                        <CCol md={3}>
                            <CFormSelect
                                aria-label="Select a Payment Method"
                                options={[
                                    'PaymentMethod',
                                    { label: 'Cash', value: '1' },
                                    { label: 'Card', value: '2' },
                                    { label: 'Transfer', value: '3' }
                                ]}
                            />
                        </CCol>
                        <CCol md={3}>
                            <CFormSelect
                                aria-label="Select a Status Payment"
                                options={[
                                    'Status Pay',
                                    { label: 'Confirmed', value: '1' },
                                    { label: 'Waiting', value: '2' },
                                    { label: 'Canceled', value: '3' }
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
                                <CIcon icon={cilUser} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Amount
                                <CIcon icon={cilCash} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Method Pay
                                <CIcon icon={cilWallet} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Status Payment
                                <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Date Payment
                                <CIcon icon={cilClock} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Actions
                                <CIcon icon={cilColorBorder} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>{"Ricardo"}</CTableDataCell>
                            <CTableDataCell>${200}</CTableDataCell>
                            <CTableDataCell>{"Cash"}</CTableDataCell>
                            <CTableDataCell>{"Confirmed"}</CTableDataCell>
                            <CTableDataCell>{"12 / 10 / 24 08:30"}</CTableDataCell>
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
export default Payment
