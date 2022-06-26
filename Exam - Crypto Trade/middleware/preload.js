const cryptopService = require('../services/crypto');

function preload(populate) {
  return async function (req, res, next) {
    const id = req.params.id;
    
    if(populate){
      res.locals.crypto = await cryptopService.getCryptoAndUsers(id);
    }else{
      res.locals.crypto = await cryptopService.getCryptoById(id);
    }
    next();
  };
}

module.exports = preload;
