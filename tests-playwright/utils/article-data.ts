import {faker} from '@faker-js/faker';

export interface Article {
  title: string;
  description: string;
  body: string;
  tags: string[];
}

export function generateArticle(): Article {
  const uniqueId = Date.now();

  return {
    title: `${faker.lorem.sentence()} ${uniqueId}`, // ensure unique
    description: faker.lorem.sentences(1),
    body: faker.lorem.paragraphs(2),
    tags: faker.helpers.arrayElements(
      ['qa', 'testing', 'playwright', 'automation', 'tech'], 2
    ),
  };
}