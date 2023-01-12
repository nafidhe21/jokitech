const expressJwt = require('express-jwt');

function authJwt() {
  const api = process.env.API_URL;

  const secret = process.env.secret;
  return expressJwt({
    secret,
    algorithms: ['HS256']
  }).unless({
    path: [
      {url: `${api}/jasas/getAll`, methods: ['GET', 'OPTIONS']},
      {url: `${api}/jasas/getCat1`, methods: ['GET', 'OPTIONS']},
      {url: `${api}/jasas/getCat2`, methods: ['GET', 'OPTIONS']},
      {url: `${api}/jasas/getCat3`, methods: ['GET', 'OPTIONS']},
      {url: /\/jasas\/view(.*)/, methods: ['GET', 'OPTIONS']},
      {url: /\/penjasas\/view(.*)/, methods: ['GET', 'OPTIONS']},
      {url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS']},
      {url: /\/view\/penjasaid(.*)/, methods: ['GET', 'OPTIONS']},
      {url: /\/view\/jasaid(.*)/, methods: ['GET', 'OPTIONS']},
      '/api/v1/penjasas/login',
      '/api/v1/penjasas/register'
    ]
  })
};

module.exports = authJwt 
