webpackJsonp([0],[,,,,,,function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t,n){(0,u.request)("/api/widgets/standard/donates/"+t.id+"?text="+n).then(function(){var n=new Audio("/uploads/voice/"+t.id+".mp3"),i=t;n.load(),i.voicer=!0,i.audioFile=n,e.addDonate(i)})}function a(e,t){return function(n){var i=n.data;switch(i.type){case"add_standard_donate":t.needVoice(i.donate.money)?r(e,i.donate,t.renderForAudio(i.donate)):e.addDonate(i.donate);break;case"save_standard_donate":e.filterDonates(i.donate.id);break;case"standard_prefs_save":i.standard.active&&t.newPref(i.standard);break;default:console.log("no switcher",i)}}}Object.defineProperty(t,"__esModule",{value:!0}),t.Pref=t.Queue=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.getSwitcher=a;var u=n(0),s=n(15);t.Queue=function(){function e(){i(this,e),this.q=[]}return o(e,[{key:"addDonate",value:function(e){this.q.push(e)}},{key:"addDonateVoice",value:function(e){}},{key:"getNext",value:function(){return this.q.shift()}},{key:"filterDonates",value:function(e){this.q=this.q.filter(function(t){return t.id!==e})}},{key:"next",value:function(){return this.q.length>0}},{key:"showed",value:function(e){(0,u.request)("/api/widgets/standard/donates/"+e,{method:"POST"}),this.filterDonates(e)}}]),e}(),t.Pref=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{view_template:"{{=it.user}} - {{=it.amount}} - {{=it.message}}"};i(this,e),this.newPref(t)}return o(e,[{key:"newTmp",value:function(){var e=this.pref.view_template.replace("{user}","{{=it.user}}").replace("{amount}","{{=it.amount}}").replace("{message}","{{=it.message}}");this.tempFn=s.template(e)}},{key:"newPref",value:function(e){this.pref=e,this.newTmp(),this.setAudio(),this.setPic()}},{key:"render",value:function(e){var t=this.getPic();return t+='<div class="message">'+this.tempFn({user:e.nickname,amount:e.money,message:e.message})+"</div>"}},{key:"renderForAudio",value:function(e){return this.tempFn({user:e.nickname,amount:e.money,message:e.message})}},{key:"getViewTime",value:function(){return Math.max(1e3*this.audioFile.duration,1e3*this.pref.view_time)}},{key:"getVolume",value:function(){return this.pref.sound_volume/100}},{key:"setAudio",value:function(){this.pref.sound&&(this.audioFile=new Audio("/uploads/"+this.pref.user_id+"/sound/"+this.pref.sound),this.audioFile.volume=this.getVolume(),this.audioFile.load())}},{key:"audioPlay",value:function(){return this.audioFile?this.audioFile.play():Promise(function(e){return e()})}},{key:"setPic",value:function(){if(this.pref.pic){var e=new Image;e.src="/uploads/"+this.pref.user_id+"/pic/"+this.pref.pic,this.pic="/uploads/"+this.pref.user_id+"/pic/"+this.pref.pic}}},{key:"getPic",value:function(){return this.pic?'<div class="pic"><img src="'+this.pic+'"></img></div>':""}},{key:"needVoice",value:function(e){return this.pref.voice_cost<=e&&this.pref.sound_volume>5}},{key:"durationSound",value:function(){return 1e3+1e3*this.audioFile.duration}},{key:"muted",value:function(){return this.pref.sound_volume<10}}]),e}()},function(e,t,n){"use strict";function i(e){return function(t){for(var n=0;n<t.length;n++)t[n].active&&e.newPref(t[n])}}function r(e){return(0,a.request)("/api/widgets/standard/").then(function(e){return e.json()}).then(i(e))}Object.defineProperty(t,"__esModule",{value:!0}),t.loadPref=r;var a=n(0)},function(e,t,n){"use strict";function i(e){a.innerHTML=e}function r(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return function(){if(n&&e.showed(n),i(""),e.next()){var a=e.getNext(),o=(t.getPic(),Math.max(t.getViewTime()));a.voicer&&!t.muted()&&(a.audioFile.volume=t.getVolume(),setTimeout(function(){return a.audioFile.play()},t.durationSound()),o=1e3+Math.max(1e3*a.audioFile.duration+t.durationSound(),t.getViewTime())),i(t.render(a)),t.audioPlay(),setTimeout(r(e,t,a.id),o)}else setTimeout(r(e,t),1e3)}}Object.defineProperty(t,"__esModule",{value:!0}),t.showDataOnPage=r;var a=(n(0),document.getElementById("show"))},,function(e,t,n){var i=n(13);"string"==typeof i&&(i=[[e.i,i,""]]);n(4)(i,{});i.locals&&(e.exports=i.locals)},,,function(e,t,n){t=e.exports=n(3)(),t.push([e.i,"@import url(https://fonts.googleapis.com/css?family=Pangolin);",""]),t.push([e.i,"body {\n  background: transparent; }\n\nimg {\n  display: block;\n  max-height: 300px;\n  margin: 0 auto; }\n\n.message1 {\n  font-family: 'Pangolin', cursive;\n  text-align: center;\n  font-size: 5em; }\n\n.message {\n  color: #bfae49;\n  font-family: 'Pangolin', cursive;\n  text-align: center;\n  font-size: 4em;\n  text-shadow: 0 1px 0 #b5a545, 0 2px 0 #ac9d42, 0 3px 0 #a2943e, 0 4px 0 #998b3a, 0 5px 0 #867a33, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15); }\n",""])},,function(e,t,n){var i;!function(){"use strict";function r(e,t,n){return("string"==typeof t?t:t.toString()).replace(e.define||c,function(t,i,r,a){return 0===i.indexOf("def.")&&(i=i.substring(4)),i in n||(":"===r?(e.defineParams&&a.replace(e.defineParams,function(e,t,r){n[i]={arg:t,text:r}}),i in n||(n[i]=a)):new Function("def","def['"+i+"']="+a)(n)),""}).replace(e.use||c,function(t,i){e.useParams&&(i=i.replace(e.useParams,function(e,t,i,r){if(n[i]&&n[i].arg&&r){var a=(i+":"+r).replace(/'|\\/g,"_");return n.__exp=n.__exp||{},n.__exp[a]=n[i].text.replace(new RegExp("(^|[^\\w$])"+n[i].arg+"([^\\w$])","g"),"$1"+r+"$2"),t+"def.__exp['"+a+"']"}}));var a=new Function("def","return "+i)(n);return a?r(e,a,n):a})}function a(e){return e.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var o,u={version:"1.1.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1,doNotSkipEncoded:!1},template:void 0,compile:void 0,log:!0};u.encodeHTMLSource=function(e){var t={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},n=e?/[&<>"'\/]/g:/&(?!#?\w+;)|<|>|"|'|\//g;return function(e){return e?e.toString().replace(n,function(e){return t[e]||e}):""}},o=function(){return this||(0,eval)("this")}(),"undefined"!=typeof e&&e.exports?e.exports=u:(i=function(){return u}.call(t,n,t,e),!(void 0!==i&&(e.exports=i)));var s={append:{start:"'+(",end:")+'",startencode:"'+encodeHTML("},split:{start:"';out+=(",end:");out+='",startencode:"';out+=encodeHTML("}},c=/$^/;u.template=function(e,t,n){t=t||u.templateSettings;var i,d,l=t.append?s.append:s.split,f=0,p=t.use||t.define?r(t,e,n||{}):e;p=("var out='"+(t.strip?p.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):p).replace(/'|\\/g,"\\$&").replace(t.interpolate||c,function(e,t){return l.start+a(t)+l.end}).replace(t.encode||c,function(e,t){return i=!0,l.startencode+a(t)+l.end}).replace(t.conditional||c,function(e,t,n){return t?n?"';}else if("+a(n)+"){out+='":"';}else{out+='":n?"';if("+a(n)+"){out+='":"';}out+='"}).replace(t.iterate||c,function(e,t,n,i){return t?(f+=1,d=i||"i"+f,t=a(t),"';var arr"+f+"="+t+";if(arr"+f+"){var "+n+","+d+"=-1,l"+f+"=arr"+f+".length-1;while("+d+"<l"+f+"){"+n+"=arr"+f+"["+d+"+=1];out+='"):"';} } out+='"}).replace(t.evaluate||c,function(e,t){return"';"+a(t)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,""),i&&(t.selfcontained||!o||o._encodeHTML||(o._encodeHTML=u.encodeHTMLSource(t.doNotSkipEncoded)),p="var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("+u.encodeHTMLSource.toString()+"("+(t.doNotSkipEncoded||"")+"));"+p);try{return new Function(t.varname,p)}catch(e){throw"undefined"!=typeof console&&console.log("Could not create a template function: "+p),e}},u.compile=function(e,t){return u.template(e,null,t)}}()},,,,,,function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var r=n(1),a=(n(0),n(2)),o=i(a),u=n(6),s=n(8),c=n(7);n(10);var d="standard",l=new u.Queue,f=new u.Pref;(0,c.loadPref)(f);var p=(0,u.getSwitcher)(l,f),g=(0,r.getUserData)().then(function(e){return e.json()});g.then(function(e){return(0,o.default)(e.user.id,d,e.user.username,e.centrifugo.timestamp,e.centrifugo.token,p)}),(0,s.showDataOnPage)(l,f)()}],[21]);