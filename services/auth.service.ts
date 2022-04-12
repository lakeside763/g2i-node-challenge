import { compare } from 'bcryptjs';
import { AuthenticationError } from '../utils/authentication-error';
import { Login } from '../models/auth.model';
import AppService from './app.service';

class AuthService extends AppService {
  async login({ email, password }: Login) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AuthenticationError('Invalid email was provided');
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AuthenticationError('Invalid password was provided');
    }

    return user;
  }
}

export default AuthService;
