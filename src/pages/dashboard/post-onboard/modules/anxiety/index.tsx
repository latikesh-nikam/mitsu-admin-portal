/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styles from "./activity.module.scss";
import ModuleList from '../../../../../component/modules-list';
import { Button } from '@mui/joy';
import { Add } from '@mui/icons-material';
import { getAllModules, getProgramsByCategories, assignModuleToCategories } from '../../../../../service/module.service';
import ModuleAddModal from '../../../../../sharedComponent/modules/moduleModal';
import { toast } from 'react-hot-toast';

const Anxiety: React.FC = () => {
  const [showModal, setModal] = useState(false)
  const [modules, setModules] = useState([]);
  const [assignedModules, setAssignModules] = useState([]);
  const [moduleIds, setModuleIds] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [showPreview, setPreview] = useState(false);

  const getModules = async () => {
    const res = await getProgramsByCategories(`Anxiety`)
    setCategoryId(res?.data?.data[0].id)
    setModules(res?.data?.data.map((item: any, index: number) => {
      return item.modules
    }))
  }

  const getAllCategoryModules = async () => {
    const response = await getAllModules()
    setAssignModules(response?.data?.data)
  }

  useEffect(() => {
    getModules()
  },[])

  useEffect(() => {
    getAllCategoryModules()
  },[])

  const handleAddOption = (e: any) => {
    e.stopPropagation()
    setModal(true)
  };

  const assignModules = async () => {
    let assignModuleIds = moduleIds?.map((item) => {
      return { id: item}
    })
    let moduleDetails = {
      id: categoryId,
      category: 'Anxiety',
      modules: [
        ...assignModuleIds, ...modules[0]
      ]
    }
    const res = await assignModuleToCategories(moduleDetails)
    if(res){
      setModal(false)
      setModuleIds([])
      toast.success("Module assigned Successfully!!")
      getModules()
    } else {
      toast.error("Something went wrong !!")
    }
    
  }

  return (
    <>
      <div className={styles.container}>
        {/* <ColumnGrid gridData={gridData} handleCardClick={handleCardClick} /> */}
        <Button
          variant="soft"
          color="primary"
          startDecorator={<Add />}
          onClick={(e) => handleAddOption(e)}
          type="button"
          className={styles.addBtn}
        >
          Add Modules to Anxiety
        </Button>
        {showModal && (
          <ModuleAddModal
            showModal={showModal}
            setModal={setModal}
            modules={assignedModules}
            moduleIds={moduleIds}
            setModuleIds={setModuleIds}
            title={'Anxiety'}
            assignModules={assignModules}
            disabled={moduleIds.length > 0 ? false : true }
          />
        )}
        <ModuleList modulesList={modules? modules[0] : []} setPreview={setPreview} />
      </div>
    </>
  )
};

export default Anxiety