import {getUserData} from '../auth';
import {getToken} from '../utils';
import connectCGO from '../centrifuge';
import {Queue, Pref} from './classes';
import {showDataOnPage} from './templater';
require ("./main.scss");

import {loadPref} from './loader';

const channelWS = 'standard';

const queue = new Queue();
const pref = new Pref();
loadPref(pref);
const userData = getUserData().then((res) => res.json());
userData.then((data) => connectCGO(data.user.id, channelWS, data.user.username,
                        data.centrifugo.timestamp, data.centrifugo.token, queue, pref));


showDataOnPage(queue, pref)();

