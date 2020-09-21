const oauth = require("oauth");

const GOODREADS_KEY = process.env.GOODREADS_KEY || "";
const GOODREADS_SECRET = process.env.GOODREADS_SECRET || "";

const oauthConfig = {
  url: "https://goodreads.com",
  requestUrl: "https://goodreads.com/oauth/request_token",
  accessUrl: "https://goodreads.com/oauth/access_token",
  version: "1.0",
  encryption: "HMAC-SHA1",
  callback: "http://localhost:3000",
};

let oa = new oauth.OAuth(
  oauthConfig.requestUrl,
  oauthConfig.accessUrl,
  GOODREADS_KEY,
  GOODREADS_SECRET,
  oauthConfig.version,
  oauthConfig.callback,
  oauthConfig.encryption
);

function requestToken() {
  return new Promise((resolve, reject) => {
    oa.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
      if (error) reject(JSON.stringify(error));
      const url = `${oauthConfig.url}/oauth/authorize?oauth_token=${oauthToken}&oauth_callback=${oa._authorize_callback}`;
      resolve({ oauthToken, oauthTokenSecret, url });
    });
  });
}

function processCallback(oauthToken, oauthTokenSecret) {
  return new Promise((resolve, reject) => {
    oa.getOAuthAccessToken(
      oauthToken,
      oauthTokenSecret,
      1,
      (error, accessToken, accessTokenSecret, results) => {
        if (error) reject(JSON.stringify(error));
        resolve({ accessToken, accessTokenSecret });
      }
    );
  });
}

function get(path, accessToken, accessTokenSecret) {
  return new Promise((resolve, reject) => {
    oa.get(path, accessToken, accessTokenSecret, (error, res) => {
      if (error) reject(error);
      resolve(res);
    });
  });
}

function post(path, accessToken, accessTokenSecret) {
  return new Promise((resolve, reject) => {
    oa.post(
      path,
      accessToken,
      accessTokenSecret,
      null,
      null,
      (error, response) => {
        if (error) reject(error);
        else resolve(response);
      }
    );
  });
}

module.exports = {
  requestToken,
  processCallback,
  get,
  post,
};
