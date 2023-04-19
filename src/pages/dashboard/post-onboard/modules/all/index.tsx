import React, { useEffect, useState } from 'react';
import ModuleList from '../../../../../component/modules-list';
import { deleteModules, getAllModules } from '../../../../../services/service/module.service';
import Canvas from '../../../../../component/canvas';
import Accordion from '../../../../../component/accordion';
import { validate } from 'uuid';
import DeleteModuleConfirmation from '../../../../../sharedComponent/postOnboarding/deleteModuleConfirmation';
import toast from 'react-hot-toast';

const AllModules: React.FC<any> = () => {

  const [modules, setModules] = useState([]);
  const [showPreview, setPreview] = useState(false);
  const [subModulesData, setSubModulesData] = useState<any>([]);
  const [activitiesData, setActivitiesData] = useState<any>([]);
  const [screensData, setScreensData] = useState<any>([]);
  const [modulesData, setModulesData] = useState<any>({});
  const [showDelete, setDelete] = useState<boolean>(false)
  const [deleteItem, setDeletedItem] = useState<any>("")

  const getModules = async () => {
    const res = await getAllModules()
    setModules(res?.data?.data)
  }

  useEffect(() => {
    getModules();
  }, []);

  const sendPreviewData = (item: any) => {
    const modulesdata = { ...item }
    setModulesData(modulesdata);
    setSubModulesData(item.sub_modules);
    const activitesdata = item?.sub_modules?.map((val: any) => val?.activities)
    setActivitiesData(activitesdata)
    const screensArray: any = []
    const screendata = activitesdata.forEach((array: any) => screensArray.push(array.map((val: any) => val.screens)))
    setScreensData(screensArray.flat());
  }

  const handleDeleteModule = async() => {
    const res = await deleteModules(deleteItem?.id)
    if(res){
      toast.success('Module deleted successfully!!!')
      getModules()
      setDelete(false)
    } else {
      toast.error('Something went wrong!!!')
    }
  }

  return (
    <div >
      {showPreview && (
        <Canvas
          setVisible={setPreview}
          visible={showPreview}
          children={
            <Accordion
              subModulesData={subModulesData}
              activitiesData={activitiesData}
              screensData={screensData}
              modulesData={modulesData}
            />
          }
        />
      )}
      {showDelete && (
        <DeleteModuleConfirmation
          showDelete={showDelete}
          setDelete={setDelete}
          handleDeleteModule={handleDeleteModule}
        />
      )}
      <ModuleList modulesList={modules} setPreview={setPreview} previewData={(item) => sendPreviewData(item)} setDeletedItem={setDeletedItem} setDelete={setDelete} />
    </div>
  )
}

export default AllModules