import Redis from 'ioredis';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticationError } from '../utils/authentication-error';

class TokenService {
  secret;

  jwtOptions;

  cache;

  constructor({ secret, ...jwtOptions }: JwtPayload, cache: Redis) {
    this.cache = cache;
    this.jwtOptions = jwtOptions;
    this.secret = secret;
  }

  cacheKey(id: string) {
    return `g2i-api-${process.env.NODE_ENV}-tokenchacke-${id}`;
  }

  async set({ user }: any) {
    const jwtToken = await this.sign(user);
    const decodedToken: any = await this.verify({ token: jwtToken });
    const key = `${decodedToken.jti}`;
    const ttl = decodedToken.exp - Math.floor(new Date().getTime() / 1000);
    await this.cache.set(this.cacheKey(key), JSON.stringify({ token: decodedToken, user }), 'EX', ttl);
    return jwtToken;
  }

  async sign({ id, overrides = {} }: any) {
    const jwtid = uuidv4();
    const subject = id.toString();
    const options = {
      ...this.jwtOptions,
      subject,
      jwtid,
      ...overrides,
    };
    const tokenBuffer = Buffer.from(this.secret, 'base64');
    return jwt.sign({}, tokenBuffer, options);
  }

  async verify({ token }: any) {
    const tokenBuffer = Buffer.from(this.secret, 'base64');
    const { audience, issuer } = this.jwtOptions;
    return jwt.verify(token, tokenBuffer, { audience, issuer });
  }

  async getFromHeaders({ req }: any) {
    if (!req.headers || !req.headers.authorization) {
      throw new AuthenticationError('No authorization header');
    }

    const parts = req.headers.authorization.split(' ');
    if (parts.length !== 2) {
      throw new AuthenticationError('Invalid authorization header');
    }

    const scheme = parts[0];
    if (!/^jwt$/i.test(scheme)) {
      throw new AuthenticationError('Invalid Authorization Scheme');
    }
    return parts[1];
  }
}

export default TokenService;
