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
  CSpinner,
  CAlert
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { helpFetch } from '../../../helpers/helpFetch';

const Login = () => {
  const API = helpFetch();
  const [visibleRecoverPasswordModal, setVisibleRecoverPasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recoverEmail, setRecoverEmail] = useState('');
  const [recoverMessage, setRecoverMessage] = useState('');
  const [recoverError, setRecoverError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    // Validar entradas
    if (!username || !password) {
      setErrorMessage('Por favor, ingresa tu nombre de usuario y contraseña.');
      setIsLoading(false);
      return;
    }

    try {
      const usersRes = await API.get('users');

      if (!usersRes.err) {
        const user = usersRes.find(user => user.email === username && user.password === password);

        if (user) {
          console.log('Login successful:', user);
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/dashboard');
        } else {
          setErrorMessage('Usuario o contraseña incorrectos.');
        }
      } else {
        setErrorMessage('Error al obtener los datos del usuario.');
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
      console.error('Error en handleLogin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverPassword = async () => {
    setRecoverError('');
    setRecoverMessage('');

    // Validar el correo electrónico
    if (!recoverEmail) {
      setRecoverError('Por favor, ingresa tu correo electrónico.');
      return;
    }

    try {
      const response = await API.post('recover-password', { email: recoverEmail });

      if (!response.err) {
        setRecoverMessage('Se ha enviado un correo electrónico con instrucciones para recuperar tu contraseña.');
        setRecoverEmail('');
      } else {
        setRecoverError(response.message || 'Error al enviar el correo de recuperación.');
      }
    } catch (error) {
      setRecoverError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
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
                    <p className="text-white">Sign In to your account</p>
                    {errorMessage && <p className="text-warning">{errorMessage}</p>}
                    <CInputGroup className="text-white mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
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
                        placeholder="Password"
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
                          {isLoading ? <CSpinner size="sm" /> : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          color="link"
                          className="text-white px-0"
                          onClick={() => setVisibleRecoverPasswordModal(!visibleRecoverPasswordModal)}
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5 login_custom">
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>¿Qué estás esperando para empezar a usar nuestra plataforma?</p>
                    <Link to="/register">
                      <CButton
                        style={{ backgroundColor: '#942727' }}
                        className="text-white mt-3"
                        tabIndex={-1}
                        shape="rounded-pill"
                      >
                        Register Now!
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
            <CModalTitle id="Create Users">Forgot Your Password?</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow className="mb-3">
              <CCol md={12} className="mb-3">
                <label className="fw-bold mb-2">Insert your Email</label>
                <CFormInput
                  type="email"
                  placeholder="Email"
                  value={recoverEmail}
                  onChange={(e) => setRecoverEmail(e.target.value)}
                />
              </CCol>
            </CRow>
            {recoverMessage && <CAlert color="success">{recoverMessage}</CAlert>}
            {recoverError && <CAlert color="danger">{recoverError}</CAlert>}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisibleRecoverPasswordModal(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={handleRecoverPassword}>
              Recover Password
            </CButton>
          </CModalFooter>
        </CModal>
      </CContainer>
    </div>
  );
};

export default Login;