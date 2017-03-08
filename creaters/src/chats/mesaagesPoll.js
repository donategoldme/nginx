export class Poll {
  constructor(el) {
    this.messages = [];
    this.el = el;
  }
  addMessage(message) {
    const l = this.messages.length;
    if (l >= 10) {
      this.messages = this.messages.slice(l - 9);
    }
    this.messages.push(message);
    // this.renderMessages();
  }
  renderMessages() {
    this.el.innerHTML = "";
    for (let i = 0; i < this.messages.length;i++) {

    }
  }
}