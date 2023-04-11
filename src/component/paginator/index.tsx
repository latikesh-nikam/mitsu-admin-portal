import React from 'react';
import {
  CPagination,
  CPaginationItem,
} from '@coreui/react';
import styles from "./paginator.module.scss";

const Paginator: React.FC = () => {
  return (
    <CPagination size="sm" aria-label="Page navigation example" className={styles.paginationWrapper}>
      <CPaginationItem>Previous</CPaginationItem>
      <CPaginationItem>1</CPaginationItem>
      <CPaginationItem>2</CPaginationItem>
      <CPaginationItem>3</CPaginationItem>
      <CPaginationItem>Next</CPaginationItem>
    </CPagination>
  )
}

export default Paginator