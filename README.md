# Morrow & Form

A React and Vite furniture storefront with 50 sample products. Each department contains 10 products, and the Dining Room edit curates 10 items from the main catalog.

## Run locally

```sh
npm ci
npm run dev
```

Run `npm run build` to create the static storefront in `dist/`. The build emits index files for the catalog, product and shopping routes so they work as direct links on static hosting.

The catalog lives in `src/catalog.js`. Product photography, the homepage editorial image, and the eight-second H.264 hero loop live in `public/media/`. The loop was created with a slow camera move over the generated dining-room scene.

Favourites, the bag, and demo order summaries are stored locally in the browser. Checkout uses sample details and does not send addresses, process payment, or fulfil orders.

## Image generation

The built-in ImageGen tool created the furniture imagery. The campaign briefs were a sunlit olive and limestone dining room with a walnut oval table and moss chairs, and a living room with an olive velvet sofa, walnut panelling and a travertine table. The catalog briefs called for one borderless five-by-two studio contact sheet per department, with ten individually framed products on warm greige backgrounds. The ten named products in each department of `src/catalog.js` follow the same order as those sheets.
