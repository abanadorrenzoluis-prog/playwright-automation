import {faker} from '@faker-js/faker';
import {Article} from '../../pages-playwright/types';


export function generateArticle(): Article {
  const uniqueId = faker.string.uuid();
  return {
    title: `${faker.lorem.sentence()} ${uniqueId}`, // ensure unique
    description: faker.lorem.sentences(1),
    body: faker.lorem.paragraphs(3),
    tags: faker.helpers.arrayElements(
      ['qa', 'testing', 'playwright', 'automation', 'tech'], 2
    ),
  };
}