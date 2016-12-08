const emailValidator = require("email-validator");
const https = require('https');
const http = require('http');

class ResponseTimeoutError extends Error {
  constructor(){
    super(...arguments);
  }
}


module.exports = {
  sendInvite: function(options, done){
    const email = options.email;
    if (!emailValidator.validate(email)) {
      return done("Not a valid email address", 400);
    }

    const errorHandler = (err) => {
      let statusCode;
      if (err instanceof ResponseTimeoutError){
        statusCode = 504;
      } else {
        statusCode = 500;
      }
      done(err.message, statusCode);
    }

    let requestOptions = {
      method: 'POST',
      hostname: 'portsmouthnodejs.slack.com',
      path: '/api/users.admin.invite',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      port: 443
    }

    let apiReq = https.request(requestOptions, (res) => {
      let responseText = '';
      let error; //if this is defined, it will stop the 'end' event handler from calling done
      res.on('data', (chunk) => {
        responseText += chunk;
      });
      res.on('end', () => {
        let response;

      //covering the edge case where an error is thrown after all the data has been transferred
        if (error){
          return;
        }

        try {
          response = JSON.parse(responseText);
        } catch (e){
          return res.destroy(e);
        }

        done(undefined, res.statusCode, response);
      });
      res.setTimeout(10000, () => {
        error = new ResponseTimeoutError("Slack server did not respond")
        res.destroy(error);
      });
      res.on('error', errorHandler);
    });
    apiReq.on("error", errorHandler);

    apiReq.end("set_active=true&email="+email+"&token="+sails.config.slack.token);

    sails.log.info("sending request to slack api with email: "+email);
  }
}