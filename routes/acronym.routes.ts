import {
  Express, NextFunction, Request, Response,
} from 'express';
import { Services } from '../models/services.model';

function acronymRoutes(app: Express, services: Services) {
  app.get('/acronym/get-acronyms', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { acronyms, description } = await services.acronym.getAcronyms(req.body);
      res.setHeader('Data-Description', description);
      return res.status(200).json(acronyms);
    } catch (error) {
      next(error);
    }
  });

  app.post('/acronym/create-acronym', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const acronym = await services.acronym.createAcronym(req.body);
      return res.status(200).json(acronym);
    } catch (error) {
      return next(error);
    }
  });

  app.put('/acronym/update-acronym', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const acronym = await services.acronym.updateAcronym(req.body);
      return res.status(200).json(acronym);
    } catch (error) {
      return next(error);
    }
  });

  app.delete('/acronym/delete-acronym/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { message } = await services.acronym.deleteAcronym({ id });
      return res.status(200).json(message);
    } catch (error) {
      return next(error);
    }
  });
}

export default acronymRoutes;
