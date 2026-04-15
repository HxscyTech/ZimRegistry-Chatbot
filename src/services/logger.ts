import { createLogger, format, transports} from "winston";
import config from "../config/environment";
const { printf, colorize, combine, json, timestamp } = format;
const {APP_ENV} = config;

const loggerFormat = printf(({ timestamp, level, message}) => {
    return `${timestamp} [ ${level} ] : ${message}`;
});

const logger = createLogger({
    level: APP_ENV === "development" ? "debug" : "info",
    format: combine(timestamp(), APP_ENV === "development" ? combine(colorize(), loggerFormat) : json()),
    transports: [ new transports.Console() ]
});

export default logger;