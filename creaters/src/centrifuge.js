import Centrifuge from 'centrifuge';
import {getToken} from './utils';

const apiHost = document.domain || 'localhost';




export default function connectCGO(userId, chan, username, timestamp, token, switcher) {
  const cgo = new Centrifuge({
      url: 'http://' + apiHost + ':8000',
      user: `${userId}`,
      timestamp: timestamp,
      info: '',
      token: token,
      authHeaders: {'X-TOKEN-KEY': getToken()},
      authEndpoint: '/api/auth/centrifugo',
      debug: true,
  });
  cgo.on('connect', (context) => console.log('connect', context));
  cgo.on('error', function(error) {
    console.log(error)
  });
  cgo.on('disconnect', (context) => console.log('disconnect', context));
  cgo.subscribe(`$${userId}/${chan}`, switcher).
    on('join', (message) => console.log('join')).
    on('leave', (message) => console.log('leave'));
  cgo.connect();
  return cgo;
}