import 'whatwg-fetch';

export function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export function getToken() {
    return getParameterByName("t");
}

function addHeaderToken(data) {
    if (data.headers == undefined) {
        data.headers = {}
    }
    data['headers']['X-TOKEN-KEY'] = getToken();
    return data;
}
export function request(url, data={}) {
    return fetch(url, addHeaderToken(data));
};
