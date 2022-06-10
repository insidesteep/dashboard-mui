import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(5),
  category: faker.lorem.words(1),
  date: "02.03.2022",
  uz: faker.datatype.boolean(),
  ru: faker.datatype.boolean(),
  en: faker.datatype.boolean(),
}));

export default users;
