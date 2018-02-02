import winston from 'winston';
import dateFn from 'date-fns';
import chalk from 'chalk';

const {
  combine, timestamp, label, printf,
} = winston.format;

const errorlogFormat = printf((info) => {
  const stamp = dateFn.format(info.timestamp, 'YYYY-MM-DD HH:mm:ss');
  return `${info.label}: ${stamp} - [${info.transaction}:${info.path}] - ${
    info.stack
  }`;
});

const error = winston.createLogger({
  level: 'error',
  format: combine(label({ label: 'ERROR' }), timestamp(), errorlogFormat),
  transports: [new winston.transports.Console({})],
});

const getStatusColor = (code) => {
  if (code >= 200 && code <= 299) {
    return chalk.bgGreen(code);
  } else if (code >= 300 && code <= 399) {
    return chalk.black.bgWhite(code);
  } else if (code >= 400 && code <= 499) {
    return chalk.black.bgYellow(code);
  } else if (code >= 500 && code <= 599) {
    return chalk.bgRed(code);
  }
  return 'info';
};

const accessLogFormat = printf((info) => {
  const stamp = dateFn.format(info.timestamp, 'YYYY-MM-DD HH:mm:ss');
  return `${info.label}: ${stamp} - ${getStatusColor(info.message.status)} ${
    info.message.path
  }`;
});

const myCustomLevels = {
  levels: {
    '5xx': 0,
    '4xx': 1,
    '2xx': 2,
    info: 3,
  },
  colors: {
    '5xx': 'red',
    '4xx': 'orange',
    '2xx': 'green',
  },
};

const access = winston.createLogger({
  levels: myCustomLevels.levels,
  format: combine(label({ label: 'ACCESS' }), timestamp(), accessLogFormat),
  transports: [new winston.transports.Console()],
});

export default { error, access };
