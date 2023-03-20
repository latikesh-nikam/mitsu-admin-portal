import React from 'react'
import { IInputProps } from './input.types';
import styles from "./input.module.scss";

const Input: React.FC<IInputProps> = ({ name, placeholder, handleChange, handleBlur, ...props }) => {
  return (
    <>
      <input className={styles.input} name={name} placeholder={placeholder} onChange={handleChange} onBlur={handleBlur} {...props} />
    </>
  )
}

export default Input