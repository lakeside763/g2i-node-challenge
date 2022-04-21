import supertest from 'supertest';
import prisma from '../database_connection';

import { app } from '../server';

const request = supertest(app);

describe('Acrony model', () => {
  beforeAll(async () => {});

  afterEach(async () => {
    await prisma.acronym.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const acronymData = [
    {
      id: '3400f39e-8ed4-40cd-ad34-e363e3010844',
      acronym: 'TAUMUALU',
      meaning: 'Thinking about you miss you always love you',
    },
    {
      id: '3a9ab8e4-a7d3-4f69-b4df-8488691a360a',
      acronym: 'ILYSM',
      meaning: 'I love you so much',
    },
  ];

  test('should unit test inserting acronym record into database', async () => {
    const createAcronym = await prisma.acronym.create({
      data: {
        acronym: 'TAUMUALU',
        meaning: 'Thinking about you miss you always love you',
      },
    });
    expect(createAcronym).toHaveProperty('id');
    expect(createAcronym).toHaveProperty('acronym', 'TAUMUALU');
    expect(createAcronym).toHaveProperty('meaning', 'Thinking about you miss you always love you');
  });

  test('should create acronym record via acronym routes', async () => {
    const { statusCode, body } = await request
      .post('/acronym/create-acronym')
      .send(acronymData[0])
      .then((res) => ({ statusCode: res.statusCode, body: res.body }));

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('acronym', acronymData[0].acronym);
    expect(body).toHaveProperty('meaning', acronymData[0].meaning);
  });

  test('should fetch list of acronyms from via api', async () => {
    const insertRecord = await prisma.acronym.createMany({ data: acronymData });
    const paginationParameters = {
      pagination: {
        from: 1,
        limit: 20,
        search: 'love',
      },
    };

    const { statusCode, body } = await request
      .get('/acronym/get-acronyms')
      .send(paginationParameters)
      .then((res) => ({ statusCode: res.statusCode, body: res.body }));

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(insertRecord.count);
    expect(body).toHaveProperty('0.acronym', acronymData[0].acronym);
    expect(body).toHaveProperty('0.meaning', acronymData[0].meaning);
  });
});
