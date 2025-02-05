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
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
    CFormTextarea,

} from '@coreui/react';
import { useState, useEffect } from 'react'
import { helpFetch } from '../../../helpers/helpFetch';

const Payment = () => {
    const API = helpFetch()
    const [payment, setPayment] = useState([])
    const [userPay, setUserPay] = useState([])
    const [statusPayment, setStatusPayment] = useState([])
    const [methodPay, setMethodPay] = useState([])
    const [currentPay, setCurrentPay] = useState(null)
    const [visible, setVisible] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [newPay, setNewPay] = useState({ amount: '', payment_method: '', status: '', daypayment: '' })
    const [deleteConfirmation, setDeleteConfirmation] = useState('')

    useEffect(() => {
        const fetchPayment = async () => {
            const data = await API.get('payments')
            const combinedData = data.map(payment => ({
                ...payment,
                daypayment: payment.daypayment ? payment.daypayment.split('T')[0] : '',
            }));
            setPayment(combinedData)
        }
        fetchPayment()
    }, [])

    useEffect(() => {
        const fetchUserPay = async () => {
            const data = await API.get('users')
            setUserPay(data)
        }
        fetchUserPay()
    }, [])

    useEffect(() => {
        const fetchStatusPay = async () => {
            const data = await API.get('status_payment')
            setStatusPayment(data)
        }
        fetchStatusPay()
    }, [])

    useEffect(() => {
        const fetchMethodPay = async () => {
            const data = await API.get('pay_methods')
            setMethodPay(data)
        }
        fetchMethodPay()
    }, [])

    const handleAddPay = async () => {
        const addPay = await API.post('payments', newPay);
        setPayment([...payment, addPay]);
        setNewPay({ amount: '', payment_method: '', status: '', daypayment: '' });
        setVisible(false)
    }

    const handleEditPay = async () => {
        if (!currentPay || !currentPay.id_payment) {
            console.error("No payment selected for edit");
            return;
        }
        try {

            const updatedPay = await API.put(
                'payments',
                currentPay,
                currentPay.id_payment);

            setPayment((prevPay) =>
                prevPay.map((pay) =>
                    pay.id_payment === currentPay.id_payment ? { ...pay, ...updatedPay } : pay
                )
            );
            setVisibleEdit(false);
        } catch (error) {
            console.error("Error during payment edit:", error);
        }
    };

    const handleDeletePay = async () => {
        if (deleteConfirmation === 'confirm') {
            const payId = currentPay.id_payment
            try {
                const deletePay = await API.del('payments', payId)
                setPayment(payment.filter((pay) => pay.id_payment !== payId))
                setVisibleDelete(false)
            } catch (error) {
                console.error("Error deleting payment ", error)
            }
        }
    }

    const getUserPay = (userId) => {
        const user = userPay.find((user) => user.id_user === userId);
        return user ? user.name + ' ' + user.lastname : 'Unknown';
    };

    const getstatusPay = (statusId) => {
        const statusPay = statusPayment.find((status) => status.id === statusId)
        return statusPay ? statusPay.status : ' Unknown';
    }

    const getPayMethod = (methodId) => {
        const payMethod = methodPay.find((status) => status.id === methodId)
        return payMethod ? payMethod.status : ' Unknown';
    }

    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Payment Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4" onSubmit={(e) => { e.preventDefault(); handleAddPay() }}>
                    <CRow className="g-3">
                        <CCol className="d-flex justify-content-start">
                            <CButton className='me-2' color="primary" onClick={() => setVisible(!visible)}>Add Pay</CButton>
                        </CCol>
                        <CModal
                            backdrop="static"
                            visible={visible}
                            onClose={() => setVisible(false)}
                            aria-labelledby="Modal create Payment"
                        >
                            <CModalHeader>
                                <CModalTitle id="Create Pay">New Payment</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CRow className="mb-3">
                                    <CCol md={6}>
                                        <CFormSelect
                                            aria-label="Select a User"
                                            value={newPay?.user_id}
                                            onChange={(e) => {
                                                const user_id = e.target.value;
                                                setNewPay({ ...newPay, user_id });
                                            }}
                                        >
                                            <option value="">Select a User</option>
                                            {userPay.map((users) => (
                                                <option key={users.id_user} value={users.id_user}>
                                                    {users.name + ' ' + users.lastname}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text-number"
                                            placeholder="Amount"
                                            value={newPay?.amount || ''}
                                            onChange={(e) => setNewPay({ ...newPay, amount: e.target.value })}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CCol md={6}>
                                        <CFormSelect
                                            aria-label="Select a Status for the class"
                                            value={newPay?.status || ''}
                                            onChange={(e) => setNewPay({ ...newPay, status: e.target.value })}
                                        ><option value="" >Select a Status </option>
                                            {statusPayment.map((status) => (
                                                <option key={status.id}
                                                    value={status.id}>
                                                    {status.status}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormSelect
                                            aria-label="Select a Status for the class"
                                            value={newPay?.payment_method || ''}
                                            onChange={(e) => setNewPay({ ...newPay, payment_method: e.target.value })}
                                        ><option value="" >Select a Payment Method </option>
                                            {methodPay.map((method) => (
                                                <option key={method.id}
                                                    value={method.id}>
                                                    {method.status}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CCol md={6}>
                                        <CFormInput
                                            type="date"
                                            placeholder="date(class)"
                                            value={newPay?.daypayment ? newPay.daypayment.split('T')[0] : '' || ''}
                                            onChange={(e) => setNewPay({ ...newPay, daypayment: e.target.value })}
                                        />
                                    </CCol>
                                </CRow>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Close
                                </CButton>
                                <CButton color="primary" onClick={() => { handleAddPay() }}>Add Item</CButton>
                            </CModalFooter>
                        </CModal>
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
                        {payment.map((pay) => (
                            <CTableRow key={pay?.id_payment || ''}>
                                <CTableDataCell>{getUserPay(pay?.user_id || '')}</CTableDataCell>
                                <CTableDataCell>${pay?.amount || ''}</CTableDataCell>
                                <CTableDataCell>{getPayMethod(pay?.payment_method || '')}</CTableDataCell>
                                <CTableDataCell>{getstatusPay(pay?.status || '')}</CTableDataCell>
                                <CTableDataCell>{pay?.daypayment || ''}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="info" onClick={() => { setCurrentPay(pay); setVisibleEdit(!visibleEdit) }} variant='outline' size="sm" className="me-2" >Edit</CButton>
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
                                                <CCol md={6} className="mb-3">
                                                    <CFormSelect
                                                        aria-label="Select a User"
                                                        value={currentPay?.user_id || ''}
                                                        onChange={(e) => {
                                                            const user_id = e.target.value;
                                                            setCurrentPay({ ...currentPay, user_id });
                                                        }}
                                                    >
                                                        <option value="">Select a User</option>
                                                        {userPay.map((users) => (
                                                            <option key={users.id_user} value={users.id_user}>
                                                                {users.name + ' ' + users.lastname}
                                                            </option>
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol md={6} className="mb-3">
                                                    <CFormInput
                                                        type="text-number"
                                                        placeholder="Amount"
                                                        value={currentPay?.amount || ''}
                                                        onChange={(e) => setCurrentPay({ ...currentPay, amount: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={6} className="mb-3">
                                                    <CFormSelect
                                                        aria-label="Select a Status for the class"
                                                        value={currentPay?.status || ''}
                                                        onChange={(e) => setCurrentPay({ ...currentPay, status: e.target.value })}
                                                    ><option value="" >Select a Payment Method </option>
                                                        {statusPayment.map((status) => (
                                                            <option key={status.id}
                                                                value={status.id}>
                                                                {status.status}
                                                            </option>
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol md={6} className="mb-3">
                                                    <CFormSelect
                                                        aria-label="Select a Status for the class"
                                                        value={currentPay?.payment_method || ''}
                                                        onChange={(e) => setCurrentPay({ ...currentPay, payment_method: e.target.value })}
                                                    ><option value="" >Select a Payment Method </option>
                                                        {methodPay.map((method) => (
                                                            <option key={method.id}
                                                                value={method.id}>
                                                                {method.status}
                                                            </option>
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol md={12} className="mb-3">
                                                    <CFormInput
                                                        type="date"
                                                        placeholder="Date Payment"
                                                        value={currentPay?.daypayment ? currentPay.daypayment.split('T')[0] : '' || ''}
                                                        onChange={(e) => setCurrentPay({ ...currentPay, daypayment: e.target.value })}
                                                    />
                                                </CCol>
                                            </CRow>
                                        </CModalBody>
                                        <CModalFooter>
                                            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
                                                Close
                                            </CButton>
                                            <CButton color="primary" onClick={handleEditPay}>Save Edit</CButton>
                                        </CModalFooter>

                                    </CModal>
                                    <CButton color="danger" onClick={() => { setCurrentPay(pay); setVisibleDelete(!visibleDelete) }} variant='outline' size="sm">Delete</CButton>
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
                                                        <CFormInput
                                                            type="text"
                                                            id="Delete"
                                                            value={deleteConfirmation}
                                                            onChange={e => {
                                                                setDeleteConfirmation(e.target.value);
                                                            }}
                                                        />
                                                    </CForm>
                                                </CCol>
                                            </CRow>
                                        </CModalBody>
                                        <CModalFooter>
                                            <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                                                Close
                                            </CButton>
                                            <CButton color="primary" onClick={handleDeletePay}>Delete</CButton>
                                        </CModalFooter>
                                    </CModal>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard >
    )
}
export default Payment
