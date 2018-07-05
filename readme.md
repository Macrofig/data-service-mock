# Data Service Mock

> ALPHA stages, testing in my own projects to nail down the api

Emulate a data service without having to write all the boiler plate mocks.

## Install

`npm install data-service-mock -D`


## Usage

```js
import ServiceMock from 'data-service-mock'
new ServiceMock(columns, mockData, options)
```

### `options`

- `caseSensitive`: true by default

### `columns`

Not really used right now but there are plans for it. ;)

### `mockData`

Should be an array of object literals.

## APIs

> Still in flux

### `find(params)`

- `params` object with key value pairs to search on

Returns an object that helps further filter data down.

To access data, use `then`.

### `page(pageNumber)`

- `pageNumber` a number, filters data down by page, based on limit and results.

Returns object for chaining.

### `limit(limitCount)`

- `limitCount` a number, default is 25.

Returns object for chaining

### `then(cb)`

- `cb` a function. Gets final data.
