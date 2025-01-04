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
    CContainer,
} from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils'
import { useState, useEffect } from 'react'
import { helpFetch } from '../../../helpers/helpFetch';



const progress = () => {
    const API = helpFetch()
    const [progress, setProgress] = useState([])
    const [selectedUser, setSelectedUser] = useState([])
    const [currentProgress, setCurrentProgress] = useState(null)
    const [filteredProgress, setFilteredProgress] = useState([]);
    const [visible, setVisible] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [newProgress, setNewProgress] = useState({ date: '', weight: '', bodyFat: '', muscleGain: '', benchPress: '', squats: '', deadLift: '' })
    const [deleteConfirmation, setDeleteConfirmation] = useState('')

    useEffect(() => {
        const fetchProgress = async () => {
            const data = await API.get('progress')
            setProgress(data)
        }
        fetchProgress()
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            const data = await API.get('users')
            setSelectedUser(data)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const userId = newProgress.user_id;
        if (userId) {
            setFilteredProgress(progress.filter((p) => p.user_id === userId));
        }
    }, [progress, newProgress.user_id]);


    const handleAddProgress = async () => {
        const addProgress = await API.post('progress', newProgress);
        setProgress((prevProgress) => [...prevProgress, addProgress]);
        setFilteredProgress((prevFiltered) => [...prevFiltered, addProgress]);
        setNewProgress({ date: '', weight: '', bodyFat: '', muscleGain: '', benchPress: '', squats: '', deadLift: '' });
        setVisible(false);
    };

    const handleEditProgress = async () => {
        if (!currentProgress || !currentProgress.id) {
            console.error("Current Progress doesn't exist");
            return;
        }
        try {
            const updateProgress = await API.put(
                'progress',
                currentProgress,
                currentProgress.id);
            setProgress((prevProgress) =>
                prevProgress.map((progre) =>
                    progre.id === currentProgress.id
                        ? { ...progre, ...updateProgress }
                        : progre));

            setFilteredProgress((prevFiltered) =>
                prevFiltered.map((progre) =>
                    progre.id === currentProgress.id
                        ? { ...progre, ...updateProgress }
                        : progre));
            setVisibleEdit(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProgress = async () => {
        if (deleteConfirmation === 'confirm') {
            const progressId = currentProgress.id;
            try {
                await API.del('progress', progressId);
                setProgress(progress.filter(progress_ => progress_.id !== progressId));
                setFilteredProgress((prevFiltered) => prevFiltered.filter((progress_) => progress_.id !== progressId));
                setVisibleDelete(false);
            } catch (error) {
                console.error("Error deleting Item: ", error);
            }
        }
    };


    // Data Grafica 
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Weight (kg)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(255, 99, 132, 1)',
                data: filteredProgress.map(progress => progress.weight || 0),
            },
            {
                label: 'Body Fat (%)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                pointBorderColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(54, 162, 235, 1)',
                data: filteredProgress.map(progress => progress.bodyFat || 0),
            },
            {
                label: 'Muscle Gain (kg)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(75, 192, 192, 1)',
                data: filteredProgress.map(progress => progress.muscleGain || 0),
            },
            {
                label: 'Bench Press (kg)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                pointBackgroundColor: 'rgba(153, 102, 255, 1)',
                pointBorderColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(153, 102, 255, 1)',
                data: filteredProgress.map(progress => progress.benchPress || 0),
            },
            {
                label: 'Squats (kg)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                pointBackgroundColor: 'rgba(255, 159, 64, 1)',
                pointBorderColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(255, 159, 64, 1)',
                data: filteredProgress.map(progress => progress.squats || 0),
            },
            {
                label: 'Dead Lift (kg)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                pointBackgroundColor: 'rgba(255, 206, 86, 1)',
                pointBorderColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(255, 206, 86, 1)',
                data: filteredProgress.map(progress => progress.deadLift || 0),
            },
        ],
    };
    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Progress Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4" onSubmit={(e) => { e.preventDefault(); handleAddProgress(); }} >
                    <CRow className="g-3">
                        <CCol md={12}>
                            <label className='fw-bold'> User</label>
                            <CFormSelect
                                aria-label="Select a User"
                                value={newProgress?.user_id}
                                onChange={(e) => {
                                    const user_id = e.target.value;
                                    setNewProgress({ ...newProgress, user_id });
                                }}
                            >
                                <option value="">Select a User</option>
                                {selectedUser.map((users) => (
                                    <option key={users.id} value={users.id}>
                                        {users.name + ' ' + users.lastname}
                                    </option>
                                ))}
                            </CFormSelect>
                        </CCol>
                        <CCol className="d-flex justify-content-start">
                            <CButton className='me-2' color="primary" onClick={() => setVisible(!visible)}>Add Progress</CButton>
                        </CCol>
                        <CModal
                            backdrop="static"
                            visible={visible}
                            onClose={() => setVisible(false)}
                            aria-labelledby="Modal create Progress"
                        >
                            <CModalHeader>
                                <CModalTitle id="Create Progress">New Register</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CRow className="mb-3">
                                    <CCol md={4}>
                                        <label className='fw-bold'> Date Check</label>
                                        <CFormInput
                                            type="date"
                                            value={newProgress?.date || ''}
                                            onChange={(e) => setNewProgress({ ...newProgress, date: e.target.value })}
                                        />
                                    </CCol>
                                    <CCol md={4}>
                                        <label className='fw-bold'> Weight(Kg)</label>
                                        <CFormInput
                                            type="number"
                                            value={newProgress?.weight || ''}
                                            onChange={(e) => setNewProgress({ ...newProgress, weight: e.target.value })}
                                        />
                                    </CCol>
                                    <CCol md={4}>
                                        <label className='fw-bold'> Body Fat(%)</label>
                                        <CFormInput
                                            type="number"
                                            value={newProgress?.bodyFat || ''}
                                            onChange={(e) => setNewProgress({ ...newProgress, bodyFat: e.target.value })}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CCol md={4}>
                                        <label className='fw-bold'> Muscle Gain(Kg)</label>
                                        <CFormInput
                                            type="number"
                                            value={newProgress?.muscleGain || ''}
                                            onChange={(e) => setNewProgress({ ...newProgress, muscleGain: e.target.value })}
                                        />
                                    </CCol>
                                    <CCol md={4}>
                                        <label className='fw-bold'> Bench Press(Kg)</label>
                                        <CFormInput
                                            type="number"
                                            value={newProgress?.benchPress || ''}
                                            onChange={(e) => setNewProgress({ ...newProgress, benchPress: e.target.value })}
                                        />
                                    </CCol>
                                    <CCol md={4}>
                                        <label className='fw-bold'>Squats(Kg)</label>
                                        <CFormInput
                                            type="number"
                                            value={newProgress?.squats || ''}
                                            onChange={(e) => setNewProgress({ ...newProgress, squats: e.target.value })}
                                        />
                                    </CCol>
                                    <CCol md={12}>
                                        <label className='fw-bold'>Dead Lift (Kg)</label>
                                        <CFormInput
                                            type="number"
                                            value={newProgress?.deadLift || ''}
                                            onChange={(e) => setNewProgress({ ...newProgress, deadLift: e.target.value })}
                                        />
                                    </CCol>
                                </CRow>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Close
                                </CButton>
                                <CButton color="primary" onClick={() => { handleAddProgress() }}>Add Progress</CButton>
                            </CModalFooter>
                        </CModal>
                    </CRow>
                </CForm>
                <CTable hover responsive striped>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>
                                Date
                            </CTableHeaderCell>
                            <CTableHeaderCell>
                                Weight
                            </CTableHeaderCell>
                            <CTableHeaderCell>
                                Body Fat
                            </CTableHeaderCell>
                            <CTableHeaderCell>
                                Muscle Gain
                            </CTableHeaderCell>
                            <CTableHeaderCell>
                                Bench Press
                            </CTableHeaderCell>
                            <CTableHeaderCell>
                                Squats
                            </CTableHeaderCell>
                            <CTableHeaderCell>
                                Dead Lift
                            </CTableHeaderCell>
                            <CTableHeaderCell>
                                Actions
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {filteredProgress.map((progress) => (
                            <CTableRow key={progress?.id || ''}>
                                <CTableDataCell>{progress?.date || ''}</CTableDataCell>
                                <CTableDataCell>{progress?.weight || ''}</CTableDataCell>
                                <CTableDataCell>{progress?.bodyFat || ''}%</CTableDataCell>
                                <CTableDataCell>{progress?.muscleGain || ''}%</CTableDataCell>
                                <CTableDataCell>{progress?.benchPress || ''}</CTableDataCell>
                                <CTableDataCell>{progress?.squats || ''}</CTableDataCell>
                                <CTableDataCell>{progress?.deadLift || ''}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="info" onClick={() => { setCurrentProgress(progress); setVisibleEdit(!visibleEdit) }} variant='outline' size="sm" className="me-2" >Edit</CButton>
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
                                                <CCol md={4} className='mb-3'>
                                                    <label className='fw-bold'> Date Check</label>
                                                    <CFormInput
                                                        type="date"
                                                        value={currentProgress?.date || ''}
                                                        onChange={(e) => setCurrentProgress({ ...currentProgress, date: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={4} className='mb-3'>
                                                    <label className='fw-bold'> Weight(Kg)</label>
                                                    <CFormInput
                                                        type="number"
                                                        value={currentProgress?.weight || ''}
                                                        onChange={(e) => setCurrentProgress({ ...currentProgress, weight: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={4} className='mb-3'>
                                                    <label className='fw-bold'> Body Fat(%)</label>
                                                    <CFormInput
                                                        type="number"
                                                        value={currentProgress?.bodyFat || ''}
                                                        onChange={(e) => setCurrentProgress({ ...currentProgress, bodyFat: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={4} className='mb-3'>
                                                    <label className='fw-bold'> Muscle Gain(Kg)</label>
                                                    <CFormInput
                                                        type="number"
                                                        value={currentProgress?.muscleGain || ''}
                                                        onChange={(e) => setCurrentProgress({ ...currentProgress, muscleGain: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={4} className='mb-3'>
                                                    <label className='fw-bold'> Bench Press(Kg)</label>
                                                    <CFormInput
                                                        type="number"
                                                        value={currentProgress?.benchPress || ''}
                                                        onChange={(e) => setCurrentProgress({ ...currentProgress, benchPress: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={4} className='mb-3'>
                                                    <label className='fw-bold'>Squats(Kg)</label>
                                                    <CFormInput
                                                        type="number"
                                                        value={currentProgress?.squats || ''}
                                                        onChange={(e) => setCurrentProgress({ ...currentProgress, squats: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={12} className='mb-3'>
                                                    <label className='fw-bold'>Dead Lift (Kg)</label>
                                                    <CFormInput
                                                        type="number"
                                                        value={currentProgress?.deadLift || ''}
                                                        onChange={(e) => setCurrentProgress({ ...currentProgress, deadLift: e.target.value })}
                                                    />
                                                </CCol>
                                            </CRow>
                                        </CModalBody>
                                        <CModalFooter>
                                            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
                                                Close
                                            </CButton>
                                            <CButton color="primary" onClick={handleEditProgress}>Save Edit</CButton>
                                        </CModalFooter>

                                    </CModal>
                                    <CButton color="danger" onClick={() => { setCurrentProgress(progress); setVisibleDelete(!visibleDelete) }} variant='outline' size="sm">Delete</CButton>
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
                                            <CButton color="primary" onClick={handleDeleteProgress}>Delete</CButton>
                                        </CModalFooter>
                                    </CModal>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
                <CContainer className="graphSize mb-20" style={{ width: '75%', height: '450px' }}>
                    <CChart
                        type="line"
                        data={data}
                        options={{
                            plugins: {
                                legend: {
                                    labels: {
                                        color: getStyle('--cui-body-color'),
                                    },
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            let label = context.dataset.label || '';
                                            if (label) {
                                                label += ': ';
                                            }
                                            label += context.raw;
                                            return label;
                                        }
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 10,
                                        callback: function (value) {
                                            return value; // Mostrar valores tal cual
                                        }
                                    }
                                }
                            },
                            maintainAspectRatio: false,
                        }}
                        height={300}
                    />
                </CContainer>
            </CCardBody>
        </CCard >
    )
}
export default progress
