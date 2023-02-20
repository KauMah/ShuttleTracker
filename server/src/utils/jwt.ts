import jwt, { JsonWebTokenError, SignOptions } from 'jsonwebtoken';

import _ from 'lodash';

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = Buffer.from(_.get(process.env, 'ACCESS_TOKEN_PRIVATE_KEY', ''), 'base64').toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = Buffer.from(_.get(process.env, 'ACCESS_TOKEN_PUBLIC_KEY', ''), 'base64').toString('ascii');
    return jwt.verify(token, publicKey) as T;
  } catch (error: any) {
    return null;
  }
};
