import express from "express";
import config from "./config/environment";
import whatsAppRoutes from "./routes/whatsapp.routes";
import apiRoutes from "./routes/api.routes";

import logger from "./services/logger";
import connectDatabase from "./config/database";

export const app = express();
const port = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(whatsAppRoutes)
app.use("/api/v1", apiRoutes)

const startServer = async() => {
    await connectDatabase();
    app.listen(port, () => logger.info(`Server running on port ${port}..`));
}

startServer();
