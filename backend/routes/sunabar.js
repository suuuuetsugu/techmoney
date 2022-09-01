const express = require('express');
const router = express.Router();
const request = require('request')
const logger = require("../log/winston-setup");

// router.post('/', function(req, res, next) {
//     logger.info('Info sunabar start');

//     var options = {
//       "method": "POST",
//       "url": "https://api.sunabar.gmo-aozora.com/personal/v1/transfer/spaccounts-transfer",
//       "headers": {
//         "Accept": "application/json;charset=UTF-8",
//         "Content-Type": "application/json;charset=UTF-8",
//         "x-access-token": "YjMwZjAzZjg3M2RhNTkzMTBiMWUwZTZl"
//       },
//       body: {
//         "depositSpAccountId":"SP50220278928",
//         "debitSpAccountId":"SP30210005043",
//         "currencyCode":"JPY",
//         "paymentAmount":"5000",
//       },
//       json: true,
//     };
//     res.render(options)

//     logger.info('Info sunabar end');
// });

router.post('/', async(req, res, next) => {
    logger.info('Info sunabar start');
    console.log('body', req.body);
    
    const json = req.body;

    var options = {
      "method": "POST",
      "url": "https://api.sunabar.gmo-aozora.com/personal/v1/transfer/spaccounts-transfer",
      "headers": {
        "Accept": "application/json;charset=UTF-8",
        "Content-Type": "application/json;charset=UTF-8",
        "x-access-token": "YjMwZjAzZjg3M2RhNTkzMTBiMWUwZTZl"
      },
      body: {
        "depositSpAccountId":"SP50220278928",
        "debitSpAccountId":"SP30210005043",
        "currencyCode":"JPY",
        "paymentAmount":"3000", // クリックしたボタンに紐づく金額を取得する
      },
    //   body: json,
      json: true
    };

    console.log('option', options);

    request(options, function (error, res) {
      console.log('req', req.body);
      if (error) throw new Error(error);
    //   console.log('res',res);
    });

    logger.info('Info sunabar end');
});

module.exports = router;