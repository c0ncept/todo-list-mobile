import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import store from 'reducer';

import Application from 'component/Application';


ReactDom.render(
  <Provider store={store}>
      <Application />
  </Provider>
, document.getElementById('application'));
