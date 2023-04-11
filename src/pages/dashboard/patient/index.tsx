import React, { useEffect, useState } from 'react'
import PatientsList from '../../../component/patient-list'
import { IListDataProps } from '../../../interface';
import PatientDeleteModal from '../../../sharedComponent/patient/patientDeleteModal';
import { getPatientDetails } from '../../../service/patient.service';
import toast from 'react-hot-toast';
import { Spinner } from '../../loginComponent/logincomponent.data';
import styles from "./patient.module.scss";

const Patient: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [patientDelete, setPatientDelete] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDemoData = async () => {
    setLoading(true);
    try {
      const res = await getPatientDetails();
      setLoading(false);
      setData(res?.data?.data)
    }
    catch (error) {
      toast.error(`${error}`)
      setLoading(true);
      throw error
    }
  }

  const handleDeleteRowClick = async (item: Partial<IListDataProps>) => {
    setPatientDelete(true);
    // try {
    //   const res = await http.delete(`users/${item.id}`);
    //   // toast.success("User Deleted!");
    //   return res;
    // }
    // catch (error) {
    //   toast.error(`${error}`);
    // }
    fetchDemoData();
  }

  useEffect(() => {
    fetchDemoData()
  }, [])

  return (
    <div className={styles.container}>
      {patientDelete && (
        <PatientDeleteModal
          patientDelete={patientDelete}
          setPatientDelete={setPatientDelete}
        />
      )}
      {loading ?
        <div className={styles.spinner}>
          <Spinner />
        </div> :
        <PatientsList
          patientList={data}
          handleClick={handleDeleteRowClick}
        />
      }
    </div>
  )
}

export default Patient;