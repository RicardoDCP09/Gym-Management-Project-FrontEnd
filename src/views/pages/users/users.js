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
    const [newUser, setNewUser] = useState({ name: '', lastname: '', email: '', password: '', phone: '', fechanac: '', registerdate: '', typemembership: '', role: '' })
    const [deleteConfirmation, setDeleteConfirmation] = useState('')
    const [currentDate, setCurrentDate] = useState('')

    useEffect(() => {
        const fetchStaff = async () => {
            const userData = await API.get('users');
            const combinedData = userData.map(user => ({
                ...user,
                fechanac: user.fechanac ? user.fechanac.split('T')[0] : '',
                registerdate: user.registerdate ? user.registerdate.split('T')[0] : '',
            }));
            setUsers(combinedData);
        };

        fetchStaff();
    }, []);


    useEffect(() => {
        const fetchStateUser = async () => {
            const data = await API.get('roles')
            const filteredUserRole = data.filter(role => role.id_role === 3);
            setUserRole(filteredUserRole)
        }
        fetchStateUser()
    }, [])

    useEffect(() => {
        const fetchStateMemberRole = async () => {
            const data = await API.get('typememberships')
            setUsersMemberRole(data)
        }
        fetchStateMemberRole()
    }, [])


    const handleAddUser = async () => {
        try {
            const addedUser = await API.post('staff', {
                name: newUser.name,
                lastname: newUser.lastname,
                email: newUser.email,
                password: newUser.password,
                phone: newUser.phone,
                fechanac: newUser.fechanac,
                registerdate: newUser.registerdate,
                typemembership: newUser.typemembership,
                role: newUser.role
            });
            setUsers([...users, addedUser]);
            setNewUser({ name: '', lastname: '', email: '', password: '', phone: '', fechanac: '', registerdate: '', typemembership: '', role: '' });
            setVisible(false);
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };


    const handleEditUser = async () => {
        if (!currentUser || !currentUser.id_user) {
            console.error("Current user data is incomplete or does not have an ID and role id.");
            return;
        }
        console.log("currentStaff para editar:", currentUser);

        try {
            const updatedUser = await API.put('users', currentUser, currentUser.id_user);
            setUsers((prevUsers) =>
                prevUsers.map((Member) =>
                    Member.id_user === currentUser.id_user
                        ? { ...Member, ...updatedUser }
                        : Member
                )
            );

            setVisibleEdit(false);
            console.log("Usuario actualizado con éxito.");
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    };


    const handleDeleteUser = async () => {
        if (deleteConfirmation === 'confirm') {
            const userId = currentUser.id_user
            try {
                const deleteClass = await API.del('users', userId)
                setUsers(users.filter((user) => user.id_user !== userId))
                setVisibleDelete(false)
            } catch (error) {
                console.error("Error deleting Item:", error);
            }
        }
    };

    const getTypeMembership = (memId) => {
        const typeMembership = usersMemberRole.find((membership) => membership.id === Number(memId));
        return typeMembership ? typeMembership.name : 'No membership';
    };

    const getTypeRole = (roleId) => {
        const typeRoles = usersRole.find((role) => role.id_role === Number(roleId));
        return typeRoles ? typeRoles.name_role : 'Unknown';
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
                                            value={newUser?.fechanac ? newUser.fechanac.split('T')[0] : '' || ''}
                                            onChange={(e) => setNewUser({ ...newUser, fechanac: e.target.value })}
                                        /><small className="text-muted">Please select the date of birth.</small>
                                    </CCol>

                                    <CCol className='mb-3' md={6}>
                                        <CFormInput
                                            type="date"
                                            placeholder="register"
                                            value={newUser?.registerdate ? newUser.registerdate.split('T')[0] : '' || ''}
                                            onChange={(e) => setNewUser({ ...newUser, registerdate: e.target.value })}
                                        /><small className="text-muted">Please select the Day of Register.</small>
                                    </CCol>

                                </CRow>
                                <CRow>
                                    <CCol md={6}>
                                        <CFormSelect
                                            aria-label="Select Type Membership"
                                            value={newUser?.typemembership || 'No membership'}
                                            onChange={(e) => setNewUser({ ...newUser, typemembership: e.target.value })}

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
                                                <option key={role.id_role}
                                                    value={role.id_role}>
                                                    {role.name_role}
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
                        {users.map((user) => (
                            <CTableRow key={user.id_user}>
                                <CTableDataCell>{user.name}</CTableDataCell>
                                <CTableDataCell>{user.lastname}</CTableDataCell>
                                <CTableDataCell>{user.email}</CTableDataCell>
                                <CTableDataCell>{user.registerdate}</CTableDataCell>
                                <CTableDataCell>{getTypeMembership(user.typemembership)}</CTableDataCell>
                                <CTableDataCell>{getTypeRole(user.role)}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="info" onClick={() => { setCurrentUser(user); setVisibleEdit(!visibleEdit) }} variant='outline' size="sm" className="me-2" >Edit</CButton>
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
                                                        placeholder="date of birth"
                                                        value={currentUser?.fechanac ? currentUser.fechanac.split('T')[0] : '' || ''}
                                                        onChange={(e) => setCurrentUser({ ...currentUser, fechanac: e.target.value })}
                                                    /><small className="text-muted">Please select the date of birth.</small>
                                                </CCol>

                                                <CCol className='mb-3' md={6}>
                                                    <CFormInput
                                                        type="date"
                                                        placeholder="register"
                                                        value={currentUser?.registerdate ? currentUser.registerdate.split('T')[0] : '' || ''}
                                                        onChange={(e) => setCurrentUser({ ...currentUser, registerdate: e.target.value })}
                                                    /><small className="text-muted">Please select the Day of Register.</small>
                                                </CCol>

                                            </CRow>
                                            <CRow>
                                                <CCol md={6}>
                                                    <CFormSelect
                                                        aria-label="Select Type Membership"
                                                        value={currentUser?.typemembership || 'No membership'}
                                                        onChange={(e) => setCurrentUser({ ...currentUser, typemembership: e.target.value })}

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
                                                        value={currentUser?.role || ''}
                                                        onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                                                    >
                                                        <option value="" >Select Role</option>
                                                        {usersRole.map((role) => (
                                                            <option key={role.id_role}
                                                                value={role.id_role}>
                                                                {role.name_role}
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
                                                        value={currentUser?.phone || ''}
                                                        onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
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

