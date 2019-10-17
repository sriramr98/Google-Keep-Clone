import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import createStore from 'redux/store';
import './index.css';
import 'config/firebase';
import App from './App';
import {muiTheme} from 'utils/theme';

ReactDOM.render(
  <Provider store={createStore()}>
    <ThemeProvider theme={muiTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
