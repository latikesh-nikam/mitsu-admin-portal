import React, { useEffect, useState } from 'react';
import ModuleList from '../../../../../component/modules-list';
import { getAllModules } from '../../../../../services/service/module.service';
import Canvas from '../../../../../component/canvas';
import Accordion from '../../../../../component/accordion';
import { validate } from 'uuid';

const AllModules: React.FC<any> = () => {

  const [modules, setModules] = useState([]);
  const [showPreview, setPreview] = useState(false);
  const [subModulesData, setSubModulesData] = useState<any>([]);
  const [activitiesData, setActivitiesData] = useState<any>([]);
  const [screensData, setScreensData] = useState<any>([]);
  const [modulesData, setModulesData] = useState<any>({});

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
      <ModuleList modulesList={modules} setPreview={setPreview} previewData={(item) => sendPreviewData(item)} />
    </div>
  )
}

export default AllModules