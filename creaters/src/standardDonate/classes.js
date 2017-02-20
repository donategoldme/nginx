var doT = require('dot/doT');
import {request} from '../utils';


export class Queue {
    constructor() {
        this.q = [];
    }
    addDonate(donate) {
        this.q.push(donate);
    }
    addDonateVoice(donate) {

    }
    getNext() {
        return this.q.shift();
    }
    filterDonates(id) {
        this.q = this.q.filter((d) => d.id !== id);
    }
    next() {
        return this.q.length > 0;
    }
    showed(id) {
        request("/api/widgets/standard/donates/" + id, {method: 'POST'});
        this.filterDonates(id);
    }
}

export class Pref {
    constructor(pref = {view_template: '{{=it.user}} - {{=it.amount}} - {{=it.message}}'}) {
        this.newPref(pref);
    }
    newTmp() {
        let tmp = this.pref.view_template.replace("{user}", "{{=it.user}}").replace("{amount}", "{{=it.amount}}")
        .replace("{message}", "{{=it.message}}");
        this.tempFn = doT.template(tmp);
    }
    newPref(pref) {
        this.pref = pref;
        this.newTmp();
        this.setAudio();
        this.setPic();
    }
    render(data) {
        let out = this.getPic();
        out += '<div class="message">' + this.tempFn({'user': data.nickname, amount: data.money, message: data.message}) +
        '</div>';
        return out;
    }
    renderForAudio(data) {
        return this.tempFn({'user': data.nickname, amount: data.money, message: data.message})
    }
    getViewTime() {
        return Math.max(this.audioFile.duration*1000, this.pref.view_time*1000);
    }
    getVolume() {
        return this.pref.sound_volume / 100;
    }
    setAudio() {
        if (!this.pref.sound) {
            return
        }
        this.audioFile = new Audio(`/uploads/${this.pref.user_id}/sound/${this.pref.sound}`)
        this.audioFile.volume = this.getVolume();
        this.audioFile.load();
    }
    audioPlay() {
        if (!this.audioFile) {
            return Promise((s) => s());
        }
        return this.audioFile.play();
    }
    setPic() {
        if (!this.pref.pic) {
            return
        }
        const pic = new Image();
        pic.src = `/uploads/${this.pref.user_id}/pic/${this.pref.pic}`;
        this.pic = `/uploads/${this.pref.user_id}/pic/${this.pref.pic}`;
    }
    getPic() {
        if (this.pic) {
            return `<div class="pic"><img src="${this.pic}"></img></div>`;
        }
        return '';
    }
    needVoice(amount) {
        return this.pref.voice_cost <= amount && this.pref.sound_volume > 5;
    }
    durationSound() {
        return (1000 + this.audioFile.duration * 1000);
    }
    muted() {
        return this.pref.sound_volume < 10;
    }
}

function addWithAudio(queue, data, text) {
    request("/api/widgets/standard/donates/" + data.id + "?text=" + text).then(() => {
    var au = new Audio("/uploads/voice/" + data.id + ".mp3");
    var d = data;
    au.load();
    d.voicer = true;
    d.audioFile = au;
    queue.addDonate(d);
    })
}

export function getSwitcher(queue, pref) {
  return (res) => {
    const data = res.data;
    switch (data.type) {
      case "add_standard_donate":
        if (pref.needVoice(data.donate.money)) {
            addWithAudio(queue, data.donate, pref.renderForAudio(data.donate));
        } else {
            queue.addDonate(data.donate);
        }
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
  }
}