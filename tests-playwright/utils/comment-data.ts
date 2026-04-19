import {faker} from '@faker-js/faker';
import {Comment} from '../../pages-playwright/types';

export function generateShortComment(): Comment {
  const uniqueId = faker.string.uuid();
  return {
    body: `${faker.lorem.paragraphs(1)} ${uniqueId}`, // ensure unique
  };
}

export function generateLongComment(): Comment {
  const uniqueId = faker.string.uuid();
  return {
    body: `${faker.lorem.paragraphs(10)} ${uniqueId}`, // ensure unique
  };
}