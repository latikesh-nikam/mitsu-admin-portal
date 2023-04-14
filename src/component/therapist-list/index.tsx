import React from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from '@coreui/react'
import Delete from "@mui/icons-material/Delete";
import Tooltip from '@mui/material/Tooltip';
import { IListProps } from "./therapist.types";

const TherapistList: React.FC<IListProps> = ({ therapistList, handleClick }) => {
  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <div className="body flex-grow-1 px-3">

        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="dark">
            <CTableRow>
              {/* {
                columns?.map((c: Record<string | number, string | number>) => {
                  return <CTableHeaderCell key={c.id} className="text-center">{c.displayName}</CTableHeaderCell>
                })
              } */}
            </CTableRow>
          </CTableHead>
          <CTableBody>

            {
              therapistList?.map((item: any, index: number) => (
                <CTableRow v-for="item in tableItems" key={index} color="light">
                  <CTableDataCell className="text-center">
                    <div>{item.id}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-left" style={{ width: "30rem" }}>
                    <div>{item.name}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{item.username}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <Tooltip title="Delete">
                      <div onClick={() => handleClick(item)}>
                        <Delete color="action" />
                      </div>
                    </Tooltip>
                  </CTableDataCell>
                </CTableRow>
              ))
            }

            {/* {
              rowData?.map((s: Record<string, string>) => {
                return (
                  <CTableHeaderCell key={s.id}>
                    {
                      columns?.map((c: Record<string, string>, index: number) => {
                        return (
                          <CTableRow v-for="item in tableItems" key={index} color="light">
                            <CTableDataCell className="text-center">
                              <div>{s[c.id]}</div>
                            </CTableDataCell>
                          </CTableRow>
                        )
                      })
                    }
                  </CTableHeaderCell>
                )
              })
            } */}

          </CTableBody>
        </CTable>
      </div>
    </div >
  )
};

export default TherapistList;
