import React, {Component, PropTypes} from 'react';
import {Doughnut} from 'react-chartjs-2';
// chart = require('react-chartjs-2');

const colors = ['#f9bc02', '#fd5308', '#a7194b', '#3e01a4', '#0392ce',
 '#65af32', '#fb9902', '#fe2712', '#fffe34', '#8601b0'];

function generateData(poll) {
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

function getOptions() {
  return {
    // hover: {mode: 'index'},
    legend: {
      labels: {
        display: true,
        // generateLabels: (charts) => {
        //   console.log(charts);
        //   return {
        //     text: 'text',
        //     fillStyle: '#000',
        //     hidden: false,
        //     strokeStyle: '#fff',
        //   };
        // },
      },
    },
    // title: {display: true, text: title},
    cutoutPercentage: 0,
  };
}

export default class VoteChart extends Component {
  render() {
    // const Doughnut = chart.Doughnut;
    const data = generateData(this.props.poll);
    const width = this.props.width || 500;
    console.log("width " + width);
    return (
      <div style={{width: width, 'text-align': 'center'}}>
          <h2>{this.props.poll.question}</h2>
          <div>Количество проголосовавших: <span>{this.props.poll.count}</span></div>
          <Doughnut height={width-100} width={width} data={data} options={getOptions(this.props.poll.question)}/>
      </div>
    );
  }
}
