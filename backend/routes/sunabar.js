const express = require('express');
const router = express.Router();
const request = require('request')

router.post('/', async(req, res, next) => {
    console.log('body', req.body);

    var options = {
      "method": "POST",
      "url": "https://api.sunabar.gmo-aozora.com/personal/v1/transfer/spaccounts-transfer",
      "headers": {
        "Accept": "application/json;charset=UTF-8",
        "Content-Type": "application/json;charset=UTF-8",
        "x-access-token": "YjMwZjAzZjg3M2RhNTkzMTBiMWUwZTZl"
      },
      body: req.body,
      json: true
    };

    console.log('option', options);

    request(options, function (error, res) {
      console.log('req', req.body);
      if (error) throw new Error(error);
      console.log('res',res);
    });

});

module.exports = router;