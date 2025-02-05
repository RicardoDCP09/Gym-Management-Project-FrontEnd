import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { helpFetch } from '../../../helpers/helpFetch';
import {
    CContainer,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CForm,
    CFormInput,
    CButton,
    CAlert,
    CInputGroup,
    CInputGroupText,
} from '@coreui/react';
import { cilBan, cilCheckCircle, cilWarning } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await helpFetch().post(`/resetpassword/${token}`, { newPassword });

            if (!response.err) {
                setMessage('Contraseña actualizada correctamente.');
            } else {
                setError(response.message || 'Error al actualizar la contraseña.');
            }
        } catch (error) {
            setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <CCard>
                            <CCardHeader>
                                <h3>Restablecer Contraseña</h3>
                            </CCardHeader>
                            <CCardBody>
                                {message && <CAlert color="success">{message}</CAlert>}
                                {error && <CAlert color="danger"><CIcon icon={cilWarning} className="me-2" />{error}</CAlert>}
                                <CForm onSubmit={handleSubmit}>
                                    <h6>Ingresa tu nueva contraseña</h6>
                                    <CInputGroup className="mb-3">
                                        <CFormInput
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Nueva contraseña"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                        <CInputGroupText
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <CIcon icon={showPassword ? cilCheckCircle : cilBan} />
                                        </CInputGroupText>
                                    </CInputGroup>
                                    <CButton type="submit" color="primary">
                                        Restablecer Contraseña
                                    </CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default ResetPassword;