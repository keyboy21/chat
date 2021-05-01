const moment = require('moment');

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().locale('uz').format('LLL')
  };
}

module.exports = formatMessage;
