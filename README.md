# Moonpig Frontend Test

A small React + TypeScript app for the Moonpig frontend technical challenge. You can browse a paginated grid of cards and open one to see its details.

## A note on process

In the interview session I got as far as the first API call rendered on the page. I finished the rest afterwards, and then reviewed and simplified it before submitting. Happy to talk through any part of it.

## Getting started

```bash
npm install
npm start        # dev server on http://localhost:3000
npm test         # Jest + React Testing Library
npm run build    # production build
```

The API base URL defaults to `https://moonpig.github.io/tech-test-frontend` and can be overridden with `REACT_APP_API_BASE_URL`.

**Stack:** React, TypeScript, React Router, Tailwind, Axios, Jest + Testing Library.

## Project structure

```
src/
├── api/                 Axios client, getProducts / getProduct, types
├── app/                 Router, routes, layout, error and not-found pages
├── features/products/   List page, detail page, data hooks, tests
├── components/          Shared UI (product card, button, image, pagination)
└── test/                Test helper that renders pages inside a router
```

## Key decisions

- **The API layer maps responses to app models.** The API returns PascalCase, deeply nested JSON. `api/products.ts` flattens it once, so components never see the raw shape and an API change only touches one file.
- **Small data hooks, no data library.** With two read-only endpoints, `useProducts` and `useProduct` (`useEffect` plus `AbortController`) are enough. Requests are cancelled on unmount.
- **Errors go to the route boundary.** Hooks return `error` and pages throw it, so a network failure or a bad product id shows one consistent error screen.
- **Pagination lives in the URL** (`?page=N`), so it survives refresh, back/forward and shared links.

## Testing

Page tests cover the list (loading, content, API failure) and the detail page (renders for a given id, not found, generic failure). `api/products` is mocked at its boundary, so nothing hits the network. Pagination and the image retry logic are not covered yet.

## With more time

- Add tests for pagination, including an out-of-range `?page=`, and for image retry behaviour.
- Use React Query for caching and request de-duplication, since list data is refetched on every visit.
- Add search and filtering on the list, driven by a query param like pagination.
- Do an accessibility pass: focus management on route change and a skip link.