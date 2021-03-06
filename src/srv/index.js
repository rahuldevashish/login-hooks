
const express = require('express');
const morgan = require('morgan');
// import express, { json } from 'express';
// import morgan from 'morgan';

const app = express();

const memoryDataBase = {
    //Tables
    users: {},
};
console.log(memoryDataBase.user)
app.use( morgan('tiny') );
app.use( express.json() );

/**
 * CORS
 * https://enable-cors.org/server_expressjs.html
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.set( 'port', process.env.PORTS || 4000 );
app.use( morgan( 'server' ) );

app.post('/login', (req, res, next) => {
    const { userdata } = req.body;

    if( userExists( userData.userName ) ) {
        // the password should be equal to the password in memory database

        if( ! checkPassword( userData.id , userData.password ) ) {
            return res.status(404).send("Error");
        }
        return res.status(200).send("User successfuly authenticated");
    }

    return res.status(404).send('user not exists');
});

app.post('/register', (req, res) => {
    // destruct data
    const { userData } = req.body;

    // check if user exists
    if (userExists(userData.user_name)) {
        return res.status(200).send("User is already Register");
    }

    // registerUser
    addUser(userData.user_name, userData);
    return res.status(200).send("Register successfully")
});

/**
 * Listen server
 */
app.listen(app.get('port'), () => {
    console.log(`Listen on port `, app.get('port'));
});

/**
 * DATA BASE FUNCTIONS
 */
const userExists = ( id ) => {
    return memoryDataBase.users.hasOwnProperty(id);
};

const addUser = ( id, data ) => memoryDataBase.users[id] = data;

const checkPassword = ( id, pass ) => {
    try{
        let user = memoryDataBase.users[id];
        return user.password === pass;
    } catch( e ){
        console.error( e );
    }
};


/**
 * Z-ORM
 * by: sergio molina company
 */

const entityWrapper = table => ({
    addEntity: (entityId, data) => addEntity(table,entityId, data),
    deleteEntity: (entityId) => deleteEntity(table,entityId),
    getEntity: (entityId) =>getEntity(table, entityId),
});

const addEntity = (table, entityId, data) => memoryDataBase[table][entityId] = data;
const deleteEntity = (table, entityId) => delete memoryDataBase[table][entityId];
const getEntity = (table, entityId) => memoryDataBase[table][entityId];

const createTable = table => memoryDataBase[tableName] = {};
const deleteTable = table => delete memoryDataBase[table];

/** sample
 *
 * createTable("users");
 * const addUser = entityWrapper("users").addEntity;
 * addUser("Sergio", {name: "sergio", lastname: "molina"});
 *
 */
