'use strict';

const superagent = require('superagent');
const users = require('../models/users-model.js');

/*
  Resources
  https://developer.github.com/apps/building-oauth-apps/
*/

const tokenServerUrl = process.env.TOKEN_SERVER;
//const tokenServerUrl = 'https://public-api.wordpress.com/oauth2/token';
const USER_URL = process.env.USER_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = process.env.API_SERVER;

async function authorize(req, res, next) {

  try {
    let code = req.query.code;
    console.log('(1) CODE:', code);

    let remoteToken = await exchangeCodeForToken(code);
    console.log('(2) ACCESS TOKEN:', remoteToken)

    let remoteUser = await getRemoteUserInfo(remoteToken);
    console.log('(3) Wordpress User', remoteUser)

    let [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;
    console.log('(4) LOCAL USER', user);

    next();
  } catch (e) { next(`ERROR: ${e.message}`) }

}

async function exchangeCodeForToken(code) {
  let object = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: API_SERVER,
    grant_type: 'authorization_code',
    code: code
  }
    let token = await superagent.post('https://public-api.wordpress.com/oauth2/token').type('form').send(object)
    return token.body.access_token;

}

async function getRemoteUserInfo(token) {
  let response = await superagent.get(USER_URL).set('Authorization', `Bearer ${token}`)
  
  let user = response.body;

  return user;

}

async function getUser(remoteUser) {
  let userRecord = {
    username: remoteUser.username,
    password: 'oauthpassword'
  }

  let user = await users.save(userRecord);
  let token = users.generateToken(user);

  return [user, token];

}

module.exports = authorize;