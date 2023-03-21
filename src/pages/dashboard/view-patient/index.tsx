import React, { useEffect, useState } from 'react'
import PatientsList from '../../../component/patient-list'
import { AppHeader } from '../../../component/topBar'
import { IListDataProps } from '../../../interface';
import http from '../../../services/module.service';
import { toast } from 'react-hot-toast';
import DeleteQuestionConfirmation from '../../../sharedComponent/question/deleteConfirmationModal';

const ViewPatients: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [questionDelete, setQuestionDelete] = useState(false);

  const fetchDemoData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setData(data);
    }
    catch (error) {
      throw error
    }
  }

  const handleDeleteRowClick = async (item: Partial<IListDataProps>) => {
    setQuestionDelete(true);
    try {
      const res = await http.delete(`users/${item.id}`);
      toast.success("User Deleted!");
      return res;
    }
    catch (error) {
      toast.error(`${error}`);
    }
    fetchDemoData();
  }

  useEffect(() => {
    fetchDemoData()
  }, [])

  return (
    <>
      <AppHeader />
      <div>
        {questionDelete && (
          <DeleteQuestionConfirmation
            questionDelete={questionDelete}
            setQuestionDelete={setQuestionDelete}
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

export default ViewPatients;