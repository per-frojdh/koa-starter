import winston from 'winston';

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

const access = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.prettyPrint(),
      timestamp: true,
      colorize: true,
    }),
  ],
});

export default { error, access };
