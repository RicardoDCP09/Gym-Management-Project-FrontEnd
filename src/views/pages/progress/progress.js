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
import {
    CChart,

} from '@coreui/react-chartjs';

import { getStyle } from '@coreui/utils'
import { useState } from 'react'

const progress = () => {
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Progress Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4">
                    <CRow className="g-3">
                        <CCol md={12}>
                            <label className='fw-bold'> User</label>
                            <CFormSelect
                                aria-label="Select a User"
                                options={[
                                    'Select a User',
                                    { label: 'Ricardo Colmenares', value: '1' },
                                ]}
                            />
                        </CCol>
                        <CCol md={4}>
                            <label className='fw-bold'> Date Check</label>
                            <CFormInput
                                type="date"
                                value={""}
                            />
                        </CCol>
                        <CCol md={4}>
                            <label className='fw-bold'> Weight(Kg)</label>
                            <CFormInput
                                type="number"
                                value={""}
                            />
                        </CCol>
                        <CCol md={4}>
                            <label className='fw-bold'> Body Fat(%)</label>
                            <CFormInput
                                type="number"
                                value={""}
                            />
                        </CCol>
                        <CCol md={4}>
                            <label className='fw-bold'> Muscle Gain(Kg)</label>
                            <CFormInput
                                type="number"
                                value={""}
                            />
                        </CCol>
                        <CCol md={4}>
                            <label className='fw-bold'> Bench Press(Kg)</label>
                            <CFormInput
                                type="number"
                                value={""}
                            />
                        </CCol>
                        <CCol md={4}>
                            <label className='fw-bold'>Squats(Kg)</label>
                            <CFormInput
                                type="number"
                                value={""}
                            />
                        </CCol>
                        <CCol md={12}>
                            <label className='fw-bold'>Dead Lift (Kg)</label>
                            <CFormInput
                                type="number"
                                value={""}
                            />
                        </CCol>
                        <CCol md={12}>
                            <CButton color="primary" className='w-100'>
                                Add Register
                            </CButton>
                        </CCol>
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
                        <CTableRow>
                            <CTableDataCell>{"2024-08-11"}</CTableDataCell>
                            <CTableDataCell>{"50Kg"}</CTableDataCell>
                            <CTableDataCell>{"30%"}</CTableDataCell>
                            <CTableDataCell>{"70Kg"}</CTableDataCell>
                            <CTableDataCell>{"60Kg"}</CTableDataCell>
                            <CTableDataCell>{"80Kg"}</CTableDataCell>
                            <CTableDataCell>{"50Kg"}</CTableDataCell>
                            <CTableDataCell>
                                <CButton color="info" variant='outline' size="sm" className="me-2" >Edit</CButton>
                                <CButton color="danger" variant='outline' size="sm" >Delete</CButton>
                            </CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>{"2024-11-11"}</CTableDataCell>
                            <CTableDataCell>{"55Kg"}</CTableDataCell>
                            <CTableDataCell>{"25%"}</CTableDataCell>
                            <CTableDataCell>{"75Kg"}</CTableDataCell>
                            <CTableDataCell>{"67Kg"}</CTableDataCell>
                            <CTableDataCell>{"90Kg"}</CTableDataCell>
                            <CTableDataCell>{"60Kg"}</CTableDataCell>
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
                                            <CCol md={4} className='mb-3'>
                                                <label className='fw-bold'> Date Check</label>
                                                <CFormInput
                                                    type="date"
                                                    value={""}
                                                />
                                            </CCol>
                                            <CCol md={4} className='mb-3'>
                                                <label className='fw-bold'> Weight(Kg)</label>
                                                <CFormInput
                                                    type="number"
                                                    value={""}
                                                />
                                            </CCol>
                                            <CCol md={4} className='mb-3'>
                                                <label className='fw-bold'> Body Fat(%)</label>
                                                <CFormInput
                                                    type="number"
                                                    value={""}
                                                />
                                            </CCol>
                                            <CCol md={4} className='mb-3'>
                                                <label className='fw-bold'> Muscle Gain(Kg)</label>
                                                <CFormInput
                                                    type="number"
                                                    value={""}
                                                />
                                            </CCol>
                                            <CCol md={4} className='mb-3'>
                                                <label className='fw-bold'> Bench Press(Kg)</label>
                                                <CFormInput
                                                    type="number"
                                                    value={""}
                                                />
                                            </CCol>
                                            <CCol md={4} className='mb-3'>
                                                <label className='fw-bold'>Squats(Kg)</label>
                                                <CFormInput
                                                    type="number"
                                                    value={""}
                                                />
                                            </CCol>
                                            <CCol md={12} className='mb-3'>
                                                <label className='fw-bold'>Dead Lift (Kg)</label>
                                                <CFormInput
                                                    type="number"
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
                <CChart
                    type="radar"
                    data={{
                        labels: [
                            'Weight',
                            'Body Fat',
                            'Muscle Gain',
                            'BenchPress',
                            'Squats',
                            'Dead Lift',
                        ],
                        datasets: [
                            {
                                label: '1st Check Progress',
                                backgroundColor: 'rgba(220, 220, 220, 0.2)',
                                borderColor: 'rgba(220, 220, 220, 1)',
                                pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                                pointBorderColor: '#fff',
                                pointHighlightFill: '#fff',
                                pointHighlightStroke: 'rgba(220, 220, 220, 1)',
                                data: [50, 30, 70, 60, 80, 50],
                            },
                            {
                                label: '2nd Check Progess',
                                backgroundColor: 'rgba(195, 51, 51, 0.2)',
                                borderColor: 'rgba(195, 51, 51, 1)',
                                pointBackgroundColor: 'rgba(195, 51, 51, 1)',
                                pointBorderColor: '#c33333 ',
                                pointHighlightFill: '#c33333 ',
                                pointHighlightStroke: 'rgba(195, 51, 51, 1)',
                                data: [55, 25, 75, 67, 90, 60],
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            legend: {
                                labels: {
                                    color: getStyle('--cui-body-color'),
                                }
                            }
                        },
                        scales: {
                            r: {
                                grid: {
                                    color: getStyle('--cui-border-color-translucent'),
                                },
                                ticks: {
                                    color: getStyle('--cui-body-color'),
                                },
                            },
                        },
                    }}
                />
            </CCardBody>
        </CCard>
    )
}
export default progress
