import React from 'react';
import { CFooter } from '@coreui/react';

const AppFooter: React.FC = () => {
  return (
    <CFooter>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          Mitsu
        </a>
        <span className="ms-1">&copy; 2023</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by - Mitsu</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">

        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
