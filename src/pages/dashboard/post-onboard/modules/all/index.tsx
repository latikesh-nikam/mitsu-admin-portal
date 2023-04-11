import React, { useEffect, useState } from 'react';
import ModuleList from '../../../../../component/modules-list';
import { getAllModules } from '../../../../../service/module.service';
import PreviewModal from '../../../../../sharedComponent/modules/previewModule';

const AllModules: React.FC = () => {

  const [modules, setModules] = useState([]);
  const [showPreview, setPreview] = useState(false);

  const getModules = async () => {
    const res = await getAllModules()
    setModules(res?.data?.data)
  }

  useEffect(() => {
    getModules()
  },[])

  return (
    <>
      <div >
        {showPreview && (
          <PreviewModal showPreview={showPreview} setPreview={setPreview} modules={modules}/>
        )}
        
        <ModuleList modulesList={modules} setPreview={setPreview} />
      </div>
    </>
  )
}

export default AllModules