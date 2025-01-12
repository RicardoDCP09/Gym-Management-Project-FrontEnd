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
} from '@coreui/react';

import { useState, useEffect } from 'react'
import { helpFetch } from '../../../helpers/helpFetch';
const staff = () => {
    const API = helpFetch()
    const [staff, setStaff] = useState([])
    const [roles, setRoles] = useState([])
    const [visible, setVisible] = useState(false)
    const [visiblePermissions, setVisiblePermissions] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [currentStaff, setCurrentStaff] = useState(null)
    const [newStaff, setNewStaff] = useState({ name: '', lastname: '', email: '', password: '', phone: '', fechaNac: '', registerDate: '', typeMembership: '', role: '', payment: '', user_role_id: null })
    const [deleteConfirmation, setDeleteConfirmation] = useState('')

    useEffect(() => {
        const fetchStaff = async () => {
            const userData = await API.get('users')
            const userRoles = await API.get('user_roles')
            const filteredUserData = userData.filter(user => user.role === '1' || user.role === '2');
            const combinedData = filteredUserData.map(user => {
                const roleRelation = userRoles.find(role => role.user_id === user.id);
                return {
                    ...user,
                    user_role_id: roleRelation ? roleRelation.id : null,
                };

            });
            setStaff(combinedData);
        };

        fetchStaff();
    }, []);

    useEffect(() => {
        const fetchRoles = async () => {
            const data = await API.get('roles')
            const filteredUserRole = data.filter(role => role.id === '1' || role.id === '2');
            setRoles(filteredUserRole)
        }
        fetchRoles()
    }, [])

    const getRoleName = (roleId) => {
        const role = roles.find(role => role.id === roleId)
        return role ? role.name : 'Unknown'
    }

    const handleAddStaff = async () => {
        const addedUser = await API.post('users', {
            name: newStaff.name,
            lastname: newStaff.lastname,
            email: newStaff.email,
            password: newStaff.password,
            phone: newStaff.phone,
            fechaNac: newStaff.fechaNac,
            registerDate: newStaff.registerDate,
            typeMembership: newStaff.typeMembership,
            role: newStaff.role
        });
        const newUserRole = {
            user_id: addedUser.id,
            role_id: newStaff.role
        };
        const addedRole = await API.post('user_roles', newUserRole);
        setStaff([...staff, { ...addedUser, user_role_id: addedRole.id }]);
        setNewStaff({ name: '', lastname: '', email: '', password: '', phone: '', fechaNac: '', registerDate: '', typeMembership: '', role: '', payment: '' });
        setVisible(false);
    };


    const handleEditStaff = async () => {
        if (!currentStaff || !currentStaff.id) {
            console.error("Datos insuficientes para actualizar el usuario o el rol.", currentStaff);
            return;
        }
        console.log("currentStaff para editar:", currentStaff);

        try {
            const updatedUser = await API.put(
                'users',
                {
                    id: currentStaff.id,
                    name: currentStaff.name,
                    lastname: currentStaff.lastname,
                    email: currentStaff.email,
                    password: currentStaff.password,
                    phone: currentStaff.phone,
                    fechaNac: currentStaff.fechaNac,
                    registerDate: currentStaff.registerDate,
                    typeMembership: currentStaff.typeMembership,
                    role: currentStaff.role
                }, currentStaff.id
            );

            let userRoleId = currentStaff.user_role_id;
            if (userRoleId) {
                await API.put(
                    'user_roles',
                    {
                        id: userRoleId,
                        user_id: currentStaff.id,
                        role_id: currentStaff.role,
                    }, userRoleId
                );
            } else {
                const newUserRole = await API.post('user_roles', {
                    user_id: currentStaff.id,
                    role_id: currentStaff.role
                });
                userRoleId = newUserRole.id;
            }

            setStaff((prevUsers) =>
                prevUsers.map((staff) =>
                    staff.id === currentStaff.id
                        ? { ...staff, ...updatedUser, user_role_id: userRoleId }
                        : staff
                )
            );
            setVisibleEdit(false);
            console.log("Usuario y rol actualizados con éxito.");
        } catch (error) {
            console.error("Error al actualizar el usuario y el rol:", error);
        }
    };


    const handleDeleteStaff = async () => {
        if (deleteConfirmation === 'confirm') {
            const staffId = currentStaff.id;
            const userRoleId = currentStaff.user_role_id;
            try {
                await API.del('users', staffId);
                await API.del('user_roles', userRoleId);
                setStaff(staff.filter(member => member.id !== staffId));
                setVisibleDelete(false);
                console.log(`Eliminación exitosa del usuario y su rol.`);
            } catch (error) {
                console.error("Error durante la eliminación:", error);
            }
        }
    };


    return (
        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Staff Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4" onSubmit={(e) => { e.preventDefault(); handleAddStaff() }}>
                    <CRow className="g-3">
                        <CCol className="d-flex justify-content-start">
                            <CButton color="primary" onClick={() => setVisible(!visible)}>Add new member</CButton>
                        </CCol>
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
                                            value={newStaff?.lastname || ''}
                                            onChange={(e) => setNewStaff({ ...newStaff, lastname: e.target.value })}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="text"
                                            placeholder="Email"
                                            value={newStaff?.email || ''}
                                            onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                                        />
                                    </CCol>
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="password"
                                            placeholder="Password"
                                            value={newStaff?.password || ''}
                                            onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                                        />
                                    </CCol>

                                </CRow>
                                <CRow>
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="date"
                                            placeholder="date of birth"
                                            value={newStaff?.fechaNac || ''}
                                            onChange={(e) => setNewStaff({ ...newStaff, fechaNac: e.target.value })}
                                        /><small className="text-muted">Please select the date of birth.</small>
                                    </CCol>

                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="date"
                                            placeholder="Date(Star Job)"
                                            value={newStaff?.registerDate || ''}
                                            onChange={(e) => setNewStaff({ ...newStaff, registerDate: e.target.value })}
                                        /><small className="text-muted">Please select the Day of Register.</small>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="text"
                                            placeholder="Phone"
                                            value={newStaff?.phone || ''}
                                            onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormSelect
                                            aria-label="Select Role"
                                            value={newStaff?.role || ''}
                                            onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                                        >
                                            <option>Select a Role</option>
                                            {roles.map((role) => (
                                                <option key={role.id}
                                                    value={role.id}>{
                                                        role.name}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                </CRow>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Close
                                </CButton>
                                <CButton color="primary" onClick={() => { handleAddStaff() }} >Add Member</CButton>
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
                        {staff.map((staffMember) => (
                            <CTableRow key={staffMember?.id || ''}>
                                <CTableDataCell>{staffMember?.name || ''}</CTableDataCell>
                                <CTableDataCell>{staffMember?.lastname || ''}</CTableDataCell>
                                <CTableDataCell>{staffMember?.email || ''}</CTableDataCell>
                                <CTableDataCell>{staffMember?.registerDate || ''}</CTableDataCell>
                                <CTableDataCell>{getRoleName(staffMember?.role || '')}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="info" onClick={() => { setCurrentStaff(staffMember); setVisibleEdit(!visibleEdit) }} variant='outline' size="sm" className="me-2 mb-2" >Edit</CButton>
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
                                                        value={currentStaff?.name || ''}
                                                        onChange={(e) => setCurrentStaff({ ...currentStaff, name: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol className='mb-3' md={6}>
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="Last Name"
                                                        value={currentStaff?.lastname || ''}
                                                        onChange={(e) => setCurrentStaff({ ...currentStaff, lastname: e.target.value })}
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CCol className='mb-3' md={6}>
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="Email"
                                                        value={currentStaff?.email || ''}
                                                        onChange={(e) => setCurrentStaff({ ...currentStaff, email: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol className='mb-3' md={6}>
                                                    <CFormInput
                                                        type="password"
                                                        placeholder="Password"
                                                        value={currentStaff?.password || ''}
                                                        onChange={(e) => setCurrentStaff({ ...currentStaff, password: e.target.value })}
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol className='mb-3' md={6}>
                                                    <CFormInput
                                                        type="date"
                                                        placeholder="date of birth"
                                                        value={currentStaff?.fechaNac || ''}
                                                        onChange={(e) => setCurrentStaff({ ...currentStaff, fechaNac: e.target.value })}
                                                    /><small className="text-muted">Please select the date of birth.</small>
                                                </CCol>
                                                <CCol className='mb-3' md={6}>
                                                    <CFormInput
                                                        type="date"
                                                        placeholder="Date(Star Job)"
                                                        value={currentStaff?.registerDate || ''}
                                                        onChange={(e) => setCurrentStaff({ ...currentStaff, registerDate: e.target.value })}
                                                    /><small className="text-muted">Please select the Day of Register.</small>
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol className='mb-3' md={6}>
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="Phone"
                                                        value={currentStaff?.phone || ''}
                                                        onChange={(e) => setCurrentStaff({ ...currentStaff, phone: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={6}>
                                                    <CFormSelect
                                                        aria-label="Select Role"
                                                        value={currentStaff?.role || ''}
                                                        onChange={(e) => setCurrentStaff({ ...currentStaff, role: e.target.value })}
                                                    >
                                                        <option>Select a Role</option>
                                                        {roles.map((role) => (
                                                            <option key={role.id}
                                                                value={role.id}>{
                                                                    role.name}
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
                                            <CButton color="primary" onClick={handleEditStaff}>Save Edit</CButton>
                                        </CModalFooter>

                                    </CModal>
                                    <CButton color="danger" onClick={() => { setCurrentStaff(staffMember); setVisibleDelete(!visibleDelete) }} variant='outline' size="sm" className="me-2 mb-2">Delete</CButton>
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
                                            <CButton color="primary" onClick={handleDeleteStaff}>Delete</CButton>
                                        </CModalFooter>
                                    </CModal>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody >
        </CCard >
    )
}
export default staff 
