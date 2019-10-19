import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import createStore from 'redux/store';
import 'config/firebase';
import {muiTheme} from 'utils/theme';
import App from './App';
import './index.css';

ReactDOM.render(
  <Provider store={createStore()}>
    <ThemeProvider theme={muiTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
