const express = require('express');
const port = 8080;
const fs = require('fs');
const path = require('path');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config');
const uuid = require('uuid');

const app = express();
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(webpackMiddleware(webpack(webpackConfig), {
//     noInfo: false,
//     quiet: false,
//     watchOptions: {
//       aggregateTimeout: 300,
//       poll: true
//     },
//     publicPath: '/dist/',
//     index: 'index.html',
//     serverSideRender: false
//   }
// ));

app.get('/getFilteredItems/:filter', (req, res) => {
  let json = fs.readFileSync('data.json', 'utf-8');
  let data = JSON.parse(json);
  let timers = data.timers.reverse();
  let responseTimers = [];
  const todaysDate = new Date();
  let day = todaysDate.getDate();
  if (day.toString().length == 1) {
    day = `0${day}`;
  }
  let month = todaysDate.getMonth() + 1;
  if (month.toString().length == 1) {
    month = `0${month}`;
  }
  const year = todaysDate.getFullYear();
  switch(req.params.filter) {
    case 'today':
      let regexp = new RegExp(`${day}-${month}-${year}`, 'gi');
      timers.forEach((item) => {
        if (item.date.match(regexp)) {
          responseTimers.push(item);
        }
      });
      break;
    case 'week':
      timers.forEach((item) => {
        let itemDate = item.date.split('-');
        let itemMonth = itemDate[1];
        let itemDay = itemDate[0];
        if (+itemMonth == +month) {
          if (+itemDay >= (+day - 7)) {
            responseTimers.push(item);
          }
        } else if ((+itemMonth + 1) == +month) {
          let incrementedDay = +day + 30;
          if (+itemDay >= (+incrementedDay - 7)) {
            responseTimers.push(item);
          }
        }
      });
      break;
    case 'month':
      timers.forEach((item) => {
        let itemDate = item.date.split('-');
        let itemMonth = itemDate[1];
        if (+itemMonth == +month) {
          responseTimers.push(item);
        }
      });
      break;
    default:
      responseTimers = [ ...timers ];
      break;
  }
  res.send(JSON.stringify(responseTimers));
});

app.post('/setTimer', (req, res) => {
  let json = fs.readFileSync('data.json', 'utf-8');
  let data = JSON.parse(json);
  const reqTimer = {
    id: uuid.v4(),
    time: req.body.time,
    description: req.body.text,
    date: req.body.date
  };
  data.timers.push(reqTimer);
  fs.writeFileSync('data.json', JSON.stringify(data, "", 2));
  res.send(JSON.stringify(reqTimer));
});

app.get('/getItemsForStats/:filter', (req, res) => {
  let json = fs.readFileSync('data.json', 'utf-8');
  let data = JSON.parse(json);
  let items = data.timers;
  let resultItems = {};// нужно сделать обьект, названиями полей которого будут даты
  items.forEach((item) => {
    let itemTime = item.time;
    itemTime = +itemTime[0] + (+itemTime[1] /60) + (+itemTime[2] / 3600);
    itemTime = +itemTime.toFixed(2);
    if (resultItems[item.date]) {
      resultItems[item.date] += itemTime;
    } else {
      resultItems[item.date] = itemTime;
    }
  });
  let filteredItems = {};// нужно отъсеять по фильтру ненужные поля
  const todaysDate = new Date();
  let day = todaysDate.getDate();
  if (day.toString().length == 1) {
    day = `0${day}`;
  }
  let month = todaysDate.getMonth() + 1;
  if (month.toString().length == 1) {
    month = `0${month}`;
  }
  const year = todaysDate.getFullYear();
  switch(true) {
    case (req.params.filter == 'week'):
      for (let item in resultItems) {
        let itemDate = item.split('-');
        let itemMonth = itemDate[1];
        let itemDay = itemDate[0];
        if (+itemMonth == +month) {
          if (+itemDay >= (+day - 7)) {
            filteredItems[item] = resultItems[item];
          }
        } else if ((+itemMonth + 1) == +month) {
          let incrementedDay = +day + 30;
          if (+itemDay >= (+incrementedDay - 7)) {
            filteredItems[item] = resultItems[item];
          }
        }
      }
      break;
    case (+req.params.filter >= 1 && +req.params.filter <= 12):
      for (let item in resultItems) {
        let itemDate = item.split('-');
        let itemMonth = itemDate[1];
        if (+itemMonth == +req.params.filter) {
          filteredItems[item] = resultItems[item];
        }
      }
      break;
    default:
      filteredItems = Object.assign({}, resultItems);
      break;
  }
  res.send(JSON.stringify(filteredItems));
});

app.get('/images/:imageURL', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'images', req.params.imageURL));
});

app.get('/dist/:fileName', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', req.params.fileName));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '', 'index.html'));
});

const server = app.listen(port, () => {
  console.log('Listening on port:' + port);
});
