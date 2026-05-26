import pino from "pino";

const logger = pino({
  transport: {
    targets: [
      {
        target: "pino/file",
        options: {
          destination: "./app.log",
          mkdir: true,
        },
      },
      // {
      //   target: "pino-loki",
      //   options:{
      //     host: "http://localhost:3100",
      //     labels:{app: "express-app"}
      //   }
      // },
      {
        target:"pino-pretty",
        options:{
            destination:"pretty.log",
            colorize: false,
            translateTime: "SYS:standard"
        }
      },
      {
        target:"pino-pretty",
        options:{
            destination:1,
            colorize: true,
            translateTime: "SYS:standard"
        }
      }
    ],
  },
});

export default logger