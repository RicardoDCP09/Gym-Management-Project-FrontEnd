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
import { useState, useEffect } from 'react'
import { helpFetch } from '../../../helpers/helpFetch';

const Rutine = () => {
    const API = helpFetch()
    const [rutines, setRutines] = useState([])
    const [traineers, setTraineers] = useState([])
    const [exercises, setExercises] = useState([])
    const [difficulty, setDifficulty] = useState([])
    const [currentRutine, setCurrentRutine] = useState(null)
    const [visible, setVisible] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [newRutine, setNewRutine] = useState({ name: '', difficulty: '', objective: '', coach_id: '', exercise_id: '' })
    const [deleteConfirmation, setDeleteConfirmation] = useState('')


    useEffect(() => {
        const fetchRutines = async () => {
            const data = await API.get('rutines')
            if (data) {
                setRutines(data)
            }
        }
        fetchRutines()
    }, [])

    useEffect(() => {
        const fetchTraineers = async () => {
            const data = await API.get('users')
            if (data) {
                setTraineers(data)
            }
        }
        fetchTraineers()
    }, [])

    useEffect(() => {
        const fetchExercise = async () => {
            const data = await API.get('exercises')
            if (data) {
                setExercises(data)
            }
        }
        fetchExercise()
    }, [])

    useEffect(() => {
        const fetchDifficulty = async () => {
            const data = await API.get('status_difficulty')
            if (data) {
                setDifficulty(data)
            }
        }
        fetchDifficulty()
    }, [])

    const handleAddRutine = async () => {
        const data = await API.post('rutines', newRutine)
        if (data) {
            setRutines([...rutines, data])
            setNewRutine({ name: '', difficulty: '', objective: '', coach_id: '', exercise_id: '' })
            setVisible(false)
        }
    }

    const handleEditRutine = async () => {
        if (!currentRutine || !currentRutine.id) {
            console.error("No Rutine selected for edit");
            return;
        }
        try {
            const updateRutine = await API.put(
                'rutines',
                currentRutine,
                currentRutine.id);
            setRutines((prevRut) =>
                prevRut.map((rutine) =>
                    rutine.id === currentRutine.id ?
                        { ...rutine, ...updateRutine } : rutine
                )
            );
            setVisibleEdit(false);
        } catch (error) {
            console.error("Error updating Rutine", error);
        }
    }

    const handleDeleteRutine = async () => {
        if (deleteConfirmation === 'confirm') {
            const rutineId = currentRutine.id;
            try {
                const deletedRutine = await API.del('rutines', rutineId);
                setRutines(rutines.filter((rutine) => rutine.id !== rutineId));
                setVisibleDelete(false);
            } catch (error) {
                console.error("Error deleting Rutine", error);
            }
        }
    };

    const getTraineer = (trainerId) => {
        const trainer = traineers ? traineers.find((traineer) => traineer.id === trainerId) : null;
        return trainer ? trainer.name + ' ' + trainer.lastname : 'Unknown';
    }

    const getExercise = (exerciseId) => {
        const exercise = exercises ? exercises.find((exercise) => exercise.id === exerciseId) : null
        return exercise ? exercise.name : 'Unknown';
    }

    const getdifficulty = (difficultyId) => {
        const difficulties = difficulty ? difficulty.find((difficulty) => difficulty.id === difficultyId) : null
        return difficulties ? difficulties.name : 'Unknown';
    }

    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Rutine Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4" onSubmit={(e) => { e.preventDefault(); handleAddRutine() }}>
                    <CRow className="g-3">
                        <CCol className="d-flex justify-content-start">
                            <CButton color="primary" onClick={() => setVisible(!visible)}>Add new Rutine</CButton>
                        </CCol>
                        <CModal
                            backdrop="static"
                            visible={visible}
                            onClose={() => setVisible(false)}
                            aria-labelledby='Modal Add Rutine'
                        >
                            <CModalHeader>
                                <CModalTitle id='Modal Add Rutine'>New Rutine</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CRow className='mb-3'>
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="text"
                                            placeholder="Name"
                                            value={newRutine.name || ''}
                                            onChange={(e) => setNewRutine({ ...newRutine, name: e.target.value })}
                                        />
                                    </CCol>
                                    <CCol className='mb-3' md={6}>
                                        <CFormSelect
                                            aria-label="Select Difficulty"
                                            value={newRutine.difficulty || ''}
                                            onChange={(e) => setNewRutine({ ...newRutine, difficulty: e.target.value })}
                                        >
                                            <option value="">Select Difficulty</option>
                                            {difficulty.map((difficulty) => (
                                                <option key={difficulty.id} value={difficulty.id}>
                                                    {difficulty.name}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="text"
                                            placeholder="Objective"
                                            value={newRutine.objective || ''}
                                            onChange={(e) => setNewRutine({ ...newRutine, objective: e.target.value })}
                                        />
                                    </CCol>
                                    <CCol className='mb-3' md={6}>
                                        <CFormSelect
                                            aria-label="Main Exercise"
                                            value={newRutine.exercise_id || ''}
                                            onChange={(e) => setNewRutine({ ...newRutine, exercise_id: e.target.value })}
                                        >
                                            <option value="">Select a Exercise</option>
                                            {exercises.map((exercise) => (
                                                <option key={exercise.id} value={exercise.id}>
                                                    {exercise.name}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className='mb-3' md={12}>
                                        <CFormSelect
                                            aria-label="Main Traineer"
                                            value={newRutine.coach_id || ''}
                                            onChange={(e) => setNewRutine({ ...newRutine, coach_id: e.target.value })}
                                        >
                                            <option value="">Select a Traineer</option>
                                            {traineers.filter((traineer) => (traineer.role === '2')).map((traineer) => (
                                                <option key={traineer.id} value={traineer.id}>
                                                    {traineer.name} {traineer.lastname}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                </CRow>
                            </CModalBody>
                            <CModalFooter>
                                <CCol className='d-flex justify-content-end'>
                                    <CButton color="secondary" className='me-2' onClick={() => setVisible(false)}>Close</CButton>
                                    <CButton color="primary" className='me-2' onClick={() => { handleAddRutine() }}> Add Rutine </CButton>
                                </CCol>
                            </CModalFooter>
                        </CModal>
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
                        {rutines.map((rutine) => (
                            <CTableRow key={rutine?.id || ''}>
                                <CTableDataCell>{rutine?.name || ''}</CTableDataCell>
                                <CTableDataCell>{getdifficulty(rutine?.difficulty || '')}</CTableDataCell>
                                <CTableDataCell>{rutine?.objective || ''}</CTableDataCell>
                                <CTableDataCell>{getTraineer(rutine?.coach_id || '')}</CTableDataCell>
                                <CTableDataCell>{getExercise(rutine?.exercise_id || '')}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="info" onClick={() => { setCurrentRutine(rutine); setVisibleEdit(!visibleEdit) }} variant='outline' size="sm" className="  me-2" >Edit</CButton>
                                    <CModal
                                        backdrop="static"
                                        visible={visibleEdit}
                                        onClose={() => setVisibleEdit(false)}
                                        aria-labelledby="Modal Info"
                                    >
                                        <CModalHeader>
                                            <CModalTitle id="Create Users">Edit Rutine</CModalTitle>
                                        </CModalHeader>
                                        <CModalBody>
                                            <CRow className="mb-3">
                                                <CCol md={6} className='mb-3'>
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="Name"
                                                        value={currentRutine?.name || ''}
                                                        onChange={(e) => setCurrentRutine({ ...currentRutine, name: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={6} className='mb-3'>
                                                    <CFormSelect
                                                        aria-label="Select Difficulty"
                                                        value={currentRutine?.difficulty || ''}
                                                        onChange={(e) => setCurrentRutine({ ...currentRutine, difficulty: e.target.value })}
                                                    >
                                                        <option value="">Select Difficulty</option>
                                                        {difficulty.map((difficulty) => (
                                                            <option key={difficulty.id} value={difficulty.id}>
                                                                {difficulty.name}
                                                            </option>
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol md={6} className='mb-3'>
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="Objective"
                                                        value={currentRutine?.objective || ''}
                                                        onChange={(e) => setCurrentRutine({ ...currentRutine, objective: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={6} className='mb-3'>
                                                    <CFormSelect
                                                        aria-label="Main Exercise"
                                                        value={currentRutine?.exercise_id || ''}
                                                        onChange={(e) => setCurrentRutine({ ...currentRutine, exercise_id: e.target.value })}
                                                    >
                                                        <option value="">Select a Exercise</option>
                                                        {exercises.map((exercise) => (
                                                            <option key={exercise.id} value={exercise.id}>
                                                                {exercise.name}
                                                            </option>
                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol md={12} className='mb-3'>
                                                    <CFormSelect
                                                        aria-label="Main Traineer"
                                                        value={currentRutine?.coach_id || ''}
                                                        onChange={(e) => setCurrentRutine({ ...currentRutine, coach_id: e.target.value })}
                                                    >
                                                        <option value="">Select a Traineer</option>
                                                        {traineers.filter((traineer) => (traineer.role === '2')).map((traineer) => (
                                                            <option key={traineer.id} value={traineer.id}>
                                                                {traineer.name} {traineer.lastname}
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
                                            <CButton color="primary" onClick={handleEditRutine}>Save Edit</CButton>
                                        </CModalFooter>

                                    </CModal>
                                    <CButton color="danger" onClick={() => { setCurrentRutine(rutine); setVisibleDelete(!visibleDelete) }} variant='outline' size="sm">Delete</CButton>
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
                                            <CButton color="primary" onClick={handleDeleteRutine}>Delete</CButton>
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
export default Rutine 
