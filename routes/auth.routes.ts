import { Express, NextFunction, Request, Response } from 'express';
import { Login } from '../models/auth.model';
import { Services } from '../models/services.model';

function authRoutes(app: Express, services: Services) {
  app.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: Login = req.body;
      const user = await services.auth.login({ email, password });
      const token = await services.token.set({ user });
      return res.status(200).json({ user, token });
    } catch (error) {
      return next(error);
    }
  });

  app.post('/auth/logout', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = await services.token.getAuth({ req, next });
      await services.token.delete({ token });
      return res.status(200).json({ message: 'User logout successfully' });
    } catch (error) {
      return next(error);
    }
  });
}

export default authRoutes;
