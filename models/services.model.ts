import { AcronymService, AuthService, TokenService } from '../services';

export interface Services {
  acronym: AcronymService,
  token: TokenService,
  auth: AuthService,
}
