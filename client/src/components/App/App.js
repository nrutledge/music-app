import React from 'react';
import { IconContext } from "react-icons";
import StudioContainer from '../../containers/StudioContainer';

export default () => {
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <div className="container" style={{ height: '100%' }}>
        <StudioContainer />
      </div>    
    </IconContext.Provider>
  );
}