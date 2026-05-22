import {faker} from '@faker-js/faker';
import {Article} from '../../pages-playwright/types';


export function generateArticle(): Article {
  const uniqueId = faker.string.uuid();
  const articleTitle = `${faker.lorem.sentence()} ${uniqueId}`;

  return {
    title: articleTitle.slice(0, 60), // limit to 60 characters
    description: faker.lorem.sentences(1),
    body: faker.lorem.paragraphs(3),
    tags: faker.helpers.arrayElements(
      ['qa', 'testing', 'playwright', 'automation', 'tech'], 2
    ),
  };
}

export function generateUpdateArticle(): Article {
  const uniqueId = faker.string.uuid();
  const articleTitle = `${faker.lorem.sentence()} ${uniqueId}`;

  return {
    title: articleTitle.slice(0, 30), // limit to 30 characters
    description: faker.lorem.sentences(1),
    body: faker.lorem.paragraphs(2),
    tags: faker.helpers.arrayElements(
      ['qa', 'testing', 'playwright', 'automation', 'tech'], 2
    ),
  };
}

export function generateUpdateArticleParts(): Article {
  const uniqueId = faker.string.uuid();
  const articleTitleUpdate = `Test update article title ${uniqueId}`;
  const articleDescriptionUpdate = `Test update article description`;
  const articleBodyUpdate = `Test update article body`;
  return {
    title: `${articleTitleUpdate}`.slice(0, 30),
    description: `${articleDescriptionUpdate}`,
    body: `${articleBodyUpdate}`,
    tags: faker.helpers.arrayElements(
      ['qa', 'testing', 'playwright', 'automation', 'tech'], 2
    ),
  };
}