import {request} from '../utils';

function activePref(pref) {
    return (data) => {
        for (let i = 0;i < data.length;i++) {
            if (data[i].active) {
                pref.newPref(data[i]);
            }
        }
    }
}
export function loadPref(pref) {
    return request('/api/widgets/standard/').then((res) => res.json()).then(activePref(pref));
}