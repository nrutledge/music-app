import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import StudioContainer from '../../containers/StudioContainer';

export default () => {
  return (
    <div className="container" style={{ height: '100%' }}>
      <BrowserRouter>
          <Route exact path="/" component={StudioContainer} />
      </BrowserRouter>
    </div>
  );
}