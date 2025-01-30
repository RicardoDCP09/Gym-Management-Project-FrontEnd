import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CAlert,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilWarning } from '@coreui/icons'
import { useState, useEffect } from 'react'
import { helpFetch } from '../../../helpers/helpFetch';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const API = helpFetch()
  const [users, setUsers] = useState([])
  const [usersRole, setUserRole] = useState([]);
  const [usersMemberRole, setUsersMemberRole] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', lastname: '', email: '', password: '', phone: '', fechaNac: '', registerDate: '', typeMembership: '', role: '' })
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordError, setShowPasswordError] = useState(false);
  const navigate = useNavigate();

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

    if (newUser.password !== confirmPassword) {

      setShowPasswordError(true)
      return;
    }
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
    setConfirmPassword('');
    setShowPasswordError(false);
    navigate('/')
    setVisible(false)
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm className="mb-4" onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  {showPasswordError && (
                    <CAlert color="warning" className="d-flex align-items-center mb-3">
                      <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                      <div>The password doesn't match</div>
                    </CAlert>
                  )}
                  <CRow>
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
                        type="text"
                        placeholder="Phone"
                        value={newUser?.phone || ''}
                        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
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
                    <CCol className='mb-3' md={6}>
                      <CFormInput
                        icon={cilLockLocked}
                        type="password"
                        placeholder="Password"
                        value={newUser?.password || ''}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      />
                    </CCol>
                    <CCol className='mb-3' md={6}>
                      <CFormInput
                        icon={cilLockLocked}
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </CCol>

                  </CRow>
                  <div className="d-grid">
                    <CButton style={{ backgroundColor: '#ce4242' }} onClick={() => { handleAddUser() }}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div >
  )
}

export default Register
