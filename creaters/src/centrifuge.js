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
      authEndpoint: '/api/auth/centrifugo'
  });
  cgo.subscribe(`$${userId}/${chan}`, switcher);
  cgo.connect();
  return cgo;
}