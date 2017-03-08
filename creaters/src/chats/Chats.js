import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

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
  if (!!data.chats['font-family']) {
    const fontImport = data.chats['font-family'].replace(new RegExp(' ', 'g'), '+');
    styles += `@import url('https://fonts.googleapis.com/css?family=${fontImport}');`;
  }
  Object.keys(data).forEach(function(key) {
    styles += '.' + key + "{"
    Object.keys(data[key]).forEach(function(sKey) {
      if (data[key][sKey] !== null) {
        const {r, g, b, a} = data[key][sKey]
        if (check(r) && check(g) &&
            check(b) && check(a)) {
          styles += sKey + ':' + `rgba(${r}, ${g}, ${b}, ${a});`;
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
  styles.badge = {}
  styles.smile = {}
  styles.chats = {};
  styles.message = {};
  styles.nickname = {};
  styles['full-message'] = {};
  styles.badge = data.badges === true ? {display: 'block'} : {display: 'none'};
  styles.chats.height = data.height ? data.height+'px' : null;
  styles.message.color = data.color_message ? JSON.parse(data.color_message) : null;
  styles.nickname.color = data.color_nicks ? JSON.parse(data.color_nicks) : null;
  styles['full-message']['background-color'] = data.color_bg ? JSON.parse(data.color_bg) : null;
  if (!!data.font_size) {
    styles.chats['font-size'] = data.font_size ? data.font_size+'px' : null;
    styles.badge.height = data.font_size+'px'
    // styles.badge['padding-top'] = data.font_size/2+'px';
    styles.smile['height'] = data.font_size+'px';
    // styles.smile['padding-top'] = data.font_size/2+'px';
  }
  styles.chats['font-family'] = data.font_family ? data.font_family : null;
  styles['full-message'].width = data.width ? data.width+'px' : null;
  styles['full-message']['padding'] = data.padding ? data.padding+'px' : null;
  styles['full-message']['margin-bottom'] = data.margin_bot ? data.margin_bot+'px' : null;
  styles['full-message']['border-radius'] = data.border_radius ? data.border_radius+'px' : null;
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

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView(false);
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
      <div style={ {float:"left", clear: "both"} }
                ref={(el) => { this.messagesEnd = el; }}></div>
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
        if (messages.length >= 100) {
          messages = messages.slice(50);
        }
        messages.push(data.message);
        this.setState({
          messages: messages,
        });
        break;
      case "chats_pref_save":
        console.log(data);
        this.setState({styles: generateStyles(data.chats_pref)})
        break;
      default:
        break;
    }
  }
}
