import Centrifuge from 'centrifuge';
import {getToken} from './utils';

const apiHost = document.domain || 'localhost';


function getSwitcher(queue, pref) {
  return (res) => {
    const data = res.data;
    switch (data.type) {
      case "add_standard_donate":
        queue.addDonate(data.donate);
        break;
      case "save_standard_donate":
        queue.filterDonates(data.donate.id);
        break;
      case "standard_prefs_save":
        if (data.standard.active) {
          pref.newPref(data.standard);
        }
        break;
      default:
        console.log("no switcher", data)
    }
   console.log("switcher", queue.q);
  }
}

export default function connectCGO(userId, chan, username, timestamp, token, queue, pref) {
  const cgo = new Centrifuge({
      url: 'http://' + apiHost + ':8000',
      user: `${userId}`,
      timestamp: timestamp,
      info: '',
      token: token,
      authHeaders: {'X-TOKEN-KEY': getToken()},
      authEndpoint: '/api/auth/centrifugo'
  });
  cgo.subscribe(`$${userId}/${chan}`, getSwitcher(queue, pref));
  cgo.connect();
  return cgo;
}