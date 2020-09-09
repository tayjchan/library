const oauth = require("oauth");
const {
  goodreadsAccessToken,
  goodreadsAccessSecret,
} = require("../config/keys");

const oauthConfig = {
  requestUrl: "https://goodreads.com/oauth/request_token",
  accessUrl: "https://goodreads.com/oauth/access_token",
  version: "1.0A",
  encryption: "HMAC-SHA1",
  callback: "http://localhost:3000",
};

let oa = new oauth.OAuth(
  oauthConfig.requestUrl,
  oauthConfig.accessUrl,
  goodreadsAccessToken,
  goodreadsAccessSecret,
  oauthConfig.version,
  oauthConfig.callback,
  oauthConfig.encryption
);

function requestToken() {
  return new Promise((resolve, reject) => {
    oa.getOAuthRequestToken((error, oauthToken, oauthTokenSecret, results) => {
      if (error) {
        return reject(
          `Error getting OAuth request token : ${JSON.stringify(error)}`
        );
      } else {
        let url = `https://goodreads.com/oauth/authorize?oauth_token=${oauthToken}&oauth_callback=${oa._authorize_callback}`;
        // console.log(oauthToken);
        // console.log(oauthTokenSecret);
        return resolve({ oauthToken, oauthTokenSecret, url });
      }
    });
  }).catch((error) => {
    console.log(error);
  });
}

module.exports = {
  requestToken,
};
