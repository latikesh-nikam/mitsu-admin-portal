import React from 'react';
import CardComp from '../card';
import styles from "./column-grid.module.scss";
import { IColumnGridProps } from './column-grid.types';

const ColumnGrid: React.FC<IColumnGridProps> = ({ gridData, handleCardClick }) => {
  return (
    <div className={styles.gridContainer}>
      {
        gridData?.map((val: any, index: number) => {
          return (
            <div className={styles.grids} key={index}>
              <CardComp
                title={val.title}
                subtitle={val.subtitle}
                handleCardClick={e => handleCardClick(e, index + 1)}
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default ColumnGrid