
export function check(data) {
  return data !== undefined && data !== null;
}

export function getStyles(data) {
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

export function generateStyles(data) {
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

const colors = ['#f9bc02', '#fd5308', '#a7194b', '#3e01a4', '#0392ce',
 '#65af32', '#fb9902', '#fe2712', '#fffe34', '#8601b0'];

export function generatePollData(poll) {
  const labels = [];
  const cols = [];
  const counts = [];
  if (!!poll.answers) {
    poll.answers.forEach((answer, index) => {
      cols.push(colors[index]);
      labels.push(index + 1 + '. ' + answer.text);
      counts.push(answer.count);
    });
  }
  return {labels: labels, datasets: [{data: counts, backgroundColor: cols}]};
}