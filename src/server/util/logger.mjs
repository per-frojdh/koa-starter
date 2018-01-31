import winston from 'winston';
import dateFn from 'date-fns';
import chalk from 'chalk';

const {
  combine, timestamp, label, printf,
} = winston.format;

const error = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.simple(),
    }),
  ],
});

const getStatusColor = (code) => {
  if (code >= 200 && code <= 299) {
    return chalk.bgGreen(code);
  } else if (code >= 300 && code <= 399) {
    return chalk.bgWhite(code);
  } else if (code >= 400 && code <= 499) {
    return chalk.bgYellow(code);
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
