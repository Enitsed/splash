const graphql = require('../Graphql/graphql');
const express = require('express');
const ejs = require('ejs');
const path = require('path');

module.exports = class Routes {
    
    /**
     * Applies the routes to specific paths
     * @param {*} app - The instance of express which will be serving requests.
     */
    constructor(app) {
        //Throws if no instance of express was passed
        if (app == null) throw new Error("You must provide an instance of express");

		// set view path
		app.set('views', './src');

		// set app view Directory and template engine
		app.set('view engine', 'ejs');
		app.engine('html', ejs.renderFile);
		app.use(express.static('./src'));

        //Registers the base GraphQLi base endpoint
        app.use('/graphql', graphql);

		// render React router
		app.get('/', (req, res) => {
			res.render('index');
		});

        app.get('/user', function(req, res) {
            res.send("he");
        });
    }

};
