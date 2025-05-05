import CIcon from '@coreui/icons-react'
import { cilClock, cilTag, cilColorBorder, cilTags, cilAt, cilContact } from '@coreui/icons'
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
} from '@coreui/react'

import { useState, useEffect } from 'react'
import { helpFetch } from '../../../helpers/helpFetch'

const staff = () => {
  const API = helpFetch()
  const [staff, setStaff] = useState([])
  const [roles, setRoles] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [currentStaff, setCurrentStaff] = useState(null)
  const [newStaff, setNewStaff] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    fechanac: '',
    registerdate: '',
    typemembership: '',
    role: '',
  })
  const [deleteConfirmation, setDeleteConfirmation] = useState('')

  useEffect(() => {
    const fetchStaff = async () => {
      const userData = await API.get('staff')
      const combinedData = userData.map((user) => ({
        ...user,
        fechanac: user.fechanac ? user.fechanac.split('T')[0] : '',
        registerdate: user.registerdate ? user.registerdate.split('T')[0] : '',
      }))
      setStaff(combinedData)
    }

    fetchStaff()
  }, [])

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await API.get('roles')
      const filteredUserRole = data.filter((role) => role.id_role === 1 || role.id_role === 2)
      setRoles(filteredUserRole)
    }
    fetchRoles()
  }, [])

  const getRoleName = (roleId) => {
    const typeRoles = roles.find((role) => role.id_role === roleId)
    return typeRoles ? typeRoles.name_role : 'Unknown'
  }

  const handleAddStaff = async () => {
    try {
      const addedUser = await API.post('staff', {
        name: newStaff.name,
        lastname: newStaff.lastname,
        email: newStaff.email,
        password: newStaff.password,
        phone: newStaff.phone,
        fechanac: newStaff.fechanac,
        registerdate: newStaff.registerdate,
        typemembership: newStaff.typemembership,
        role: newStaff.role,
      })
      setStaff([...staff, addedUser])
      setNewStaff({
        name: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        fechanac: '',
        registerdate: '',
        typemembership: '',
        role: '',
      })
      setVisible(false)
    } catch (error) {
      console.error('Error adding staff:', error)
    }
  }

  const handleEditStaff = async () => {
    if (!currentStaff || !currentStaff.id_user) {
      console.error('No staff member selected')
      return
    }
    try {
      const updatedUser = await API.put('staff', currentStaff, currentStaff.id_user)
      setStaff((prevUsers) =>
        prevUsers.map((staffMember) =>
          staffMember.id_user === currentStaff.id_user
            ? { ...staffMember, ...updatedUser }
            : staffMember,
        ),
      )

      setVisibleEdit(false)
      console.log('Usuario actualizado con éxito.')
    } catch (error) {
      console.error('Error al actualizar el usuario:', error)
    }
  }
  const handleDeleteStaff = async () => {
    if (deleteConfirmation === 'confirm') {
      const staffId = currentStaff.id_user // Asegúrate de que estás usando el ID correcto
      try {
        const deleteClass = await API.del('staff', staffId)
        setStaff(staff.filter((member) => member.id_user !== staffId)) // Actualiza el estado para eliminar al usuario
        setVisibleDelete(false)
        console.log(`Eliminación exitosa del usuario.`)
      } catch (error) {
        console.error('Error durante la eliminación:', error)
      }
    } else {
      console.warn('Confirmación de eliminación no válida.')
    }
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h4 className="mb-0">Staff Management</h4>
      </CCardHeader>
      <CCardBody>
        <CForm
          className="mb-4"
          onSubmit={(e) => {
            e.preventDefault()
            handleAddStaff()
          }}
        >
          <CRow className="g-3">
            <CCol className="d-flex justify-content-start">
              <CButton color="primary" onClick={() => setVisible(!visible)}>
                Add new member
              </CButton>
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
                  <CCol className="mb-3" md={6}>
                    <CFormInput
                      type="text"
                      placeholder="Name"
                      value={newStaff?.name || ''}
                      onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    />
                  </CCol>
                  <CCol className="mb-3" md={6}>
                    <CFormInput
                      type="text"
                      placeholder="Last Name"
                      value={newStaff?.lastname || ''}
                      onChange={(e) => setNewStaff({ ...newStaff, lastname: e.target.value })}
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol className="mb-3" md={6}>
                    <CFormInput
                      type="text"
                      placeholder="Email"
                      value={newStaff?.email || ''}
                      onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                    />
                  </CCol>
                  <CCol className="mb-3" md={6}>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      value={newStaff?.password || ''}
                      onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol className="mb-3" md={6}>
                    <CFormInput
                      type="date"
                      placeholder="Date of Birth"
                      value={newStaff?.fechanac || ''}
                      onChange={(e) => setNewStaff({ ...newStaff, fechanac: e.target.value })}
                    />
                    <small className="text-muted">Please select the date of birth.</small>
                  </CCol>
                  <CCol className="mb-3" md={6}>
                    <CFormInput
                      type="date"
                      placeholder="Date (Start Job)"
                      value={newStaff?.registerdate || ''}
                      onChange={(e) => setNewStaff({ ...newStaff, registerdate: e.target.value })}
                    />
                    <small className="text-muted">Please select the Day of Register.</small>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol className="mb-3" md={6}>
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
                        <option key={role.id_role} value={role.id_role}>
                          {role.name_role}
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
                <CButton color="primary" onClick={handleAddStaff}>
                  Add Member
                </CButton>
              </CModalFooter>
            </CModal>
          </CRow>
        </CForm>

        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>
                Name
                <CIcon icon={cilTag} customClassName="nav-icon icon-small" />
              </CTableHeaderCell>
              <CTableHeaderCell>
                Last Name
                <CIcon icon={cilTags} customClassName="nav-icon icon-small" />
              </CTableHeaderCell>
              <CTableHeaderCell>
                Email
                <CIcon icon={cilAt} customClassName="nav-icon icon-small" />
              </CTableHeaderCell>
              <CTableHeaderCell>
                Register Date
                <CIcon icon={cilClock} customClassName="nav-icon icon-small" />
              </CTableHeaderCell>
              <CTableHeaderCell>
                Role
                <CIcon icon={cilContact} customClassName="nav-icon icon-small" />
              </CTableHeaderCell>
              <CTableHeaderCell>
                Actions
                <CIcon icon={cilColorBorder} customClassName="nav-icon icon-small" />
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {staff.map((staffMember) => (
              <CTableRow key={staffMember?.id_user || ''}>
                <CTableDataCell>{staffMember?.name || ''}</CTableDataCell>
                <CTableDataCell>{staffMember?.lastname || ''}</CTableDataCell>
                <CTableDataCell>{staffMember?.email || ''}</CTableDataCell>
                <CTableDataCell>{staffMember?.registerdate || ''}</CTableDataCell>
                <CTableDataCell>{getRoleName(staffMember?.role || '')}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="info"
                    onClick={() => {
                      setCurrentStaff(staffMember)
                      setVisibleEdit(!visibleEdit)
                    }}
                    variant="outline"
                    size="sm"
                    className="me-2 mb-2"
                  >
                    Edit
                  </CButton>
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
                        <CCol className="mb-3" md={6}>
                          <CFormInput
                            type="text"
                            placeholder="Name"
                            value={currentStaff?.name || ''}
                            onChange={(e) =>
                              setCurrentStaff({ ...currentStaff, name: e.target.value })
                            }
                          />
                        </CCol>
                        <CCol className="mb-3" md={6}>
                          <CFormInput
                            type="text"
                            placeholder="Last Name"
                            value={currentStaff?.lastname || ''}
                            onChange={(e) =>
                              setCurrentStaff({ ...currentStaff, lastname: e.target.value })
                            }
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol className="mb-3" md={6}>
                          <CFormInput
                            type="text"
                            placeholder="Email"
                            value={currentStaff?.email || ''}
                            onChange={(e) =>
                              setCurrentStaff({ ...currentStaff, email: e.target.value })
                            }
                          />
                        </CCol>
                        <CCol className="mb-3" md={6}>
                          <CFormInput
                            type="password"
                            placeholder="Password"
                            value={currentStaff?.password || ''}
                            onChange={(e) =>
                              setCurrentStaff({ ...currentStaff, password: e.target.value })
                            }
                          />
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className="mb-3" md={6}>
                          <CFormInput
                            type="date"
                            placeholder="Date of Birth"
                            value={currentStaff?.fechanac || ''}
                            onChange={(e) =>
                              setCurrentStaff({ ...currentStaff, fechanac: e.target.value })
                            }
                          />
                          <small className="text-muted">Please select the date of birth.</small>
                        </CCol>
                        <CCol className="mb-3" md={6}>
                          <CFormInput
                            type="date"
                            placeholder="Date (Start Job)"
                            value={currentStaff?.registerdate || ''}
                            onChange={(e) =>
                              setCurrentStaff({ ...currentStaff, registerdate: e.target.value })
                            }
                          />
                          <small className="text-muted">Please select the Day of Register.</small>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol className="mb-3" md={6}>
                          <CFormInput
                            type="text"
                            placeholder="Phone"
                            value={currentStaff?.phone || ''}
                            onChange={(e) =>
                              setCurrentStaff({ ...currentStaff, phone: e.target.value })
                            }
                          />
                        </CCol>
                        <CCol md={6}>
                          <CFormSelect
                            aria-label="Select Role"
                            value={currentStaff?.role || ''}
                            onChange={(e) =>
                              setCurrentStaff({ ...currentStaff, role: e.target.value })
                            }
                          >
                            <option>Select a Role</option>
                            {roles.map((role) => (
                              <option key={role.id_role} value={role.id_role}>
                                {role.name_role}
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
                      <CButton color="primary" onClick={handleEditStaff}>
                        Save Edit
                      </CButton>
                    </CModalFooter>
                  </CModal>
                  <CButton
                    color="danger"
                    onClick={() => {
                      setCurrentStaff(staffMember)
                      setVisibleDelete(!visibleDelete)
                    }}
                    variant="outline"
                    size="sm"
                    className="me-2 mb-2"
                  >
                    Delete
                  </CButton>
                  <CModal
                    backdrop="static"
                    visible={visibleDelete}
                    onClose={() => setVisibleDelete(false)}
                    aria-labelledby="Modal Info"
                  >
                    <CModalHeader>
                      <CModalTitle id="Create Users">Do you want to delete?</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CRow className="mb-3">
                        <label className="fw-bold mb-2">
                          Please write "confirm" if you want to delete this membership
                        </label>
                        <CCol className="mb-3" md={12}>
                          <CForm>
                            <CFormInput
                              type="text"
                              id="Delete"
                              value={deleteConfirmation}
                              onChange={(e) => {
                                setDeleteConfirmation(e.target.value)
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
                      <CButton color="primary" onClick={handleDeleteStaff}>
                        Delete
                      </CButton>
                    </CModalFooter>
                  </CModal>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default staff
