import React, { useState } from 'react';
import Canvas from '../../../../../component/canvas';
import Chip from '../../../../../component/chip';

const AnxietyPreview: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Canvas
        visible={visible}
        setVisible={setVisible}
        children={
          <Chip
            day={''}
          />
        }
      />
    </>
  )
}

export default AnxietyPreview