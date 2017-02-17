
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
        console.log(pref.render(data));
        show(pref.render(data));
        pref.audioPlay();
        setTimeout(showDataOnPage(queue, pref, data.id), pref.getViewTime());
    } else {
        setTimeout(showDataOnPage(queue, pref), 1000);
    }
  }
}
