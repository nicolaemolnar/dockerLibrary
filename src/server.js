const express = require('express');
const body_parser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const utils = require('./utils');

// fn to create express server
const create = async () => {

    // server
    const app = express();
    app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
    app.use(body_parser.urlencoded({extended:true}));

    // Log request
    app.use(utils.appLogger);

    // root route - serve static file
    app.get('/api/hello', (req, res) => {
        res.json({hello: 'goodbye'});
        res.end();
    });

    app.post('/api/register', (req, res) => {
        console.log(req.body)
        res.json({name: "Funciono", surname: req.body.surname})
        res.end()
    })

    // root route - serve static file
    app.get('/', (req, res) => {
        return res.sendFile(path.join(__dirname, '../public/client.html'));
    });

    // Catch errors
    app.use(utils.logErrors);
    app.use(utils.clientError404Handler);
    app.use(utils.clientError500Handler);
    app.use(utils.errorHandler);

    return app;
};

module.exports = {
    create
};