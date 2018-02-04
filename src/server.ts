const app = require("./app");

const port = process.env.PORT || 3000;

const server = app.listen(port, (err: Error) => {
    if (err) {
        return console.log(err);
    }

    console.log(("  App is running at port %d in %s mode"), port, app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});

export = server;