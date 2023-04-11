import React, { useEffect, useState } from 'react'
import PatientsList from '../../../component/patient-list'
import { AppHeader } from '../../../component/topBar'
import { IListDataProps } from '../../../interface';
import PatientDeleteModal from '../../../sharedComponent/patient/patientDeleteModal';
import { getPatientDetails } from '../../../service/patient.service';

const Patient: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [patientDelete, setPatientDelete] = useState(false);

  const fetchDemoData = async () => {
    try {
      const res = await getPatientDetails();
      setData(res?.data?.data)
    }
    catch (error) {
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
    <>
      <AppHeader />
      <div>
        {patientDelete && (
          <PatientDeleteModal
            patientDelete={patientDelete}
            setPatientDelete={setPatientDelete}
          />
        )}
        <PatientsList
          patientList={data}
          handleClick={handleDeleteRowClick}
        />
      </div>
    </>
  )
}

export default Patient;