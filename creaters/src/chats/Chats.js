import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {getUserData} from '../auth';
import connectCGO from '../centrifuge';
import {request} from '../utils';
import {check, getStyles, generateStyles, generatePollData} from './utils';
import VoteChart from './Chart';

const channelWS = 'chats';
const prefsUrl = '/api/widgets/chats/pref';

export default class Chats extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      styles: '',
      showChart: false,
      poll: null,
    };
    this.switcher = this.switcher.bind(this);
  }
  componentDidMount() {
    console.log("mount");
    const prefsPromise = request(prefsUrl).then((res) => res.json())
    .then((res) => this.setState({styles: generateStyles(res)}));
    const userData = prefsPromise.then(() => getUserData()).then((res) => res.json());
    userData.then((data) => connectCGO(data.user.id, channelWS, data.user.username,
                        data.centrifugo.timestamp, data.centrifugo.token, this.switcher));
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView(false);
  }
  
  render() {
    console.log(this.state.viewPoll && this.state.poll !== null);
    return (
      <div className={'chats'}>
        <style dangerouslySetInnerHTML={{__html: generateStyles(this.state.styles)}}/>
        { this.state.viewPoll && this.state.poll !== null ?
          <VoteChart width={this.state.styles.width} poll={this.state.poll}/>
          :
          <div>
            {
              this.state.messages.map((message) =>
                <div style={{float: 'left', width: '100%'}} dangerouslySetInnerHTML={{__html: message.full_render}}></div>
              )
            }
          </div>
        }
        <div style={ {float:"left", clear: "both"} } ref={(el) => { this.messagesEnd = el; }}></div>
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
        this.setState({styles: data.chats_pref});
        break;
      case "polls_view_on_screen":
        this.setState({viewPoll: data.view});
        break;
      case "get_polls_success":
        this.setState({poll: data.poll});
        break;
      default:
        break;
    }
  }
}
