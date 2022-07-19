const express = require('express');
const compression = require('compression');
const cors = require('cors');

require('dotenv').config();

const app = require('./routes/index');

app.use(compression({ level: 1 }));
app.use(cors());
require('./graphql/index')(app);

app.listen(process.env.PORT, (e: any): void => {
    if (e) console.log(e);
    else console.log(`Server started at port ${process.env.PORT}`);
});

// APIs Credit: https://pokeapi.co/docs/v2