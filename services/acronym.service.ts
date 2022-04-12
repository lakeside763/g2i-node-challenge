import { BadRequestError } from '../utils/bad-request-error';
import { Pagination } from '../models/acronym.model';
import AppService from './app.service';

class AcronymService extends AppService {
  async getAcronyms({ pagination: { from, limit, search } }: Pagination) {
    let where = {};

    if (search) {
      const OR = [
        { acronym: { contains: search, mode: 'insensitive' } },
        { meaning: { contains: search, mode: 'insensitive' } },
      ];
      where = { ...where, OR };
    }

    const skip = (from - 1) * limit;
    const take = limit;
    const query = { where };

    const totalCount = await this.prisma.acronym.count(query);

    const acronyms = await this.prisma.acronym.findMany({ ...query, skip, take });

    if (!acronyms) {
      throw new BadRequestError('Invalid Request from user');
    }

    const currentPageCount = acronyms.length < take ? skip + acronyms.length : take * from;
    const description = `showing ${skip + 1} to ${currentPageCount} of ${totalCount}`;

    return { acronyms, description };
  }

  async createAcronym({ ...rest }: any) {
    const acronym = await this.prisma.acronym.create({
      data: { ...rest },
    });

    if (!acronym) {
      throw new BadRequestError('Acronym creation failed');
    }

    return acronym;
  }

  async updateAcronym({ id, ...rest }: any) {
    const acronym = await this.prisma.acronym.update({
      where: { id },
      data: { ...rest },
    });

    if (!acronym) {
      throw new BadRequestError('Acronym update failed, invalid ID was provided');
    }

    return acronym;
  }

  async deleteAcronym({ id }: any) {
    const acronym = await this.prisma.acronym.delete({ where: { id } });
    if (!acronym) {
      throw new BadRequestError('Invalid ID was provided');
    }
    return { message: `Data with ${id} was deleted` };
  }
}

export default AcronymService;
