import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import Tooltip from '@mui/material/Tooltip';
import { BaseSyntheticEvent } from 'react';

const QuestionTable = (props: any) => {
  const { questionSet, handlePreviewIcon, handleDeleteAction, handleEditIcon } = props;

  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <div className="body flex-grow-1 px-3">
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell className="text-center">Sr No</CTableHeaderCell>
              <CTableHeaderCell className="text-left">Title</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Category</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {questionSet?.map((item: any, index: number) => (
              <CTableRow v-for="item in tableItems" key={index} color="light">
                <CTableDataCell className="text-center">
                  <div>{item.index}</div>
                </CTableDataCell>
                <CTableDataCell className="text-left" style={{ width: "30rem" }}>
                  <div>{item.title}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.category}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <Tooltip title="Preview">
                    <Visibility className="m-1" color="action" onClick={(e: BaseSyntheticEvent) => {
                      e.stopPropagation()
                      handlePreviewIcon(item)
                    }} />
                  </Tooltip>
                  <Tooltip title="Edit">
                    <Edit color="action" onClick={(e: BaseSyntheticEvent) => {
                      e.stopPropagation()
                      handleEditIcon(item)
                    }} />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Delete color="action" onClick={(e: BaseSyntheticEvent) => {
                      e.stopPropagation()
                      handleDeleteAction(item)
                    }} />
                  </Tooltip>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </div>
  )
};

export default QuestionTable;
