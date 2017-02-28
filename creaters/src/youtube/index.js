import {getUserData} from '../auth';
import connectCGO from '../centrifuge';
import {getSwitcher} from './switcher';
require ("./main.scss");

const channelWS = 'youtubeWidget';

const show = document.getElementById("show");

const switcher = getSwitcher(show);
const userData = getUserData().then((res) => res.json());
userData.then((data) => connectCGO(data.user.id, channelWS, data.user.username,
                        data.centrifugo.timestamp, data.centrifugo.token, switcher));
