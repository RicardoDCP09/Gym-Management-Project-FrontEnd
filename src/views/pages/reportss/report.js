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
import { useState, useEffect } from 'react'
import { helpFetch } from '../../../helpers/helpFetch';


const report = () => {
    const API = helpFetch()
    const [report, setReport] = useState([])
    const [reportType, setReportType] = useState([])
    const [users, setUsers] = useState([])
    const [currentReport, setCurrentReport] = useState(null)
    const [visible, setVisible] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [newReport, setNewReport] = useState({ type: '', user_id: '', description: '' })
    const [deleteConfirmation, setDeleteConfirmation] = useState('')

    useEffect(() => {
        const fetchReports = async () => {
            const data = await API.get('reports')
            if (data) {
                setReport(data)
            }
        }
        fetchReports()
    }, [])

    useEffect(() => {
        const fetchReportTypes = async () => {
            const data = await API.get('report_type')
            if (data) {
                setReportType(data)
            }
        }
        fetchReportTypes()
    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await API.get('users')
            if (data) {
                setUsers(data)
            }
        }
        fetchUsers()
    }, [])

    const handleAddReport = async () => {
        const data = await API.post('reports', newReport)
        if (data) {
            setReport([...report, data])
            setNewReport({ type: '', user_id: '', description: '' })
            setVisible(false)
        }
    }

    const handleEditReport = async () => {
        if (!currentReport || !currentReport.id_report) {
            console.log('No report selected')
            return;
        }
        try {
            const updateReport = await API.put(
                'reports', currentReport, currentReport.id_report)
            setReport((prevReport) =>
                prevReport.map((report) =>
                    report.id_report === currentReport.id_report ?
                        { ...report, ...updateReport }
                        : report
                )
            );
            setVisibleEdit(false)
        } catch (error) {
            console.log(" Error updating report: ", error)
        }
    }

    const handleDeleteReport = async () => {
        if (deleteConfirmation === 'confirm') {
            const reportId = currentReport.id_report;
            try {
                const deleteReport = await API.del('reports', reportId);
                setReport(report.filter((report) => report.id_report !== reportId));
                setVisibleDelete(false);
            } catch (error) {
                console.log("Error deleting report: ", error);
            }
        }
    }

    const getReportType = (reportId) => {
        const report = reportType.find((report) => report.id === reportId);
        return report ? report.name : 'Unknown';
    }
    const getUser = (userId) => {
        const user = users.find((user) => user.id_user === userId);
        return user ? user.name + ' ' + user.lastname : 'Unknown';
    }
    return (

        <CCard className="mb-4" >
            <CCardHeader>
                <h4 className="mb-0">Report Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4" onSubmit={(e) => { e.preventDefault(); handleAddReport() }}>
                    <CRow className="g-3">
                        <CCol className="d-flex justify-content-start">
                            <CButton color="primary" onClick={() => setVisible(!visible)}>Add new Report</CButton>
                        </CCol>
                        <CModal
                            backdrop="static"
                            visible={visible}
                            onClose={() => setVisible(false)}
                            aria-labelledby='Modal Add Report '
                        >

                            <CModalHeader>
                                <CModalTitle id="Create Reports">Add new Report</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CRow className='mb-3'>
                                    <CCol className='mb-3' md={12}>
                                        <label className='fw-bold'> Report Type</label>
                                        <CFormSelect
                                            aria-label="Report Type"
                                            value={newReport.type}
                                            onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                                        >
                                            <option value=''>Select a Type</option>
                                            {reportType.map((report) => (
                                                <option key={report.id} value={report.id}>
                                                    {report.name}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                    <CCol md={12}>
                                        <label className='fw-bold'> Users </label>
                                        <CFormSelect
                                            aria-label="Users"
                                            value={newReport.user_id}
                                            onChange={(e) => setNewReport({ ...newReport, user_id: e.target.value })}
                                        >
                                            <option value=''>Select a User</option>
                                            {users.map((user) => (
                                                <option key={user.id_user} value={user.id_user}>
                                                    {user.name} {user.lastname}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                </CRow>
                                <CRow className='mb-3'>
                                    <CCol className='mb-3' md={12}>
                                        <label className='fw-bold'> Description Report</label>
                                        <CFormTextarea
                                            id="exampleFormControlTextarea1"
                                            placeholder='Describe the Report'
                                            rows={3}
                                            value={newReport.description}
                                            onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                                        ></CFormTextarea>
                                    </CCol>
                                </CRow>
                            </CModalBody>
                            <CModalFooter>
                                <CCol className='d-flex justify-content-end'>
                                    <CButton color="secondary" className='me-2' onClick={() => setVisible(false)}>Close</CButton>
                                    <CButton color="primary" className='me-2' onClick={() => { handleAddReport() }}> Add Report </CButton>
                                </CCol>
                            </CModalFooter>
                        </CModal>
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
                        {report.map((report) => (
                            <CTableRow key={report?.id_report || ''}>
                                <CTableDataCell>{getReportType(report?.type || '')}</CTableDataCell>
                                <CTableDataCell>{getUser(report?.user_id || '')}</CTableDataCell>
                                <CTableDataCell>{report?.description || ''}</CTableDataCell>
                                < CTableDataCell >
                                    <CButton color="info" onClick={() => { setCurrentReport(report); setVisibleEdit(!visibleEdit) }} variant='outline' size="sm" className="me-2" >Edit</CButton>
                                    <CModal
                                        backdrop="static"
                                        visible={visibleEdit}
                                        onClose={() => setVisibleEdit(false)}
                                        aria-labelledby="Modal Info"
                                    >
                                        <CModalHeader>
                                            <CModalTitle id="Create Users">Edit Report</CModalTitle>
                                        </CModalHeader>
                                        <CModalBody>
                                            <CRow className="mb-3">
                                                <CCol md={12} className='mb-3'>
                                                    <label className='fw-bold'> Report Type</label>
                                                    <CFormSelect
                                                        aria-label="Report Type"
                                                        value={currentReport?.type || ''}
                                                        onChange={(e) => setCurrentReport({ ...currentReport, type: e.target.value })}
                                                    >
                                                        <option value=''>Select a Type</option>
                                                        {reportType.map((report) => (
                                                            <option key={report.id} value={report.id}>
                                                                {report.name}
                                                            </option>
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol md={12} className='mb-3'>
                                                    <label className='fw-bold'> Users </label>
                                                    <CFormSelect
                                                        aria-label="Users"
                                                        value={currentReport?.user_id || ''}
                                                        onChange={(e) => setCurrentReport({ ...currentReport, user_id: e.target.value })}
                                                    >
                                                        <option value=''>Select a User</option>
                                                        {users.map((user) => (
                                                            <option key={user.id_user} value={user.id_user}>
                                                                {user.name} {user.lastname}
                                                            </option>
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol md={12} className='mb-3'>
                                                    <label className='fw-bold'> Description Report</label>
                                                    <CFormTextarea
                                                        id="Descrip Report"
                                                        placeholder='Describe the Report'
                                                        rows={3}
                                                        value={currentReport?.description || ''}
                                                        onChange={(e) => setCurrentReport({ ...currentReport, description: e.target.value })}
                                                    ></CFormTextarea>
                                                </CCol>
                                            </CRow>
                                        </CModalBody>
                                        <CModalFooter>
                                            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
                                                Close
                                            </CButton>
                                            <CButton color="primary" onClick={handleEditReport}>Save Edit</CButton>
                                        </CModalFooter>

                                    </CModal>
                                    <CButton color="danger" onClick={() => { setCurrentReport(report); setVisibleDelete(!visibleDelete) }} variant='outline' size="sm">Delete</CButton>
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
                                            <CButton color="primary" onClick={handleDeleteReport}>Delete</CButton>
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
export default report
