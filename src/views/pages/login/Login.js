import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CSpinner
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { helpFetch } from '../../../helpers/helpFetch';

const Login = () => {
  const API = helpFetch();
  const [visibleRecoverPasswordModal, setVisibleRecoverPasswordModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else if (!token) {
      navigate('/')
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    if (!username || !password) {
      setErrorMessage('Por favor, ingresa tu nombre de usuario y contraseña.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await API.get('login', { email: username, password });

      if (!response.err) {
        localStorage.setItem('token', response.token);
        console.log('Login successful:', response.token);
        navigate('/dashboard');
      } else {
        setErrorMessage(response.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
      console.error('Error en handleLogin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    if (!recoverEmail) {
      setErrorMessage('Por favor, ingresa tu correo electrónico.');
      return;
    }

    try {
      const response = await API.post('recover', { email: recoverEmail });
      setErrorMessage(response.message || 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.');
    } catch (error) {
      setErrorMessage('Ocurrió un error al enviar el correo electrónico.');
      console.error('Error en handleRecoverPassword:', error);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center login_background">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup className="g-0 p-0">
              <CCard className="p-4" style={{ backgroundColor: '#ce4242' }}>
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1 className="text-white">Login</h1>
                    <p className="text-white">Inicia sesión en tu cuenta</p>
                    {errorMessage && <p className="text-warning">{errorMessage}</p>}
                    <CInputGroup className="text-white mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Correo electrónico"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="text-white mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="text-white px-4"
                          shape="rounded-pill"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? <CSpinner size="sm" /> : 'Iniciar sesión'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          color="link"
                          className="text-white px-0"
                          onClick={() => setVisibleRecoverPasswordModal(!visibleRecoverPasswordModal)}
                        >
                          ¿Olvidaste tu contraseña?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5 login_custom">
                <CCardBody className="text-center">
                  <div>
                    <h2>Regístrate</h2>
                    <p>¿Qué estás esperando para empezar a usar nuestra plataforma?</p>
                    <Link to="/register">
                      <CButton
                        style={{ backgroundColor: '#942727' }}
                        className="text-white mt-3"
                        tabIndex={-1}
                        shape="rounded-pill"
                      >
                        ¡Regístrate ahora!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
        <CModal
          backdrop="static"
          visible={visibleRecoverPasswordModal}
          onClose={() => setVisibleRecoverPasswordModal(false)}
          aria-labelledby="Modal Info"
        >
          <CModalHeader>
            <CModalTitle id="Create Users">¿Olvidaste tu contraseña?</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow className="mb-3">
              <CCol md={12} className="mb-3">
                <label className="fw-bold">Ingresa tu correo electrónico</label>
                <CFormInput
                  type="email"
                  placeholder="Correo electrónico"
                  value={recoverEmail}
                  onChange={(e) => setRecoverEmail(e.target.value)}
                />
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleRecoverPasswordModal(false)}>
              Cerrar
            </CButton>
            <CButton color="primary" onClick={handleRecoverPassword}>Recuperar contraseña</CButton>
          </CModalFooter>
        </CModal>
      </CContainer>
    </div>
  );
};

export default Login; 
