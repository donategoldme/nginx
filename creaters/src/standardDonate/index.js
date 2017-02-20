import {getUserData} from '../auth';
import {getToken} from '../utils';
import connectCGO from '../centrifuge';
import {Queue, Pref, getSwitcher} from './classes';
import {showDataOnPage} from './templater';
require ("./main.scss");

import {loadPref} from './loader';

const channelWS = 'standard';

const queue = new Queue();
const pref = new Pref();
loadPref(pref);
const switcher = getSwitcher(queue, pref);
const userData = getUserData().then((res) => res.json());
userData.then((data) => connectCGO(data.user.id, channelWS, data.user.username,
                        data.centrifugo.timestamp, data.centrifugo.token, switcher));


showDataOnPage(queue, pref)();

