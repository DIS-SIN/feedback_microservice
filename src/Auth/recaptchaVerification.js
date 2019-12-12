/*
This function takes the token provided by client side and checks
against Google Recaptcha to verify the token is not only valid
but to return the score of the likelyhood it was created by a bot.
*/
const fetch = require("node-fetch");
const config = require("../config");

// Verify if recaptcha token is valid and not expired

async function verifyToken(token){

  if(!token){
    return {
      success: false,
    };
  }

  var recaptchaResponse;

  const url = `${config.recaptcha.url}?secret=${config.recaptcha.secret}&response=${token}`;

  await fetch(url, {method: "POST"})
  .then((response) => response.json())
  .then(function(data){ 
    recaptchaResponse = data;
  })
  .catch((error) => {
    const errorMsg = {
      "success": false,
      "errors": error.message
    };
    recaptchaResponse = errorMsg;
  });

  return recaptchaResponse;

}

module.exports = {
  verifyToken,
};
