import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import style from './questionTable.module.scss';
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import Tooltip from '@mui/material/Tooltip';

const QuestionTable = (props: any) => {
  const { questionSet, handlePreviewIcon, handleDeleteAction } = props;

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
                  <div>{item.id}</div>
                </CTableDataCell>
                <CTableDataCell className="text-left" style={{ width: "30rem" }}>
                  <div>{item.title}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.category}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <Tooltip title="Preview">
                    <Visibility className="m-1" color="action" onClick={() => handlePreviewIcon(item)} />
                  </Tooltip>
                  <Tooltip title="Edit">
                    <Edit color="action" />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Delete color="action" onClick={() => handleDeleteAction(item)} />
                  </Tooltip>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <CPagination size="sm" aria-label="Page navigation example" className={style.paginationWrapper}>
          <CPaginationItem>Previous</CPaginationItem>
          <CPaginationItem>1</CPaginationItem>
          <CPaginationItem>2</CPaginationItem>
          <CPaginationItem>3</CPaginationItem>
          <CPaginationItem>Next</CPaginationItem>
        </CPagination>
      </div>
    </div>
  )
};

export default QuestionTable;
