import {request} from '../utils';
let showEl = document.getElementById('show');

function show(text) {
  showEl.innerHTML = text;
}

export function showDataOnPage(queue, pref, id=0) {
  return () => {
    if (id) {
      queue.showed(id);
    }
    show('');
    if (queue.next()) {
        const data = queue.getNext();
        var picRender = pref.getPic();
        var viewTime = Math.max(pref.getViewTime());
        if (data.voicer && !pref.muted()) {
          data.audioFile.volume = pref.getVolume()
          setTimeout(()=> data.audioFile.play(), pref.durationSound())
          viewTime = 1000 + Math.max(data.audioFile.duration*1000 + pref.durationSound(), pref.getViewTime());
        } 
        show(pref.render(data));
        pref.audioPlay();
        setTimeout(showDataOnPage(queue, pref, data.id), viewTime);
    } else {
        setTimeout(showDataOnPage(queue, pref), 1000);
    }
  }
}


// var a = new Audio();
// var viewTime = 5;
// new Promise((resolve, reject) => {

//   setTimeout(() => {
//     // переведёт промис в состояние fulfilled с результатом "result"
//     resolve("result");
//   }, 1000);

// })
// .then((s) => {
//   a = new Audio("/uploads/voice/162.mp3"); setTimeout(() => a.play(), 3000);
//   viewTime = 1000 + Math.max(a.duration*1000, viewTime);
//   return a
//   })
