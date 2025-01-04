import CIcon from '@coreui/icons-react'
import {
    cilClock,
    cilInbox,
    cilCheckAlt,
    cilTag,
    cilColorBorder,
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
    CFormSelect,
    CTableBody,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle,
} from '@coreui/react';
import { useState, useEffect } from 'react'
import { helpFetch } from '../../../helpers/helpFetch.js';
const Inventory = () => {

    const API = helpFetch()
    const [equipments, setEquipments] = useState([])
    const [statuses, setStatuses] = useState([]);
    const [currentInventory, setCurrentInventory] = useState(null)
    const [visible, setVisible] = useState(false)
    const [visibleEdit, setVisibleEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [newItem, setNewItem] = useState({ equipment_name: '', quantity: '', status: '', day_use: '' })
    const [deleteConfirmation, setDeleteConfirmation] = useState('')


    useEffect(() => {
        const fetchInventory = async () => {
            const data = await API.get('inventory')
            setEquipments(data);
        }
        fetchInventory()
    }, [])


    useEffect(() => {
        const fetchStatuses = async () => {
            const data = await API.get('status_inventory')
            setStatuses(data)
        }
        fetchStatuses()
    }, [])

    const handleAddInventory = async () => {
        const addedInventory = await API.post('inventory', newItem);
        setEquipments([...equipments, addedInventory]);
        setNewItem({ equipment_name: '', quantity: '', status: '', day_use: '' });
        setVisible(false)
    };

    const handleEditInventory = async () => {
        if (!currentInventory || !currentInventory.id) {
            console.error("Current item is not set or does not have an ID.");
            return;
        }

        try {
            const updatedInventory = await API.put(
                'inventory',
                currentInventory,
                currentInventory.id);
            setEquipments((prevEquipments) =>
                prevEquipments.map((equipment) =>
                    equipment.id === currentInventory.id
                        ? { ...equipment, ...updatedInventory } : equipment));
            setVisibleEdit(false)
        } catch (error) {
            console.error(error);
        }
    };


    const handleDeleteInventory = async () => {
        if (deleteConfirmation === 'confirm') {
            const inventoryId = currentInventory.id;
            try {
                const deletedInventory = await API.del('inventory', inventoryId);
                setEquipments(equipments.filter((equipment) => equipment.id !== inventoryId));
                setVisibleDelete(false);
            } catch (error) {
                console.error("Error deleting Item:", error);
            }
        }
    };
    const getStatusName = (statusId) => {
        const status = statuses.find(s => s.id === statusId)
        return status ? status.status : 'Unknown'
    }
    return (

        <CCard className="mb-4">
            <CCardHeader>
                <h4 className="mb-0">Inventory Management</h4>
            </CCardHeader>
            <CCardBody>
                <CForm className="mb-4" onSubmit={(e) => { e.preventDefault(); handleAddInventory(); }}>
                    <CRow className="g-3">
                        <CCol className="d-flex justify-content-start">
                            <CButton className='me-2' color="primary" onClick={() => setVisible(!visible)}>Add Item</CButton>
                        </CCol>
                        <CModal
                            backdrop="static"
                            visible={visible}
                            onClose={() => setVisible(false)}
                            aria-labelledby="Modal create Items"
                        >
                            <CModalHeader>
                                <CModalTitle id="Create Item">New Item</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <CRow className="mb-3">
                                    <CCol md={6}>
                                        <CFormInput
                                            type="text"
                                            placeholder="Name"
                                            value={newItem?.equipment_name || ''}
                                            onChange={(e) => setNewItem({ ...newItem, equipment_name: e.target.value })}
                                        />
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="number"
                                            placeholder="Quantity"
                                            value={newItem?.quantity || ''}
                                            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className="mb-3">
                                    <CCol md={6}>
                                        <CFormSelect
                                            aria-label="Select status"
                                            value={newItem.status}
                                            onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                                        >
                                            <option value="">Select a Status</option>
                                            {statuses.map((status) => (
                                                <option key={status.id} value={status.id}>
                                                    {status.status}
                                                </option>
                                            ))}
                                        </CFormSelect>
                                    </CCol>
                                    <CCol md={6}>
                                        <CFormInput
                                            type="date"
                                            placeholder="Date Use"
                                            value={newItem.day_use}
                                            onChange={(e) => setNewItem({ ...newItem, day_use: e.target.value })}
                                        />
                                    </CCol>
                                </CRow>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Close
                                </CButton>
                                <CButton color="primary" onClick={() => { handleAddInventory() }}>Add Item</CButton>
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
                            <CTableHeaderCell>Quantity
                                <CIcon icon={cilInbox} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Status
                                <CIcon icon={cilCheckAlt} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>DayUse
                                <CIcon icon={cilClock} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                            <CTableHeaderCell>Actions
                                <CIcon icon={cilColorBorder} customClassName="nav-icon icon-small" />
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {equipments.map((equipment) => (
                            <CTableRow key={equipment?.id || ''}>
                                <CTableDataCell>{equipment?.equipment_name || ''}</CTableDataCell>
                                <CTableDataCell>{equipment?.quantity || ''}</CTableDataCell>
                                <CTableDataCell>{getStatusName(equipment?.status) || ''}</CTableDataCell>
                                <CTableDataCell>{equipment?.day_use || ''}</CTableDataCell>

                                <CTableDataCell>
                                    <CButton color="info" onClick={() => { setCurrentInventory(equipment); setVisibleEdit(true); }} variant='outline' size="sm" className="me-2">Edit</CButton>
                                    <CModal
                                        backdrop="static"
                                        visible={visibleEdit}
                                        onClose={() => setVisibleEdit(false)}
                                        aria-labelledby="Modal Info"
                                    >
                                        <CModalHeader>
                                            <CModalTitle id="Create Users">Edit Inventory</CModalTitle>
                                        </CModalHeader>
                                        <CModalBody>
                                            <CRow className="mb-3">
                                                <CCol md={6} className="mb-3" >
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="Name"
                                                        value={currentInventory?.equipment_name || ''}
                                                        onChange={(e) => setCurrentInventory({ ...currentInventory, equipment_name: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={6} className="mb-3">
                                                    <CFormInput
                                                        type="number"
                                                        placeholder="Quantity"
                                                        value={currentInventory?.quantity || ''}
                                                        onChange={(e) => setCurrentInventory({ ...currentInventory, quantity: e.target.value })}
                                                    />
                                                </CCol>
                                                <CCol md={6} className="mb-3">
                                                    <CFormSelect
                                                        aria-label="Select status"
                                                        value={currentInventory?.status || ''}
                                                        onChange={(e) => setCurrentInventory({ ...currentInventory, status: e.target.value })}
                                                    >
                                                        <option value="">Select a Status</option>
                                                        {statuses.map((status) => (
                                                            <option key={status.id} value={status.id}>
                                                                {status.status}
                                                            </option>
                                                        ))}
                                                    </CFormSelect>

                                                </CCol>
                                                <CCol md={6} className="mb-3">
                                                    <CFormInput
                                                        type="date"
                                                        placeholder="Date Use"
                                                        value={newItem.day_use}
                                                        onChange={(e) => setNewItem({ ...newItem, day_use: e.target.value })}
                                                    />
                                                </CCol>
                                            </CRow>
                                        </CModalBody>
                                        <CModalFooter>
                                            <CButton color="secondary" onClick={() => setVisibleEdit(false)}>
                                                Close
                                            </CButton>
                                            <CButton color="primary" onClick={handleEditInventory}>Save Edit</CButton>
                                        </CModalFooter>
                                    </CModal>
                                    <CButton color="danger" onClick={() => { setCurrentInventory(equipment); setVisibleDelete(true); }} variant='outline' size="sm">Delete</CButton>
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
                                                <label className='fw-bold mb-2'>Please write "confirm" if you want to delete this Item</label>
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
                                            <CButton color="primary" onClick={handleDeleteInventory}>Delete</CButton>
                                        </CModalFooter>
                                    </CModal>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard >
    )
}
export default Inventory 
