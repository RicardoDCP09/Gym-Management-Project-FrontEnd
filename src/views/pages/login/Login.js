import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { helpFetch } from '../../../helpers/helpFetch'

const Login = () => {
  const API = helpFetch()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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

    try {
      const usersRes = await API.get('users');

      if (!usersRes.err) {
        const user = usersRes.find(user => user.email === username && user.password === password);

        if (user) {
          console.log('Login successful:', user);
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/dashboard');
        } else {
          setErrorMessage('Invalid username or password');
        }
      } else {
        setErrorMessage('Error fetching user data');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred.');
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4" style={{ backgroundColor: '#ce4242' }}>
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1 className="text-white">Login</h1>
                    <p className="text-white">Sign In to your account</p>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    <CInputGroup className=" text-white mb-3">
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
                        onChange={e => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color='primary'
                          className="text-white px-4"
                          shape="rounded-pill"
                          type='submit'
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="text-white px-0">
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
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
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
      </CContainer>
    </div>
  )
}

export default Login
