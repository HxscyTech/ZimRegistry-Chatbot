import express from "express";
import config from "./config/environment";

const app = express();
const port = config.PORT;

app.listen(3000, () => console.log(`Server running on port ${port}..`))