import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const videogalleries = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.lorem.words(5),
  date: "02.03.2022",
  image: faker.image.city(),

}));

export default videogalleries;
