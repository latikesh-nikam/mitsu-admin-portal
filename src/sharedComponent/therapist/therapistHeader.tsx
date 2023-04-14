import { CButton } from '@coreui/react'
import styles from "./therapistHeader.module.scss";
import { BaseSyntheticEvent } from 'react';

const TherapistHeader = (props: any) => {
    const { addTherapist, setTherapist } = props;
    return (
        <div className={styles.therapistHeaderWrapper}>
            <CButton color="primary" variant="outline" onClick={(e: BaseSyntheticEvent) => {
                e?.stopPropagation()
                setTherapist(!addTherapist)
            }}>Add Therapist</CButton>
        </div>
    )
};

export default TherapistHeader;
