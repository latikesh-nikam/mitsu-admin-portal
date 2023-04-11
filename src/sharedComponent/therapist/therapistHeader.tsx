import { CButton, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdown } from '@coreui/react'
import styles from "./therapistHeader.module.scss";

const TherapistHeader = (props: any) => {
    const { addTherapist, setTherapist} = props;
    return (
    <div className={styles.therapistHeaderWrapper}>
        <CButton color="primary" variant="outline" onClick={(e:any) => {
            e.stopPropagation()
            setTherapist(!addTherapist)
        }}>Add Therapist</CButton>
    </div>
    )
};

export default TherapistHeader;
