const allowedCors = [
  'http://gasayliza.nomoredomains.monster',
  'https://gasayliza.nomoredomains.monster',
  'http://api.gasayliza.nomoredomains.monster',
  'https://api.gasayliza.nomoredomains.monster',
  'http://localhost:3002',
  'https://localhost:3002',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = cors;
