import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const photogalleries = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.lorem.words(5),
  date: "02.03.2022",
  images: [
    faker.image.city(),
    faker.image.animals(),
    faker.image.business(),
    faker.image.cats(),
    faker.image.food()
  ],

}));

export default photogalleries;
