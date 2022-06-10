import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const categories = [...Array(3)].map((_, index) => ({
  id: faker.datatype.uuid(),
  uz: faker.name.findName(),
  ru: faker.name.findName(),
  en: faker.name.findName(),
}));

export default categories;
