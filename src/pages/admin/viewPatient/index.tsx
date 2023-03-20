import React, { useEffect, useState } from 'react';
import Datagrid from "../../../component/data-grid/index";
import http from '../../../services/module.service';
import styles from "./viewPatient.module.scss";
import { toast } from 'react-hot-toast';
import { IListDataProps } from '../../../interface';

const ViewPatient: React.FC = () => {

  const [listData, setListData] = useState<Partial<IListDataProps[]>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPatientData = async () => {
    try {
      setIsLoading(true);
      const res = await http.get("users");
      setIsLoading(false);
      setListData(res.data);

    } catch (error) {
      toast.error(`${error}`);
      setIsLoading(false);
      throw error
    }
  };

  const handleDeleteRowClick = async (params: Partial<IListDataProps>) => {
    try {
      const res = await http.delete(`users/${params.id}`);
      toast.success("User Deleted!");
      return res;
    }
    catch (error) {
      toast.error(`${error}`);
    }
    fetchPatientData();
  };

  useEffect(() => {
    fetchPatientData()
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>View Patients</h1>
      <Datagrid
        rowData={listData}
        isLoading={isLoading}
        handleClick={(params) => handleDeleteRowClick(params)}
      />
    </div>
  )
}

export default ViewPatient