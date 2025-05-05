import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAvatar,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CAlert,
  CCardFooter,
  CFormSelect,
} from '@coreui/react'
import { helpFetch } from '../../../helpers/helpFetch'
import ComponentsImg from 'src/assets/images/avatars/3.jpg'
const UserProfile = () => {
  const API = helpFetch()
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [user, setUser] = useState(null)
  const [usersMemberRole, setUsersMemberRole] = useState([])
  const [roles, setRoles] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [error, setError] = useState(null)
  const [alert, setAlert] = useState({ show: false, message: '', color: '' })

  const loggedInUser = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchUser = async () => {
      if (loggedInUser && loggedInUser.id) {
        try {
          const userData = await API.get(`users/${loggedInUser.id}`)
          const userRoles = await API.get('user_roles')
          const roleRelation = userRoles.find((role) => role.user_id === userData.id)
          const combinedData = {
            ...userData,
            user_role_id: roleRelation ? roleRelation.id : null,
          }
          setUser(combinedData)
          setCurrentUser(combinedData)
        } catch (error) {
          setError('No se pudo cargar el perfil.')
        }
      } else {
        setError('Usuario no autenticado.')
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await API.get('roles')
      const filteredUserRole = data.filter(
        (role) => role.id === '1' || role.id === '2' || role.id === '3',
      )
      setRoles(filteredUserRole)
    }
    fetchRoles()
  }, [])

  useEffect(() => {
    const fetchStateMemberRole = async () => {
      try {
        const data = await API.get('typememberships')
        setUsersMemberRole(Array.isArray(data) ? data : [])
      } catch (error) {
        setUsersMemberRole([]) // Si hay error, deja el array vacío
      }
    }
    fetchStateMemberRole()
  }, [])

  const handleEditUser = async () => {
    if (!currentUser || !currentUser.id) {
      console.error('Current user data is incomplete or does not have an ID.')
      return
    }

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
          role: currentUser.role,
          address: currentUser.address,
          status: currentUser.status,
        },
        currentUser.id,
      )

      let userRolesId = currentUser.user_role_id

      if (userRolesId) {
        await API.put(
          'user_roles',
          {
            id: userRolesId,
            user_id: currentUser.id,
            role_id: currentUser.role,
          },
          userRolesId,
        )
      } else {
        const newUserRole = await API.post('user_roles', {
          user_id: currentUser.id,
          role_id: currentUser.role,
        })
        userRolesId = newUserRole.id
      }

      setUser({ ...updatedUser, user_role_id: userRolesId })
      setVisibleEdit(false)
      setAlert({ show: true, message: 'Profile updated successfully!', color: 'success' })
    } catch (error) {
      console.error('Error while updating user and user_roles:', error)
      setAlert({
        show: true,
        message: 'Error updating profile. Please try again.',
        color: 'danger',
      })
    }
  }

  const getRoleName = (roleId) => {
    const role = roles.find((role) => String(role.id) === String(roleId))
    return role ? role.name : 'Unknown'
  }
  if (error) {
    return <div>{error}</div>
  }
  if (!user) {
    return <div>Loading...</div>
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return dateStr.split('T')[0]
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">User Profile</h4>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol md="3" className="border-end">
            <div className="text-center mb-4">
              <CAvatar src={ComponentsImg} size="xl" className="mb-3" />
              <h4>
                {user?.name || ''} {user?.lastname || ''}
              </h4>
              <p>{user?.id ? `#${user.id}` : user?.id_user ? `#${user.id_user}` : ''}</p>
            </div>
          </CCol>
          <CCol md="9">
            <CRow>
              <CCol xs="6">
                <strong>Name:</strong>
                <p>
                  {user?.name || ''} {user?.lastname || ''}
                </p>
              </CCol>
              <CCol xs="6">
                <strong>Phone:</strong>
                <p>{user?.phone || ''}</p>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="6">
                <strong>Email:</strong>
                <p>{user?.email || ''}</p>
              </CCol>
              <CCol xs="6">
                <strong>Password:</strong>
                <p>••••••••</p>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="6">
                <strong>Role:</strong>
                <p>{getRoleName(user?.role || '')}</p>
              </CCol>
              <CCol xs="6">
                <strong>Membership Type:</strong>
                <p>{user?.typeMembership || 'Non Membership'}</p>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="6">
                <strong>Registration Date:</strong>
                <p>{formatDate(user?.registerDate || '')}</p>
              </CCol>
              <CCol xs="6">
                <strong>Birth Date:</strong>
                <p>{formatDate(user?.fechaNac || '')}</p>
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <CModal visible={visibleEdit} onClose={() => setVisibleEdit(false)}>
          <CModalHeader>
            <CModalTitle>Edit Profile</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CRow>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Name"
                    value={currentUser?.name || ''}
                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                    className="mb-3"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Last Name"
                    value={currentUser?.lastname || ''}
                    onChange={(e) => setCurrentUser({ ...currentUser, lastname: e.target.value })}
                    className="mb-3"
                  />
                </CCol>
              </CRow>
              <CFormInput
                type="email"
                label="Email"
                value={currentUser?.email || ''}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                className="mb-3"
              />
              <CFormInput
                type="tel"
                label="Phone"
                value={currentUser?.phone || ''}
                onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                className="mb-3"
              />
              <CFormSelect
                aria-label="Select Type Membership"
                className="mb-3"
                label="Membership"
                value={currentUser?.typeMembership || ''}
                onChange={(e) => setCurrentUser({ ...currentUser, typeMembership: e.target.value })}
              >
                <option value="">Select Type Membership</option>
                {Array.isArray(usersMemberRole) &&
                  usersMemberRole.map((membership) => (
                    <option key={membership.id} value={membership.id}>
                      {membership.name}
                    </option>
                  ))}
              </CFormSelect>
              <CRow>
                <CCol md={6}>
                  <CFormInput
                    type="date"
                    label="Birth Date"
                    value={formatDate(currentUser?.fechaNac || '')}
                    onChange={(e) => setCurrentUser({ ...currentUser, fechaNac: e.target.value })}
                    className="mb-3"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="date"
                    label="Registration Date"
                    value={formatDate(currentUser?.registerDate || '')}
                    onChange={(e) =>
                      setCurrentUser({ ...currentUser, registerDate: e.target.value })
                    }
                    className="mb-3"
                  />
                </CCol>
              </CRow>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={handleEditUser}>
              Save Changes
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
      <CCardFooter>
        <CCol className="mb-0 d-flex justify-content-end">
          <CButton color="primary" onClick={() => setVisibleEdit(true)}>
            Edit Profile
          </CButton>
        </CCol>
      </CCardFooter>
    </CCard>
  )
}

export default UserProfile
