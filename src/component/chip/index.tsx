import React from 'react'
import { IChipProps } from './chip.types';
import styles from "./chip.module.scss";

const Chip: React.FC<IChipProps> = ({ day }) => {
  return (
    <div className={styles.chip}>
      <span>{day}</span>
    </div>
  )
}

export default Chip