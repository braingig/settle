import { copyFile, mkdir } from 'node:fs/promises';
import { categories, diningCategory, products, shop, item } from '../src/catalog.js';
import { guidePath, guides } from '../src/journal.js';

const routes = [
  '/shop/', shop(), ...[...categories, diningCategory].map(({ id }) => shop(id)),
  ...products.map(item), '/journal/', ...guides.map(guidePath), '/favourites/', '/bag/', '/checkout/', '/inspiration/', '/help/', '/account/',
];

for (const route of routes) {
  const directory = `dist${route}`;
  await mkdir(directory, { recursive: true });
  await copyFile('dist/index.html', `${directory}index.html`);
}
await copyFile('dist/index.html', 'dist/404.html');
