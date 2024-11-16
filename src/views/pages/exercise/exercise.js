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
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,

} from '@coreui/react';
import { useState, useEffect } from 'react'
import { helpFetch } from '../../../helpers/helpFetch';

const exercise = () => {
    const API = helpFetch()
    const [exercise, setExercise] = useState([])
    const [statusex, setStatusex] = useState([])
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [currentExercise, setCurrentExercise] = useState(false)
    const [newExercise, setNewExercise] = useState({ name: '', description: '', type: '' })
    const [deleteConfirmation, setDeleteConfirmation] = useState('')

    useEffect(() => {
        const fetchExercises = async () => {
            const data = await API.get('exercises')
            setExercise(data);
        }
        fetchExercises()

    }, [])
    useEffect(() => {
        const fetchExercises = async () => {
            const data = await API.get('type_exercises')
            setStatusex(data);
        }
        fetchExercises()

    }, [])



    const handleAddExercise = async () => {
        const addedExercise = await API.post('exercises', newExercise)
        setExercise([...exercise, addedExercise])
        setNewExercise({ name: '', description: '', type: '' })
    };

    const handleEditExercise = async () => {
        if (!currentExercise || !currentExercise.id) {
            console.error("Current Exercises is not set or does not haven id")
            return;
        }
        try {
            const updatedExercise = await API.put(
                'exercises',
                currentExercise,
                currentExercise.id);
            setExercise((prevExercise) =>
                prevExercise.map((exercise) =>
                    exercise.id === currentExercise.id
                        ? { ...exercise, ...updatedExercise } : exercise))
            setVisibleEdit(false)
        } catch (error) {
            console.log(error)
        }
    };

    const handleDeleteExercise = async () => {
        if (deleteConfirmation === 'confirm') {
            const exerciseId = currentExercise.id;
            try {
                const deletedExercise = await API.del('exercises', exerciseId);
                setExercise(exercise.filter((exercise) => exercise.id !== exerciseId));
                setVisibleDelete(false)
            } catch (error) {
                console.error("Error deleteing the exercise: ", error);
            }
        }
    };

    const getTypeExercise = (exerciseId) => {
        const typeExercise = statusex.find((exercise) => exercise.id === exerciseId);
        return typeExercise ? typeExercise.name : 'Unknown';
    }
    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Exercise Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4" onSubmit={(e) => { e.preventDefault(); handleAddExercise() }}>
                    <CRow className="g-3">
                        <CCol md={12}>
                            <label className='fw-bold'> Exercise Name</label>
                            <CFormInput
                                type="text"
                                placeholder="Name"
                                value={newExercise?.name || ''}
                                onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                            />
                        </CCol>
                        <CCol md={12}>
                            <label className='fw-bold'> Description</label>
                            <CFormTextarea
                                id="Description"
                                placeholder='Describe the Exercise'
                                rows={3}
                                value={newExercise?.description || ''}
                                onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                            ></CFormTextarea>
                        </CCol>
                        <CCol md={12}>
                            <label className='fw-bold'> Type of Exercise</label>
                            <CFormSelect
                                aria-label="Main Exercise"
                                value={newExercise?.type || ''}
                                onChange={(e) => setNewExercise({ ...newExercise, type: e.target.value })}
                            >
                                <option value="">Select a type</option>
                                {statusex.map((status) => (
                                    <option key={status.id}
                                        value={status.id}>
                                        {status.name}
                                    </option>
                                ))}
                            </CFormSelect>
                        </CCol>

                        <CCol md={12}>
                            <CButton color="primary" className='w-100' type='submit'>
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
                        {exercise.map((exercise) => (
                            <CTableRow key={exercise?.id || ''}>
                                <CTableDataCell>{exercise?.name || ''}</CTableDataCell>
                                <CTableDataCell>{exercise?.description || ''}</CTableDataCell>
                                <CTableDataCell>{getTypeExercise(exercise?.type || '')}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="info" onClick={() => { setCurrentExercise(exercise); setVisibleEdit(!visibleEdit) }} variant='outline' size="sm" className="me-2" >Edit</CButton>
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
                                                <CCol md={12}>
                                                    <label className='fw-bold'> Exercise Name</label>
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="Name"
                                                        value={currentExercise?.name || ''}
                                                        onChange={(e) => setCurrentExercise({ ...currentExercise, name: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={12}>
                                                    <label className='fw-bold'> Description</label>
                                                    <CFormTextarea
                                                        id="exampleFormControlTextarea1"
                                                        placeholder='Describe the Exercise'
                                                        rows={3}
                                                        value={currentExercise?.description || ''}
                                                        onChange={(e) => setCurrentExercise({ ...currentExercise, description: e.target.value })}

                                                    ></CFormTextarea>
                                                </CCol>
                                                <CCol md={12}>
                                                    <label className='fw-bold'> Type of Exercise</label>
                                                    <CFormSelect
                                                        aria-label="Main Exercise"
                                                        value={currentExercise?.type || ''}
                                                        onChange={(e) => setCurrentExercise({ ...currentExercise, type: e.target.value })}
                                                    >
                                                        <option value="">Select a type</option>
                                                        {statusex.map((statusex) => (
                                                            <option key={statusex.id}
                                                                value={statusex.id}>
                                                                {statusex.name}
                                                            </option>
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                            </CRow>
                                        </CModalBody>
                                        <CModalFooter>
                                            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
                                                Close
                                            </CButton>
                                            <CButton color="primary" onClick={handleEditExercise}>Save Edit</CButton>
                                        </CModalFooter>

                                    </CModal>
                                    <CButton color="danger" onClick={() => { setCurrentExercise(exercise); setVisibleDelete(!visibleDelete) }} variant='outline' size="sm">Delete</CButton>
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
                                            <CButton color="primary" onClick={handleDeleteExercise}>Delete</CButton>
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
export default exercise 
