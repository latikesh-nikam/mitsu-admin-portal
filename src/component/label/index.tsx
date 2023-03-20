import React from 'react';
import styles from "./label.module.scss";
import { ILabelProps } from './label.types';

const Label: React.FC<ILabelProps> = ({ name, htmlfor }) => {
  return (
    <label className={styles.label} htmlFor={htmlfor}>{name}</label>
  )
}

export default Label