import CIcon from '@coreui/icons-react'
import {
  cilClock,
  cilTag,
  cilColorBorder,
  cilCash,
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
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,

} from '@coreui/react';
import { useState, useEffect } from 'react'
import { helpFetch } from '../../../helpers/helpFetch.js';
const Membership = () => {
  const API = helpFetch('http://localhost:5000/');
  const [memberships, setMemberships] = useState([]);
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [currentMembership, setCurrentMembership] = useState(null);
  const [newMembership, setNewMembership] = useState({ name: '', duration: '', price: '' });
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  useEffect(() => {
    const fetchMemberships = async () => {
      const data = await API.get('type_memberships');
      setMemberships(data);
    };
    fetchMemberships();
  }, [API]);


  const handleAddMembership = async () => {
    const addedMembership = await API.post('type_memberships', newMembership);
    setMemberships([...memberships, addedMembership]);
    setNewMembership({ name: '', duration: '', price: '' });
  };

  const handleEditMembership = async () => {
    if (!currentMembership || !currentMembership.id) {
      console.error("Current membership is not set or does not have an ID.");
      return;
    }

    console.log("Editing membership:", currentMembership);

    try {
      const updatedMembership = await API.put(`type_memberships/${currentMembership.id}`, currentMembership);
      setMemberships(memberships.map((membership) => membership.id === currentMembership.id ? updatedMembership : membership));
      setVisibleEdit(false);
    } catch (error) {
      console.error("Error updating membership:", error);
    }
  };


  const handleDeleteMembership = async () => {
    if (deleteConfirmation === 'confirm') {
      const membershipId = currentMembership.id;
      try {
        const deletedMembership = await API.del('type_memberships', membershipId);
        setMemberships(memberships.filter((membership) => membership.id !== membershipId));
        setVisibleDelete(false);
      } catch (error) {
        console.error("Error deleting membership:", error);
      }
    }
  };

  return (
    < CCard className="mb-4" >
      <CCardHeader>
        <h4 className="mb-0">Membership Management</h4>
      </CCardHeader>
      <CCardBody>
        <CForm className="mb-4" onSubmit={(e) => { e.preventDefault(); handleAddMembership(); }}>
          <CRow className="g-3">
            <CCol md={3}>
              <CFormInput
                type="text"
                placeholder="Name"
                value={newMembership.name}
                onChange={(e) => setNewMembership({ ...newMembership, name: e.target.value })}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="number"
                placeholder="Duration(days)"
                value={newMembership.duration}

                onChange={(e) => setNewMembership({ ...newMembership, duration: e.target.value })}
              />
            </CCol>
            <CCol md={3}>
              <CFormInput
                type="number"
                placeholder="Price"
                value={newMembership.price}
                onChange={(e) => setNewMembership({ ...newMembership, price: e.target.value })}
              />
            </CCol>
            <CCol md={3}>
              <CButton color="primary" type='submit'>
                Add
              </CButton>
            </CCol>
          </CRow>
        </CForm>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Name
                <CIcon icon={cilTag} customClassName="nav-icon icon-small" />
              </CTableHeaderCell>
              <CTableHeaderCell>Duration (days)
                <CIcon icon={cilClock} customClassName="nav-icon icon-small" />
              </CTableHeaderCell>
              <CTableHeaderCell>Price
                <CIcon icon={cilCash} customClassName="nav-icon icon-small" />
              </CTableHeaderCell>
              <CTableHeaderCell>Actions
                <CIcon icon={cilColorBorder} customClassName="nav-icon icon-small" />
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {memberships.map((membership) => (<CTableRow key={membership?.id || ''}>
              <CTableDataCell>{membership?.name || ''}</CTableDataCell>
              <CTableDataCell>{membership?.duration || ''}</CTableDataCell>
              <CTableDataCell>${membership?.price || ''}</CTableDataCell>

              <CTableDataCell>
                <CButton color="info" onClick={() => { setCurrentMembership(membership); setVisibleEdit(true); }} variant='outline' size="sm" className="me-2">Edit</CButton>

                <CModal
                  backdrop="static"
                  visible={visibleEdit && currentMembership !== null}
                  onClose={() => setVisibleEdit(false)}
                  aria-labelledby="Modal Info"
                >
                  <CModalHeader>
                    <CModalTitle id="Edit Membership">Edit Membership</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    <CRow className="mb-3">
                      <CCol className='mb-3' md={6}>
                        <CFormInput
                          type="text"
                          placeholder="Name"
                          value={currentMembership?.name || ''}
                          onChange={(e) => setCurrentMembership({ ...currentMembership, name: e.target.value })}
                        />
                      </CCol>
                      <CCol className='mb-3' md={6}>
                        <CFormInput
                          type="number"
                          placeholder="Duration"
                          value={currentMembership?.duration || ''}
                          onChange={(e) => setCurrentMembership({ ...currentMembership, duration: e.target.value })}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol className='mb-3' md={6}>
                        <CFormInput
                          type="number"
                          placeholder="Cost"
                          value={currentMembership?.price || ''}
                          onChange={(e) => setCurrentMembership({ ...currentMembership, price: e.target.value })}
                        />
                      </CCol>
                    </CRow>
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
                      Close
                    </CButton>
                    <CButton color="primary" onClick={handleEditMembership}>Save Edit</CButton>
                  </CModalFooter>

                </CModal>
                <CButton color="danger" onClick={() => { setCurrentMembership(membership); setVisibleDelete(true); }} variant='outline' size="sm">Delete</CButton> <CModal
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
                              console.log(e.target.value); // Verifica el valor aquí
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
                    <CButton color="primary" onClick={handleDeleteMembership}>Delete</CButton>
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
export default Membership
