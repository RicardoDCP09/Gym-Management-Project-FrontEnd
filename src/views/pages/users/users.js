import CIcon from '@coreui/icons-react'
import {
    cilClock,
    cilSpeedometer,
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
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CFormSelect,
    CFormTextarea,
} from '@coreui/react';
import { useState, useEffect } from 'react'
import { helpFetch } from '../../../helpers/helpFetch';

const Users = () => {
    const API = helpFetch()
    const [users, setUsers] = useState([])
    const [usersRole, setUserRole] = useState([]);
    const [usersMemberRole, setUsersMemberRole] = useState([]);
    const [currentUser, setCurrentUser] = useState(null)
    const [visible, setVisible] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [newUser, setNewUser] = useState({ name: '', lastname: '', email: '', password: '', phone: '', fechaNac: '', registerDate: '', typeMembership: '', role: '' })
    const [deleteConfirmation, setDeleteConfirmation] = useState('')
    const [currentDate, setCurrentDate] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            const data = await API.get('users')
            const userRoles = await API.get('user_roles')
            const userProgress = await API.get('progress')
            const filteredUserData = data.filter(user => user.role === '3');
            const combinedData = filteredUserData.map(user => {
                const roleRelation = userRoles.find(role => role.user_id === user.id)
                const progressRelation = userProgress.find(progress => progress.user_id === user.id)
                return {
                    ...user,
                    user_role_id: roleRelation ? roleRelation.id : null,
                    user_progress: progressRelation ? progressRelation.id : null
                };
            })
            setUsers(combinedData)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const fetchStateUser = async () => {
            const data = await API.get('roles')
            const filteredUserRole = data.filter(role => role.id === '3');
            setUserRole(filteredUserRole)
        }
        fetchStateUser()
    }, [])

    useEffect(() => {
        const fetchStateMemberRole = async () => {
            const data = await API.get('type_memberships')
            setUsersMemberRole(data)
        }
        fetchStateMemberRole()
    }, [])


    const handleAddUser = async () => {
        const addedUser = await API.post('users', {
            name: newUser.name,
            lastname: newUser.lastname,
            email: newUser.email,
            password: newUser.password,
            phone: newUser.phone,
            fechaNac: newUser.fechaNac,
            registerDate: newUser.registerDate,
            typeMembership: newUser.typeMembership,
            role: newUser.role
        });
        const newUserRole = {
            user_id: addedUser.id,
            role_id: newUser.role,
        }
        const addedRole = await API.post('user_roles', newUserRole)
        setUsers([...users, { ...addedUser, user_role_id: addedRole.id }]);
        setNewUser({ name: '', lastname: '', email: '', password: '', phone: '', fechaNac: '', registerDate: '', typeMembership: '', role: '' })
        setVisible(false)
    };

    const handleEditUser = async () => {
        if (!currentUser || !currentUser.id) {
            console.error("Current user data is incomplete or does not have an ID and role id.");
            return;
        }
        console.log("currentStaff para editar:", currentUser);

        try {
            const updatedUser = await API.put(
                'users',
                {
                    id: currentUser.id,
                    name: currentUser.name,
                    lastname: currentUser.lastname,
                    email: currentUser.email,
                    password: currentUser.password,
                    phone: currentUser.phone,
                    fechaNac: currentUser.fechaNac,
                    registerDate: currentUser.registerDate,
                    typeMembership: currentUser.typeMembership,
                    role: currentUser.role
                }, currentUser.id
            );
            let userRolesId = currentUser.user_role_id
            if (userRolesId) {
                await API.put(
                    'user_roles',
                    {
                        id: userRolesId,
                        user_id: currentUser.id,
                        role_id: currentUser.role
                    }, userRolesId
                )
            } else {
                const newUserRole = await API.post('user_roles', {
                    user_id: currentUser.id,
                    role_id: currentUser.role,
                });
                userRolesId = newUserRole.id;
            }

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === currentUser.id
                        ? { ...user, ...updatedUser, user_role_id: userRolesId }
                        : user
                )
            );
            setVisibleEdit(false);
        } catch (error) {
            console.error("Error while updating user and user_roles:", error);
        }
    };


    const handleDeleteUser = async () => {
        if (deleteConfirmation === 'confirm') {
            const userId = currentUser.id
            const userRoleId = currentUser.user_role_id
            const userProgress = currentUser.user_progress
            try {
                await API.del('users', userId)
                await API.del('user_roles', userRoleId)
                await API.del('progress', userProgress)
                setUsers(users.filter((user) => user.id !== userId))
                setVisibleDelete(false)
            } catch (error) {
                console.error("Error deleting Item:", error);
            }
        }
    };


    const getTypeMembership = (memId) => {
        const typeMembership = usersMemberRole.find((membership) => membership.id === memId);
        return typeMembership ? typeMembership.name : 'No membership';
    };


    const getTypeRole = (roleId) => {
        const typeRoles = usersRole.find((role) => role.id === roleId);
        return typeRoles ? typeRoles.name : 'Unknown';
    }



    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Users Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4" onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
                    <CRow className="g-3">
                        <CCol className='d-flex justify-content-start'>
                            <CButton className='me-2' color="primary" onClick={() => setVisible(!visible)}>Add User</CButton>
                        </CCol>
                        <CModal
                            backdrop="static"
                            visible={visible}
                            onClose={() => setVisible(false)}
                            aria-labelledby="Modal create users"
                        >
                            <CModalHeader>
                                <CModalTitle id="Create Users">New Users</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CRow className="mb-3">
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="text"
                                            placeholder="Name"
                                            value={newUser?.name || ''}
                                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        />
                                    </CCol>
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="text"
                                            placeholder="Last Name"
                                            value={newUser?.lastname || ''}
                                            onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="text"
                                            placeholder="Email"
                                            value={newUser?.email || ''}
                                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        />
                                    </CCol>
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="password"
                                            placeholder="Password"
                                            value={newUser?.password || ''}
                                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="date"
                                            placeholder="date of birth"
                                            value={newUser?.fechaNac || ''}
                                            onChange={(e) => setNewUser({ ...newUser, fechaNac: e.target.value })}
                                        /><small className="text-muted">Please select the date of birth.</small>
                                    </CCol>

                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="date"
                                            placeholder="register"
                                            value={newUser?.registerDate || ''}
                                            onChange={(e) => setNewUser({ ...newUser, registerDate: e.target.value })}
                                        /><small className="text-muted">Please select the Day of Register.</small>
                                    </CCol>

                                </CRow>
                                <CRow>
                                    <CCol md={6}>
                                        <CFormSelect
                                            aria-label="Select Type Membership"
                                            value={newUser?.typeMembership || 'No membership'}
                                            onChange={(e) => setNewUser({ ...newUser, typeMembership: e.target.value })}

                                        >  <option value="">Select Type Membership</option>
                                            {usersMemberRole.map((membership) => (
                                                <option key={membership.id}
                                                    value={membership.id}>
                                                    {membership.name}
                                                </option>

                                            ))}
                                        </CFormSelect>
                                    </CCol>

                                    <CCol className='mb-3' md={6}>
                                        <CFormSelect
                                            aria-label="Select Role"
                                            value={newUser?.role || ''}
                                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                        >
                                            <option value="" >Select Role</option>
                                            {usersRole.map((role) => (
                                                <option key={role.id}
                                                    value={role.id}>
                                                    {role.name}
                                                </option>

                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className='mb-3' md={12}>
                                        <CFormInput
                                            type="text"
                                            placeholder="Phone"
                                            value={newUser?.phone || ''}
                                            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                                        />
                                    </CCol>
                                </CRow>

                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Close
                                </CButton>
                                <CButton color="primary" onClick={() => { handleAddUser() }}>Add User</CButton>
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
                            <CTableHeaderCell>Membership
                                <CIcon icon={cilContact} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Role
                                <CIcon icon={cilSpeedometer} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Actions
                                <CIcon icon={cilColorBorder} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {users.map((users) => (
                            <CTableRow key={users?.id || ''}>
                                <CTableDataCell>{users?.name || ''}</CTableDataCell>
                                <CTableDataCell>{users?.lastname || ''}</CTableDataCell>
                                <CTableDataCell>{users?.email || ''}</CTableDataCell>
                                <CTableDataCell>{users?.registerDate || ''}</CTableDataCell>
                                <CTableDataCell>{getTypeMembership(users?.typeMembership || 'No Membership')}</CTableDataCell>
                                <CTableDataCell>{getTypeRole(users?.role || '')}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="info" onClick={() => { setCurrentUser(users); setVisibleEdit(!visibleEdit) }} variant='outline' size="sm" className="me-2" >Edit</CButton>
                                    <CModal
                                        backdrop="static"
                                        visible={visibleEdit}
                                        onClose={() => setVisibleEdit(false)}
                                        aria-labelledby="Modal Info"
                                    >
                                        <CModalHeader>
                                            <CModalTitle id="Create Users">Edit Users</CModalTitle>
                                        </CModalHeader>
                                        <CModalBody>
                                            <CRow className="mb-3">
                                                <CCol className='mb-3' md={6}>
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="Name"
                                                        value={currentUser?.name || ''}
                                                        onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol className='mb-3' md={6}>
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="Last Name"
                                                        value={currentUser?.lastname || ''}
                                                        onChange={(e) => setCurrentUser({ ...currentUser, lastname: e.target.value })}
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow className="mb-3">
                                                <CCol className='mb-3' md={6}>
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="Email"
                                                        value={currentUser?.email || ''}
                                                        onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                                                    />
                                                </CCol>

                                                <CCol className='mb-3' md={6}>
                                                    <CFormInput
                                                        type="password"
                                                        placeholder="Password"
                                                        value={currentUser?.password || ''}
                                                        onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                                                    />
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol className='mb-3' md={6}>
                                                    <CFormInput
                                                        type="date"
                                                        placeholder="Date(birthday)"
                                                        value={currentUser?.fechaNac || '' || currentDate}
                                                        onChange={(e) => setCurrentUser({ ...currentUser, fechaNac: e.target.value })}
                                                    />
                                                </CCol>

                                                <CCol md={6}>
                                                    <CFormSelect
                                                        aria-label="Select Type Membership"
                                                        value={currentUser?.typeMembership || ''}
                                                        onChange={(e) => setCurrentUser({ ...currentUser, typeMembership: e.target.value })}

                                                    >  <option value="">Select Type Membership</option>
                                                        {usersMemberRole.map((membership) => (
                                                            <option key={membership.id}
                                                                value={membership.id}>
                                                                {membership.name}
                                                            </option>

                                                        ))}
                                                    </CFormSelect>
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol className='mb-3' md={6}>
                                                    <CFormSelect
                                                        aria-label="Select Role"
                                                        value={currentUser?.role || ''}
                                                        onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                                                    >
                                                        <option value="" >Select Role</option>
                                                        {usersRole.map((role) => (
                                                            <option key={role.id}
                                                                value={role.id}>
                                                                {role.name}
                                                            </option>

                                                        ))}
                                                    </CFormSelect>
                                                </CCol>

                                                <CCol className='mb-3' md={6}>
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="Phone"
                                                        value={currentUser?.phone || ''}
                                                        onChange={(e) => setCurrentUser({ ...newUser, phone: e.target.value })}
                                                    />
                                                </CCol>
                                            </CRow>
                                        </CModalBody>
                                        <CModalFooter>
                                            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
                                                Close
                                            </CButton>
                                            <CButton color="primary" onClick={handleEditUser} >Save Edit</CButton>
                                        </CModalFooter>

                                    </CModal>
                                    <CButton color="danger" onClick={() => { setCurrentUser(users); setVisibleDelete(true) }} variant='outline' size="sm">Delete</CButton>
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
                                            <CButton color="primary" onClick={handleDeleteUser} >Delete</CButton>
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

export default Users;

