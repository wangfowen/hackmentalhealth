import * as express from "express";
import * as path from "path";

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../dev.html"));
});

export = app;