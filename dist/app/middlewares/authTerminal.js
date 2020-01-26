"use strict";Object.defineProperty(exports, "__esModule", {value: true});exports. default = async (req, res, next) => {
  const DEFAULT_CREDENTIAL = 'terminal:123456';
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Credentials not provided' });
  }

  const [, base64Credentials] = authHeader.split(' ');
  const credentials = Buffer.from(base64Credentials, 'base64').toString(
    'ascii'
  );
  if (credentials !== DEFAULT_CREDENTIAL) {
    res.set('WWW-Authenticate', 'Basic');
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  return next();
};
