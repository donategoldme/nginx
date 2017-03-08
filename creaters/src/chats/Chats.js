import React, {Component, PropTypes} from 'react';

import {getUserData} from '../auth';
import connectCGO from '../centrifuge';
import {request} from '../utils';

const channelWS = 'chats';
const prefsUrl = '/api/widgets/chats/pref';

function check(data) {
  return data !== undefined && data !== null;
}

function getStyles(data) {
  let styles = '';
  Object.keys(data).forEach(function(key) {
    styles += '.' + key + "{"
    Object.keys(data[key]).forEach(function(sKey) {
      if (data[key][sKey] !== null) {
        const {r, g, b, a} = data[key][sKey]
        console.log(data[key][sKey], check(r));
        if (check(r) && check(g) &&
            check(b) && check(a)) {
          styles += sKey + ':' + `rgb(${r}, ${g}, ${b}, ${a})`;
        } else {
          styles += sKey + ":" + data[key][sKey] + ";"
        }
      }
    });
    styles += "}"
  });
  return styles;
}

function generateStyles(data) {
  if (data.css !== "") {
    return data.css;
  }
  const styles = {};
  styles.badges = data.badge === true ? {display: 'block'} : {display: 'none'};
  styles.chats = {};
  styles.chats.width = data.width ? data.width+'px' : null;
  styles.chats.height = data.height ? data.height+'px' : null;
  styles.message = {};
  styles.message.color = data.color_message ? JSON.parse(data.color_message) : null;
  styles.nickname = {};
  styles.nickname.color = data.color_nicks ? JSON.parse(data.color_nicks) : null;
  styles.full_message = {};
  styles.full_message['background-color'] = data.color_bg ? JSON.parse(data.color_bg) : null;
  styles.chats['font-size'] = data.font_size ? data.font_size+'px' : null;
  styles.chats['font-family'] = data.font_family ? data.font_family : null;
  styles.full_message['padding-bottom'] = data.padding_bot ? data.padding_bot+'px' : null;
  styles.full_message['border-radius'] = data.border_radius ? data.border_radius+'px' : null;
  return getStyles(styles);
}

export default class Chats extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      styles: '',
    }
  }
  componentDidMount() {
    console.log("mount");
    const prefsPromise = request(prefsUrl).then((res) => res.json())
    .then((res) => this.setState({styles: generateStyles(res)}));
    const userData = prefsPromise.then(() => getUserData()).then((res) => res.json());
    userData.then((data) => connectCGO(data.user.id, channelWS, data.user.username,
                        data.centrifugo.timestamp, data.centrifugo.token, this.switcher.bind(this)));
  }
  
  render() {
    return (
      <div className={'chats'}>
      <style dangerouslySetInnerHTML={{__html: this.state.styles}}/>
      {
        this.state.messages.map((message) =>
          <div style={{float: 'left', width: '100%'}} dangerouslySetInnerHTML={{__html: message.full_render}}></div>
        )
      }
      </div>
    )
  }
  switcher({data}) {
    switch(data.type) {
      case "new_message":
        if (data.message.type_message == 'CLEARCHAT') {
          break;
        }
        let messages = this.state.messages;
        if (messages.length >= 10) {
          messages = messages.slice(messages.length - 9);
        }
        messages.push(data.message);
        this.setState({
          messages: messages,
        });
      case "chats_pref_save":
        console.log(data);
        this.setState({styles: generateStyles(data.chats_pref)})
    }
  }
}
