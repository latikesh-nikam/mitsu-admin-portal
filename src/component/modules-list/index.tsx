import React, { useState, useEffect } from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import Tooltip from '@mui/material/Tooltip';
import { IModuleListProps } from './module-list.types';
import DOMPurify from 'dompurify';
import { SortableContainer, SortableHandle, SortableElement, arrayMove } from 'react-sortable-hoc';
import { Delete, Visibility } from '@mui/icons-material';

interface ITableBodySortableProps {
  onSortEnd: (e: any) => void
  useDragHandle: boolean
};

const TableBodySortable: any = SortableContainer(({ children }: any) => (
  <CTableBody >
    {children}
  </CTableBody >
))

const ModuleList: React.FC<IModuleListProps> = (props: any) => {
  const { modulesList, setPreview, previewData, setDeletedItem, setDelete } = props;
  const [listItems, setListItems] = useState<any>([])

  const DragHandle = SortableHandle(() => (
    <span style={{ ...{ cursor: 'move' } }}> {'::::'} </span>)
  )

  useEffect(() => {
    if (modulesList) {
      setListItems(modulesList)
    }
  }, [])

  const Row: any = SortableElement(({ data, ...other }: any) => {
    return (
      <CTableRow v-for="item in tableItems" color="light" {...other}>
        <CTableDataCell className="text-left" ><DragHandle /></CTableDataCell>
        <CTableDataCell className="text-left">
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${data?.name}`) }}></div>
        </CTableDataCell>
        <CTableDataCell className="text-left">
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${data?.description}`) }}></div>
        </CTableDataCell>
        <CTableDataCell className="text-left" style={{ display: 'flex', flexDirection: 'row'}}>
          <Tooltip title="Preview">
            <div onClick={(e) => {
              e.stopPropagation();
              setPreview(true);
              previewData(data);
            }}>
              <Visibility color="action" />
            </div>
          </Tooltip>
          <Tooltip title="Delete">
            <div onClick={(e) => {
              e.stopPropagation();
              setDelete(true) 
              setDeletedItem(data)
            }}>
              <Delete color="action" />
            </div>
          </Tooltip>
        </CTableDataCell>
      </CTableRow >
    )
  })

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setListItems(arrayMove(listItems, oldIndex, newIndex));
  };

  return (
    <div className="wrapper d-flex flex-column overflow-y-scroll">
      <div className="body flex-grow-1 px-3">

        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell className="text-center">#</CTableHeaderCell>
              <CTableHeaderCell className="text-left">Name</CTableHeaderCell>
              <CTableHeaderCell className="text-left">Description</CTableHeaderCell>
              <CTableHeaderCell className="text-left">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <TableBodySortable onSortEnd={onSortEnd} useDragHandle>
            {modulesList?.map((row: any, index: any) => {
              return (
                <Row
                  index={index}
                  key={row.id}
                  data={row}
                />
              )
            })}
          </TableBodySortable>
        </CTable>
      </div>
    </div>
  )
}

export default ModuleList