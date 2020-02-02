# favicons-app

[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
[![Coverage status][coverage]][coverage-url]
[![Dependabot badge][dependabot]][dependabot-url]
[![Storybook badge][storybook]][storybook-url]
[![Documentation badge][documentation]][documentation-url]

[deps]: https://david-dm.org/TrigenSoftware/favicons-app.svg
[deps-url]: https://david-dm.org/TrigenSoftware/favicons-app

[build]: http://img.shields.io/travis/com/TrigenSoftware/favicons-app/master.svg
[build-url]: https://travis-ci.com/TrigenSoftware/favicons-app

[coverage]: https://img.shields.io/coveralls/TrigenSoftware/favicons-app.svg
[coverage-url]: https://coveralls.io/r/TrigenSoftware/favicons-app

[dependabot]: https://api.dependabot.com/badges/status?host=github&repo=TrigenSoftware/favicons-app
[dependabot-url]: https://dependabot.com/

[storybook]: https://img.shields.io/badge/Storybook-e94485.svg
[storybook-url]: https://trigensofware.github.io/favicons-app

[documentation]: https://img.shields.io/badge/API-Documentation-2b7489.svg
[documentation-url]: https://trigensofware.github.io/favicons-app/docs

Favicons generator web app.

## Available scripts

```bash
# Lint only styles
yarn lint:styles
# Lint only scripts
yarn lint:scripts
# Lint all sources
yarn lint
# Run tests with Jest
yarn jest
# Run type checking
yarn typecheck
# Run lint, tests and build
yarn test
# Generate docs for TypeScript sources
yarn build:docs
# Start Storybook
yarn start:storybook
# Build standalone Storybook bundle
yarn build:storybook
# Start development server
yarn start
# Build our bundle for production
yarn build
# Serve files from `build` directory
yarn serve
```

## Environment variables

To be able to build this app, you should provide some environment variables:

```bash
OPENWEATHER_APPID=XXX # OpenWeather API App ID; not set by default
```

Optional variables:

```bash
PROXY_API_URI='' # valid URI; not set by default
DISABLE_BROWSER_SYNC=false # boolean; `false` by default
```

You can create `.env` in project root with this variables.

> This project generated with [generator-trigen-app](https://www.npmjs.com/package/generator-trigen-app)
