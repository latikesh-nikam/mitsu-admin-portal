import React, { useEffect, useState } from 'react'
import TherapistList from '../../../component/therapistList';
import { AppHeader } from '../../../component/topBar'
import { IListDataProps } from '../../../interface';
import { getTherapistDetails } from '../../../service/therapist.service';
import { userDelete } from '../../../service/user.service';
import TherapistAddModal from '../../../sharedComponent/therapist/therapistAddModal';
import TherapistDeleteModal from '../../../sharedComponent/therapist/therapistDeleteModal';
import TherapistHeader from '../../../sharedComponent/therapist/therapistHeader';
import { toast } from 'react-hot-toast';

const Therapist: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [therapistDelete, setTherapistDelete] = useState(false);
  const [addTherapist, setTherapist] = useState<boolean>(false);
  const [deletedItem, setDeleteItem] = useState<string>("")

  const fetchDemoData = async () => {
    try {
      const res = await getTherapistDetails();
      setData(res?.data?.data)
    }
    catch (error) {
      throw error
    }
  }

  const handleDeleteRowClick = async (item: any) => {
    setTherapistDelete(true);
    setDeleteItem(item?.id)
    fetchDemoData();
  }

  const handleTherapistDelete = async () => {
    let data = { id: deletedItem }
    try {
      const res = await userDelete(data)
      toast.success(res?.data?.message)
      setTherapistDelete(false)
      fetchDemoData();
    } catch (e) {
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    fetchDemoData()
  }, [])

  return (
    <>
      <div>
        <TherapistHeader
          addTherapist={addTherapist}
          setTherapist={setTherapist}
        />
        {addTherapist && (
          <TherapistAddModal
            addTherapist={addTherapist}
            setTherapist={setTherapist}
            setData={setData}
          />
        )}
        {therapistDelete && (
          <TherapistDeleteModal
            therapistDelete={therapistDelete}
            handleTherapistDelete={handleTherapistDelete}
            setTherapistDelete={setTherapistDelete}
          />
        )}
        <TherapistList
          patientList={data}
          handleClick={handleDeleteRowClick}
        />
      </div>
    </>
  )
}

export default Therapist;