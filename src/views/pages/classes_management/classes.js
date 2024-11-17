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
import { useState, useEffect } from 'react'
import { helpFetch } from '../../../helpers/helpFetch';
const Classes = () => {
    const API = helpFetch()
    const [classes, setClasses] = useState([])
    const [traineer, setTrainer] = useState([])
    const [statusClass, setStatusClass] = useState([])
    const [currentClass, setCurrentClass] = useState(null)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [newClass, setNewClass] = useState({ name: '', capacity: '', coach_id: '', class_time: '', status: '' })
    const [deleteConfirmation, setDeleteConfirmation] = useState('')

    useEffect(() => {
        const fetchClasses = async () => {
            const data = await API.get('classes')
            setClasses(data)
        }
        fetchClasses()
    }, [])

    useEffect(() => {
        const fetchTraineer = async () => {
            const data = await API.get('users')
            setTrainer(data)
        }
        fetchTraineer()
    }, [])

    useEffect(() => {
        const fetchStatusClass = async () => {
            const data = await API.get('status_class')
            setStatusClass(data)
        }
        fetchStatusClass()
    }, [])

    const handleAddClass = async () => {
        const addClass = await API.post('classes', newClass)
        setClasses([...classes, addClass])
        setNewClass({ name: '', capacity: '', coach_id: '', class_time: '', status: '' })
    }

    const handleEditClass = async () => {
        if (!currentClass || !currentClass.id) {
            console.error("Current class doesnt exist or is not defined")
            return;
        }
        try {
            const updatedClass = await API.put(
                'classes',
                currentClass,
                currentClass.id)
            setClasses((prevClass) =>
                prevClass.map((class_) =>
                    class_.id === currentClass.id
                        ? { ...class_, ...updatedClass } : class_))
            setVisibleEdit(false)
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteClass = async () => {
        if (deleteConfirmation === 'confirm') {
            const classId = currentClass.id
            try {
                const deleteClass = await API.del('classes', classId)
                setClasses(classes.filter((class_) => class_.id !== classId))
                setVisibleDelete(false)
            } catch (error) {
                console.error("Error deleting Item: ", error)
            }
        }

    }

    const getStatusClass = (statusId) => {
        const statusClas = statusClass.find((status) => status.id === statusId)
        return statusClas ? statusClas.status : '';
    }

    const getTraineer = (trainerID) => {
        const trainer = traineer.find((users) => users.id === trainerID)
        return trainer ? trainer.name + ' ' + trainer.lastname : 'Unknown';
    }

    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Classes Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4" onSubmit={(e) => { e.preventDefault(); handleAddClass() }}  >
                    <CRow className="g-3">
                        <CCol md={3}>
                            <CFormInput
                                type="text"
                                placeholder="Name"
                                value={newClass?.name || ''}
                                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                            />
                        </CCol>
                        <CCol md={3}>
                            <CFormSelect
                                aria-label="Select a Trainer"
                                value={newClass?.coach_id || ''}
                                onChange={(e) => setNewClass({ ...newClass, coach_id: e.target.value })}
                            >
                                <option value="">Select a Trainer</option>
                                {traineer.filter((trainer) => trainer.role === "2").map((trainer) => (
                                    <option key={trainer.id}
                                        value={trainer.id}>
                                        {trainer.name} {trainer.lastname}
                                    </option>
                                ))}
                            </CFormSelect>
                        </CCol>
                        <CCol md={3}>
                            <CFormInput
                                type="number"
                                placeholder="amount(People)"
                                value={newClass?.capacity || ''}
                                onChange={(e) => setNewClass({ ...newClass, capacity: e.target.value })}
                            />
                        </CCol>
                        <CCol md={3}>
                            <CFormSelect
                                aria-label="Select a Status for the class"
                                value={newClass?.status || ''}
                                onChange={(e) => setNewClass({ ...newClass, status: e.target.value })}
                            ><option value="" >Select a Status </option>
                                {statusClass.map((status) => (
                                    <option key={status.id}
                                        value={status.id}>
                                        {status.status}
                                    </option>
                                ))}
                            </CFormSelect>
                        </CCol>
                        <CCol md={3}>
                            <CFormInput
                                type="datetime-local"
                                placeholder="date(class)"
                                value={newClass?.class_time || ''}
                                onChange={(e) => setNewClass({ ...newClass, class_time: e.target.value })}
                            />
                        </CCol>
                        <CCol md={3}>
                            <CButton color="primary" type="submit">
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
                            <CTableHeaderCell>Traineer
                                <CIcon icon={cilBadge} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Daytime
                                <CIcon icon={cilClock} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Status
                                <CIcon icon={cilCheckAlt} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Actions
                                <CIcon icon={cilColorBorder} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {classes.map((classes) => (
                            <CTableRow key={classes?.id || ''}>
                                <CTableDataCell>{classes?.name || ''}</CTableDataCell>
                                <CTableDataCell>{classes?.capacity || ''}</CTableDataCell>
                                <CTableDataCell>{getTraineer(classes?.coach_id || '')}</CTableDataCell>
                                <CTableDataCell>{classes?.class_time || ''}</CTableDataCell>
                                <CTableDataCell>{getStatusClass(classes?.status || '')}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="info" onClick={() => { setCurrentClass(classes); setVisibleEdit(!visibleEdit) }} variant='outline' size="sm" className="me-2" >Edit</CButton>
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
                                                        value={currentClass?.name || ''}
                                                        onChange={(e) => setCurrentClass({ ...currentClass, name: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={6} className='mb-3' >
                                                    <CFormSelect
                                                        aria-label="Select a Trainer"
                                                        value={currentClass?.coach_id || ''}
                                                        onChange={(e) => setCurrentClass({ ...currentClass, coach_id: e.target.value })}
                                                    >
                                                        <option value="">Select a Trainer</option>
                                                        {traineer.filter((trainer) => trainer.role === "2").map((trainer) => (
                                                            <option key={trainer.id}
                                                                value={trainer.id}>
                                                                {trainer.name} {trainer.lastname}
                                                            </option>
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol md={6} className='mb-3'>
                                                    <CFormInput
                                                        type="number"
                                                        placeholder="amount(People)"
                                                        value={currentClass?.capacity || ''}
                                                        onChange={(e) => setCurrentClass({ ...currentClass, amount: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={6} className='mb-3'>
                                                    <CFormSelect
                                                        aria-label="Select a Status for the class"
                                                        value={currentClass?.status || ''}
                                                        onChange={(e) => setCurrentClass({ ...currentClass, status: e.target.value })}
                                                    ><option value="" >Select a Status </option>
                                                        {statusClass.map((status) => (
                                                            <option key={status.id}
                                                                value={status.id}>
                                                                {status.status}
                                                            </option>
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                                <CCol md={12} className='mb-3'>
                                                    <CFormInput
                                                        type="datetime-local"
                                                        placeholder="date(class)"
                                                        value={currentClass?.class_time || ''}
                                                        onChange={(e) => setCurrentClass({ ...currentClass, class_time: e.target.value })}
                                                    />
                                                </CCol>
                                            </CRow>
                                        </CModalBody>
                                        <CModalFooter>
                                            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
                                                Close
                                            </CButton>
                                            <CButton color="primary" onClick={handleEditClass} >Save Edit</CButton>
                                        </CModalFooter>

                                    </CModal>
                                    <CButton color="danger" onClick={() => { setCurrentClass(classes); setVisibleDelete(!visibleDelete) }} variant='outline' size="sm">Delete</CButton>
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
                                            <CButton color="primary" onClick={handleDeleteClass} >Delete</CButton>
                                        </CModalFooter>
                                    </CModal>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )
}
export default Classes
