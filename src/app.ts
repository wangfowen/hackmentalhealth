import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import * as path from "path";
import {buildSchema} from "graphql";

const app = express();

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
    hello: () => {
      return 'Hello world!';
    },
};

app.use('/api/users/show', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false
}));

app.use('/api/users/index', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.get('/api/users/search', (req, res) => {
    res.send("TODO");
});

app.use('/dist', express.static('dist'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../dist/dev.html"));
});

export = app;