import React, { useContext, useState } from 'react';
import logo from "../../assets/images/Group.png";
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons';
import { toast } from 'react-hot-toast';
import { AppContext } from '../../context/AppContext';
import http, { setStore } from '../../services/module.service';
import { getFormData } from '../../utils/formData';
import useFormValidation from '../../utils/useFormValidation';
import Spinner from "../../component/loading/spinner/index";
import styles from "./loginComponent.module.scss";

const LoginComponent: React.FC = () => {
  const { appDispatch, navigate } = useContext(AppContext);
  const { handleFormChange, showError, handleFormSubmit } = useFormValidation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [isPasswordBlur, setPasswordBlur] = useState(false);

  console.log(isPasswordBlur);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = getFormData(e);
    handleFormSubmit(e);
    setEmail("");
    setPassword("");
    try {
      setLoading(true);
      const res = await http.post("users/auth/login", formdata);
      if (res.statusCode !== 404) {
        setStore("access_token", res.access_token);
        setLoading(false);
        appDispatch({ type: "setLoginData", payload: { isLogin: true } });
        navigate("/admin");
        toast.success("Logged In!");
        return formdata;
      }
      else {
        toast.error(`${res.message}`);
        setLoading(false);
      }
    }

    catch (error: any) {
      setLoading(false);
      toast.error(`${error}`);
      throw error
    }
  }

  const handleInputEmailChange = (e: React.FocusEvent<HTMLInputElement>) => {
    // setEmail(e.target.value)
    handleFormChange(e);
  }

  const handleInputPasswordChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    handleFormChange(e);
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer className={styles.login}>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <div className='mb-3'>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          name="email"
                          value={email}
                          placeholder="Email"
                          onChange={e => setEmail(e.target.value)}
                          onBlur={handleInputEmailChange}
                          // onChange={handleInputEmailChange}
                          autoComplete="current-email"
                        />
                      </CInputGroup>

                      <span className={[styles.error, !showError.email && styles.errorVisibility].join(" ")}>{showError.email || <>&nbsp;</>}</span>
                    </div>

                    <div className='mb-4'>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          name="password"
                          value={password}
                          type="password"
                          placeholder="Password"
                          onChange={handleInputPasswordChange}
                          onBlur={e => setPasswordBlur(true)}
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      {
                        <span className={[styles.error, !showError.password && styles.errorVisibility].join(" ")}>{showError.password || <>&nbsp;</>}</span>
                      }
                    </div>

                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="d-flex justify-content-center align-items-center px-4" type="submit" disabled={((!email || !password || !(Object.values(showError).length === 0)))}>
                          {
                            loading ? <Spinner /> : ""
                          }
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="d-flex flex-column align-items-center justify-content-center">
                  <img src={logo} className={styles.logo} alt="mitsuLogo" />
                  <h1 className={styles.heading}>MITSU CARE</h1>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div >
  )
}

export default LoginComponent
