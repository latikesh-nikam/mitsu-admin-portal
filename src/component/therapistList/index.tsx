import React from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { cilPeople } from "@coreui/icons";
import Delete from "@mui/icons-material/Delete";
import Tooltip from '@mui/material/Tooltip';
import { IListProps } from "./therapistList.types";
import logo from "../../assets/images/avatars/2.jpg";

const TherapistList: React.FC<IListProps> = ({ patientList, handleClick }) => {

  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <div className="body flex-grow-1 px-3">

        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell className="text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell className="text-left">Name</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Phone No.</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Education</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>

            {
              patientList?.map((item: any, index: number) => (
                <CTableRow v-for="item in tableItems" key={index} color="light">
                  <CTableDataCell className="text-center">
                    <CAvatar size="sm" src={logo} />
                  </CTableDataCell>
                  <CTableDataCell className="text-left">
                    <div>{item.name}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item.email}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item.mobile}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item.education}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <Tooltip title="Delete">
                      <div onClick={(e:any) => {
                        e.stopPropagation()
                        handleClick(item)
                      }}>
                        <Delete color="action" />
                      </div>
                    </Tooltip>
                  </CTableDataCell>
                </CTableRow>
              ))
            }

          </CTableBody>
        </CTable>

        {/* <CPagination size="sm" aria-label="Page navigation example" className={style.paginationWrapper}>
          <CPaginationItem>Previous</CPaginationItem>
          <CPaginationItem>1</CPaginationItem>
          <CPaginationItem>2</CPaginationItem>
          <CPaginationItem>3</CPaginationItem>
          <CPaginationItem>Next</CPaginationItem>
        </CPagination> */}
      </div>
    </div>
  )
};

export default TherapistList;
