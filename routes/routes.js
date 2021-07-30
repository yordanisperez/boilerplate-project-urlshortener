const express = require('express');
const handle= require('../handleRoutes/handleRoutes');

const router = express.Router(option={});


module.exports = function(req,res,next) { // Router factory
    
    router.get('/', handle.handleHom); 
    router.get('/home', handle.handleHom); 
    router.post('/api/shorturl',handle.handleShortUrl);
    router.get('/api/shorturl/:short_url',handle.handleRedirecShortUrl);

return router;
};

