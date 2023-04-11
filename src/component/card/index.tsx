import React from 'react';
import { CCard, CCardBody, CCardLink, CCardSubtitle, CCardText, CCardTitle } from '@coreui/react';
import { ICardProps } from './card.types';
import styles from "./card.module.scss";

const CardComp: React.FC<ICardProps> = ({ title, subtitle, handleCardClick }) => {
  return (
    <div className={styles.container}>
      <CCard style={{ width: '18rem', cursor: "pointer" }} >
        <CCardBody onClick={handleCardClick}>
          <CCardTitle>{title}</CCardTitle>
          <CCardSubtitle className="mb-2 text-medium-emphasis">{subtitle}</CCardSubtitle>
          <CCardText>
            Module contains daily program activities to be assigned to a patient.
          </CCardText>
        </CCardBody>
        <div className={styles.links}>
          <CCardLink href="#">Preview</CCardLink>
          <CCardLink href="#">Delete</CCardLink>
        </div>
      </CCard>
    </div>
  )
}

export default CardComp