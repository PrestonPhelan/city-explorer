import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import AppContainer from './app_container';
import Main from './main';

const Root = ({ store }) => {
  return (
   <Provider store={ store }>
     <Main />
    </Provider>
  );
};

export default Root;
