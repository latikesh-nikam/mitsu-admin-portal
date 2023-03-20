/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { BaseSyntheticEvent, useMemo, useState } from 'react'
import { omit } from 'lodash';

const useFormValidation = () => {

  const specialCharRegex = /^[A-Za-z0-9 ]+$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const [values, setValues] = useState({});
  const [showError, setShowError] = useState<any>({});

  const handleFormChange = (event: BaseSyntheticEvent) => {
    const name = event.target.name;
    const val = event.target.value;
    setValues({
      ...values,
      [name]: val
    })

    switch (name) {
      case "username":
        if (val.length === 0) {
          setShowError({
            ...showError,
            username: "Enter Name"
          })
        }
        else if (!new RegExp(specialCharRegex).test(val)) {
          setShowError({
            ...showError,
            username: "Name must not have special characters"
          })
        }
        else {
          let newObj = omit(showError, "username");
          setShowError(newObj);
        }
        break;

      case "password":
        // if (!new RegExp(passwordRegex).test(val)) {
        //   setShowError({
        //     ...showError,
        //     password: "Password must be 8 characters long,  one number, one special character and one uppercase letter."
        //   })
        // }
        if (val.length < 4) {
          setShowError({
            ...showError,
            password: "Password must be atleast 4 characters long."
          })
        }
        else {
          let newObj = omit(showError, "password");
          setShowError(newObj);
        }
        break;

      case "email":
        if (!new RegExp(emailRegex).test(val)) {
          setShowError(
            {
              ...showError,
              email: "Enter correct email format"
            })
        }
        else {
          let newObj = omit(showError, "email");
          setShowError(newObj);
        }
        break;

      default: {
        break;
      }
    }
  }

  useMemo(() => handleFormChange, [values, showError])

  const handleFormSubmit = (event: BaseSyntheticEvent) => {
    event?.preventDefault();
    if (Object.keys(values).length === 0) {
      setShowError({
        ...showError,
        password: "Password Required",
        email: "Email Required",
        username: "Name Required",
      })
    }
  }

  return {
    handleFormChange,
    showError,
    handleFormSubmit,
  }
}

export default useFormValidation