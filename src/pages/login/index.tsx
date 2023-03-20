import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import Input from '../../component/input';
import Label from '../../component/label';
import { AppContext } from '../../context/AppContext';
import http, { setStore } from '../../services/module.service';
import { getFormData } from '../../utils/formData';
import useFormValidation from '../../utils/useFormValidation';
import styles from "./login.module.scss";
import Spinner from "../../component/loading/spinner/index";

const Login: React.FC = () => {
  const { appDispatch, navigate } = useContext(AppContext);
  const { handleFormChange, showError, handleFormSubmit } = useFormValidation();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleInputChange = (e: React.FocusEvent<HTMLInputElement>) => {
    handleFormChange(e);
  }

  return (
    <section className={styles.login}>
      <div className={styles.sectionLeft}>
        <div className={styles.loginContainer}>
          <h1 className={styles.heading1}>MITSU</h1>
          <h1 className={styles.heading}>Sign into Admin Portal</h1>
          <form className={styles.formElements} onSubmit={handleSubmit}>
            <div className={styles.fieldWrapper}>

              <Label name='Email' htmlfor='email' />
              <Input value={email} name='email' type="text" onChange={e => setEmail(e.target.value)} onBlur={handleInputChange} placeholder="Enter your email" />

              <span className={[styles.error, !showError.email && styles.errorVisibility].join(" ")}>{showError.email || <>&nbsp;</>}</span>

            </div>
            <div className={styles.fieldWrapper}>

              <Label name="Password" htmlfor='password' />
              <Input name="password" value={password} type="password" onChange={e => setPassword(e.target.value)} onBlur={handleInputChange} placeholder="Enter your username" />

              <span className={[styles.error, !showError.password && styles.errorVisibility].join(" ")}>{showError.password || <>&nbsp;</>}</span>

            </div>
            <button className={styles.submitBtn} type="submit" disabled={((!email || !password || !(Object.values(showError).length === 0)))}>
              {
                loading ? <Spinner /> : ""
              }
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className={styles.sectionRight}>
        <img src="https://mitsu.care/wp-content/uploads/2022/10/Symbol_Blue_PNG.png" alt="mitsuLogo" className={styles.imgLogo} />
      </div>
    </section>
  )
}

export default Login
