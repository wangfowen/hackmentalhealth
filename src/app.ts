import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import * as path from "path";
import {buildSchema} from "graphql";
import * as pg from "pg";
import { PoolConfig } from "pg";

const databaseInfo = require('../../database.json') as any
const databaseEnv = process.env[databaseInfo.defaultEnv.ENV]!
const databaseEnvInfo = databaseInfo[databaseEnv]

function maybeEnv(key: string): string | undefined {
    const value = databaseEnvInfo[key]
    if (!value) return undefined 
    if (typeof value === 'string' || typeof value === 'number') return `${value}`
    if ('ENV' in value) return process.env[value.ENV]
    return value
}

const dbconfig: PoolConfig = {
    database: maybeEnv('database') || 'iamnormal',
    host: maybeEnv('host'),
    user: maybeEnv('user') || process.env.USER,
    password: maybeEnv('password') || '',
    port: parseInt(maybeEnv('port') || '0') || 5432,
}

const pool = new pg.Pool(dbconfig)

const app = express();

interface User {
    name: string
}

const schema = buildSchema(`
  type Query {
    user(id: Int): User
  }
  type User {
    name: String
  }
`);

const root = {
    user: async (props: {id: number}): Promise<User | null> => {
        const result = await pool.query('SELECT * FROM users WHERE id=$1', [props.id])
        return result.rows[0]
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