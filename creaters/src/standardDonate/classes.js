var doT = require('dot/doT');
import {request} from '../utils';


export class Queue {
    constructor() {
        this.q = [];
    }
    addDonate(donate) {
        this.q.push(donate);
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
        console.log(this.pref.view_template);
        let tmp = this.pref.view_template.replace("{user}", "{{=it.user}}").replace("{amount}", "{{=it.amount}}")
        .replace("{message}", "{{=it.message}}");
        this.tempFn = doT.template(tmp);
    }
    newPref(pref) {
        this.pref = pref;
        this.newTmp();
        this.setAudio();
        this.setPic();
        console.log(this.tempFn);
    }
    render(data) {
        let out = this.getPic();
        out += '<div class="message">' + this.tempFn({'user': data.nickname, amount: data.money, message: data.message}) +
        '</div>';
        return out;
    }
    getViewTime() {
        if (this.pref.view_time > this.audioFile.duration) {
            return this.pref.view_time*1000;
        }
        return this.audioFile.duration;
    }
    getVolume() {
        return this.pref.sound_volume;
    }
    setAudio() {
        if (!this.pref.sound) {
            return
        }
        this.audioFile = new Audio(`/uploads/${this.pref.user_id}/sound/${this.pref.sound}`)
        this.audioFile.volume = this.pref.sound_volume / 100;
        this.audioFile.load();
    }
    audioPlay() {
        if (!this.audioFile) {
            return
        }
        this.audioFile.play()
    }
    setPic() {
        if (!this.pref.pic) {
            return
        }
        this.pic = `/uploads/${this.pref.user_id}/pic/${this.pref.pic}`
    }
    getPic() {
        if (this.pic) {
            return `<div class="pic"><img src="${this.pic}"></img></div>`;
        }
        return '';
    }
}