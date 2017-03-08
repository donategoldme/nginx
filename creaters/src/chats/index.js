import React from 'react';
import ReactDOM from 'react-dom';

import Chats from './Chats';

import {getUserData} from '../auth';
import connectCGO from '../centrifuge';
import {getSwitcher} from './switcher';
import {Poll} from './mesaagesPoll';
require ("./main.scss");

ReactDOM.render(
  <Chats/>,
  document.getElementById('show')
);