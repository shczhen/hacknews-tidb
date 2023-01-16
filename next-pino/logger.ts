// this is the logger for the browser
import pino from 'pino';

const config = {
  serverUrl: process.env.NEXT_SERVER_HOST,
  env: process.env.NODE_ENV,
  publicUrl: process.env.NEXT_PUBLIC_HOST,
};

const pinoConfig: {
  browser: {
    asObject: boolean;
    transmit?: {
      level: string;
      send: (level: string, logEvent: any) => void;
    };
  };
} = {
  browser: {
    asObject: true,
  },
};

if (config.serverUrl) {
  pinoConfig.browser.transmit = {
    level: 'info',
    send: (level, logEvent) => {
      const msg = logEvent.messages[0];

      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
        type: 'application/json',
      };
      let blob = new Blob([JSON.stringify({ msg, level })], headers);
      navigator.sendBeacon(`${config.serverUrl}/log`, blob);
    },
  };
}

const logger = pino(pinoConfig);

export const log = (msg: string) => logger.info(msg);
export default logger;
