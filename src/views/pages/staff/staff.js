import CIcon from '@coreui/icons-react'
import {
    cilClock,
    cilTag,
    cilColorBorder,
    cilTags,
    cilAt,
    cilContact,
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
    CTableBody,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CFormSelect,
    CFormCheck,
    CFormTextarea

} from '@coreui/react';

import { useState, useEffect } from 'react'
import { helpFetch } from '../../../helpers/helpFetch';
const staff = () => {
    const API = helpFetch()
    const [staff, setStaff] = useState([])
    const [roles, setRoles] = useState([])
    const [visible, setVisible] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [currentStaff, setCurrentStaff] = useState(null)
    const [newStaff, setNewStaff] = useState({ name: '', lastname: '', email: '', register_date: '', role_id: '' })
    const [deleteConfirmation, setDeleteConfirmation] = useState('')
    useEffect(() => {
        const fetchStaff = async () => {
            const userData = await API.get('users')
            const userRoles = await API.get('user_roles')
            const combinedData = userData.map(user => {
                const role = userRoles.find(role => role.user_id === user.id)
                return { ...user, role_id: role ? role.role_id : null }
            })
            setStaff(combinedData)
        }
        fetchStaff()
    }, [])

    useEffect(() => {
        const fetchRoles = async () => {
            const data = await API.get('roles')
            setRoles(data)
        }
        fetchRoles()
    }, [])

    const handleAddStaff = async () => {
        const addedUser = await API.post('users', {
            name: newStaff.name,
            lastname: newStaff.lastname,
            email: newStaff.email,
            register_date: newStaff.register_date
        })
        await API.post('user_roles', { user_id: addedUser.id, role_id: newStaff.role_id })
        setStaff([...staff, { ...addedUser, role_id: newStaff.role_id }])
        setNewStaff({ name: '', lastname: '', email: '', register_date: '', role_id: '' })
        setVisible(false)
    }
    const handleEditStaff = async () => {
        if (!currentStaff || !currentStaff.id) {
            console.error("Current staff member is not set or does not have an ID.")
            return
        }
        try {
            const updatedUser = await API.put('users', {
                name: currentStaff.name,
                lastname: currentStaff.lastname,
                email: currentStaff.email,
                register_date: currentStaff.register_date
            }, currentStaff.id)
            await API.put('user_roles', { role_id: currentStaff.role_id }, currentStaff.id)
            setStaff(staff.map(member => member.id === currentStaff.id ? { ...updatedUser, role_id: currentStaff.role_id } : member))
            setVisibleEdit(false)
        } catch (error) {
            console.error("Error updating staff member:", error)
        }
    }
    const handleDeleteStaff = async () => {
        if (deleteConfirmation === 'confirm') {
            const staffId = currentStaff.id
            try {
                await API.del('users', staffId)
                await API.del('user_roles', staffId)
                setStaff(staff.filter(member => member.id !== staffId))
                setVisibleDelete(false)
            } catch (error) {
                console.error("Error deleting staff member:", error)
            }
        }
    }

    const getRoleName = (roleId) => {
        const role = roles.find(role => role.id === roleId)
        return role ? role.name : 'Unknown'
    }

    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Staff Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4" onSubmit={(e) => { e.preventDefault(); handleAddStaff() }}>
                    <CRow className="g-3">
                        <CButton color="primary" onClick={() => setVisible(!visible)}>Add new member</CButton>
                        <CModal
                            backdrop="static"
                            visible={visible}
                            onClose={() => setVisible(false)}
                            aria-labelledby="New user Modal"
                        >
                            <CModalHeader>
                                <CModalTitle id="Create Users">New Member</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CRow className="mb-3">
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="text"
                                            placeholder="Name"
                                            value={newStaff?.name || ''}
                                            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                                        />
                                    </CCol>
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="text"
                                            placeholder="Last Name"
                                            value={newStaff?.lastName || ''}
                                            onChange={(e) => setNewStaff({ ...newStaff, lastName: e.target.value })}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="text"
                                            placeholder="Email"
                                            value={""}
                                        />
                                    </CCol>
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="date"
                                            placeholder="Date(Star Job)"
                                            value={""}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="password"
                                            placeholder="Password"
                                            value={""}
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormSelect
                                            aria-label="Select Role"
                                            options={[
                                                'Select a Role',
                                                { label: 'Administrator', value: '1' },
                                                { label: 'Traineer', value: '2' },
                                            ]}
                                        />
                                    </CCol>
                                </CRow>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Close
                                </CButton>
                                <CButton color="primary">Add Member</CButton>
                            </CModalFooter>
                        </CModal>
                    </CRow>
                </CForm>

                <CTable hover responsive>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>Name
                                <CIcon icon={cilTag} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Last-Name
                                <CIcon icon={cilTags} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Email
                                <CIcon icon={cilAt} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>RegisterDate
                                <CIcon icon={cilClock} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Role
                                <CIcon icon={cilContact} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Actions
                                <CIcon icon={cilColorBorder} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>{"Jose "}</CTableDataCell>
                            <CTableDataCell>{"Perez"}</CTableDataCell>
                            <CTableDataCell>{"example@gmail.com"}</CTableDataCell>
                            <CTableDataCell>{"12 / 01 / 24 08:30"}</CTableDataCell>
                            <CTableDataCell>{"Traineer"}</CTableDataCell>
                            <CTableDataCell>
                                <CButton color="info" onClick={() => setVisibleEdit(!visibleEdit)} variant='outline' size="sm" className="me-2 mb-2" >Edit</CButton>
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
                                            <CCol className='mb-3' md={6}>
                                                <CFormInput
                                                    type="text"
                                                    placeholder="Name"
                                                    value={""}
                                                />
                                            </CCol>
                                            <CCol className='mb-3' md={6}>
                                                <CFormInput
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={""}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow className="mb-3">
                                            <CCol className='mb-3' md={6}>
                                                <CFormInput
                                                    type="text"
                                                    placeholder="Email"
                                                    value={""}
                                                />
                                            </CCol>
                                            <CCol className='mb-3' md={6}>
                                                <CFormInput
                                                    type="date"
                                                    placeholder="Date(Star Job)"
                                                    value={""}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol className='mb-3' md={6}>
                                                <CFormInput
                                                    type="password"
                                                    placeholder="Password"
                                                    value={""}
                                                />
                                            </CCol>
                                            <CCol md={6}>
                                                <CFormSelect
                                                    aria-label="Select Role"
                                                    options={[
                                                        'Select a Role',
                                                        { label: 'Administrator', value: '1' },
                                                        { label: 'Traineer', value: '2' },
                                                    ]}
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
                                <CButton color="danger" onClick={() => setVisibleDelete(!visibleDelete)} variant='outline' size="sm" className="me-2 mb-2">Delete</CButton>
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
                                <CButton color="warning" onClick={() => setVisiblePermissions(!visiblePermissions)} variant='outline' size="sm" className="me-2 mb-2" >Permissions</CButton>
                                <CModal
                                    backdrop="static"
                                    visible={visiblePermissions}
                                    onClose={() => setVisiblePermissions(false)}
                                    aria-labelledby="Permissions Modal"
                                >
                                    <CModalHeader>
                                        <CModalTitle id="Create Users">Permissions </CModalTitle>
                                    </CModalHeader>
                                    <CModalBody>
                                        <CTable hover responsive>
                                            <CTableHead>
                                                <CTableRow>
                                                    <CTableHeaderCell>
                                                        Permissions
                                                    </CTableHeaderCell>
                                                    <CTableHeaderCell>
                                                        Member
                                                    </CTableHeaderCell>
                                                    <CTableHeaderCell>
                                                        Traineer
                                                    </CTableHeaderCell>
                                                    <CTableHeaderCell>
                                                        Administrator
                                                    </CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            <CTableBody>
                                                <CTableRow>
                                                    <CTableDataCell>{
                                                        "Ver Clases"}
                                                    </CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                </CTableRow>
                                                <CTableRow>
                                                    <CTableDataCell>{
                                                        "Modificar Clases"}
                                                    </CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                </CTableRow>
                                                <CTableRow>
                                                    <CTableDataCell>{
                                                        "Ver Usuarios"}
                                                    </CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                </CTableRow>
                                                <CTableRow>
                                                    <CTableDataCell>{
                                                        "Modificar Usuarios"}
                                                    </CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                </CTableRow>
                                                <CTableRow>
                                                    <CTableDataCell>{
                                                        "Ver Inventario"}
                                                    </CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                </CTableRow>
                                                <CTableRow>
                                                    <CTableDataCell>{
                                                        "Modificar Inventario"}
                                                    </CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                    <CTableDataCell>{
                                                        <CFormCheck type="checkbox" />
                                                    }</CTableDataCell>
                                                </CTableRow>
                                            </CTableBody>
                                        </CTable>
                                    </CModalBody>
                                    <CModalFooter>
                                        <CButton color="secondary" onClick={() => setVisiblePermissions(false)}>
                                            Close
                                        </CButton>
                                        <CButton color="primary">Save Changes</CButton>
                                    </CModalFooter>
                                </CModal>
                            </CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CCardBody >
        </CCard >
    )
}
export default staff 
