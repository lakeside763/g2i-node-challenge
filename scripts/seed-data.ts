import fs from 'fs';
import path from 'path';
import { hash } from 'bcryptjs';
import prisma from '../database';
import { logger } from '../server';

const getData = () => new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, '../', 'acronym-raw-data.json'), 'utf8', (err, data) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(JSON.parse(data));
  });
});

const seedAcronymsDataToDatabase = async () => {
  const acronyms: any = await getData();
  const { data } = acronyms;
  const acronymsData = await Promise.all(
    data.reduce((acc: any, acronym: any) => {
      const acronymdata = Object.entries(acronym);
      return [...acc, { acronym: acronymdata[0][0], meaning: acronymdata[0][1] }];
    }, []),
  );

  logger.info('Processing...');
  const createAcronyms = await prisma.acronym.createMany({
    data: acronymsData,
    skipDuplicates: true,
  });

  if (createAcronyms) {
    logger.info('done');
  }
};

const seedAdminUserToDatabase = async () => {
  const admin = {
    email: 'admin@g2i.com',
    password: 'password',
  };

  const password = await hash(admin.password, 10);
  const createUser = await prisma.user.create({
    data: {
      email: admin.email,
      password,
    },
  });
  if (!createUser) {
    logger.error('Create admin user failed');
  }
  logger.info('Admin user added successfully');
};

seedAcronymsDataToDatabase();
seedAdminUserToDatabase();
