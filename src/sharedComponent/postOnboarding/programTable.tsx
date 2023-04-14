import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import Delete from "@mui/icons-material/Delete";

const ProgramTable = (props: any) => {
    const { optionArr, handleDeleteOption } = props;

    return (
        <CTable hover responsive className='w-10'>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell scope="col">Module Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Option Score</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {optionArr?.map((option: any, index: number) => {
                    return (
                        <CTableRow key={index}>
                            <CTableDataCell>{option.text}</CTableDataCell>
                            <CTableDataCell>{option.score}</CTableDataCell>
                            <CTableDataCell><Delete onClick={() => handleDeleteOption(option)} /></CTableDataCell>
                        </CTableRow>
                    )
                })}
            </CTableBody>
        </CTable>
    )
};

export default ProgramTable;