import React from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import Tooltip from '@mui/material/Tooltip';
import Visibility from "@mui/icons-material/Visibility";
import { IModuleListProps } from './module-list.types';
import DOMPurify from 'dompurify';

const ModuleList: React.FC<IModuleListProps> = (props: any) => {
  const { modulesList, setPreview } = props;
  return (
    <div className="wrapper d-flex flex-column">
      <div className="body flex-grow-1 px-3">

        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell className="text-center" >Name</CTableHeaderCell>
              <CTableHeaderCell className="text-center" >Description</CTableHeaderCell>
              <CTableHeaderCell className="text-center" >Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {modulesList ? (
              <>
                {
                  modulesList?.map((item: any, index: number) => (
                    <CTableRow v-for="item in tableItems" key={index} color="light">
                      <CTableDataCell className="text-center">
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${item?.name}`) }}></div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${item?.description}`) }}></div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <Tooltip title="Preview">
                          <div onClick={(e) => {
                            e.stopPropagation()
                            setPreview(true)
                          }}>
                            <Visibility color="action" />
                          </div>
                        </Tooltip>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                }
              </>
            ) : (
              <>
                <CTableRow>
                  <CTableDataCell>No records found</CTableDataCell>
                </CTableRow>
              </>
            )}
          </CTableBody>
        </CTable>
      </div>
    </div>
  )
}

export default ModuleList