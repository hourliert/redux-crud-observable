# redux-crud-observable
[![Build Status](https://travis-ci.org/FoodMeUp/redux-crud-observable.svg?branch=master)](https://travis-ci.org/FoodMeUp/redux-crud-observable)
[![codecov](https://codecov.io/gh/FoodMeUp/redux-crud-observable/branch/master/graph/badge.svg)](https://codecov.io/gh/FoodMeUp/redux-crud-observable)

Ever been tired of manipulating CRUD entities in a redux app? You always have to do the same things again and again:
fetching an entity, doing the corresponding ajax call, waiting for the promise resolution, storing the value in a reducer... Boring.

**redux-crud-observable** is doing all of that for you. You only have to setup your entity name and your api configuration. It will handle the rest for you, ie:
* generating the corresponding actions creators
* generating the corresponding reducer
* generating the corresponding selectors
* handling all ajax calls

It also comes with a very handy feature: request cancellation. It means that you can cancel at any time a request that is already flying ✈️.

## Getting Started

As always, simply run:
```js
npm install --save redux-crud-observable
```

## Usage

### configuration

To use this library, you will have to add the `createEpicMiddleware` from **redux-observable** to your store enhancers.
Here is a bery basic setup.

```js
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { epicFactory, crudReducerFactory } from 'redux-crud-observable';

const ENTITY = 'JEDI';
const crudReducer = crudReducerFactory(ENTITY);
const rootReducer = combineReducers({
  crud: crudReducer,
});
const rootEpic = reduxCrudObservable.crudEpicFactory({
  apiConfig: {
    apiProto: 'https',
    baseUrl: 'api.starwars.galaxy',
    json: false,
    route: '/jedis',
    token: 'Bearer 1234',
    version: '/v1',
  },
  entity: ENTITY,
});

const store = createStore(rootReducer, applyMiddleware(createEpicMiddleware(rootEpic)));;
```

### Actions Creators

You could generate and use crud actions creators like that:

```js

import { crudActionsCreatorFactory } from 'redux-crud-observable';

const {
  requestReadEntity,
  cancelReadEntity,
} = reduxCrudObservable.crudActionsCreatorFactory('JEDI');

console.log(requestReadEntity({
  id: 5
})); // { type: 'REQUEST_READ_JEDI', payload: 5 }

```

### Reducer

You could create the crud reducer and use it like that:

```js

import { combineReducers } from 'redux';
import { crudReducerFactory } from 'redux-crud-observable';

const crudReducer = crudReducerFactory('JEDI');

export default combineReducers({
  crud: crudReducer,
});

```

### Epic

You need to configure the redux-observable middleware `createEpicMiddleware` before using this library.
You can do it by using:

```js
import { crudEpicFactory } from 'redux-crud-observable';

const rootEpic = crudEpicFactory({
  apiConfig: {
    apiProto: 'https',
    baseUrl: 'api.starwars.galaxy',
    json: false,
    route: '/jedis',
    token: 'Bearer 1234',
    version: '/v1',
  },
  entity: 'JEDI',
});
```

### Selectors

You could create and reselect selectors like that:

```js

import { crudSelectorFactory } from 'redux-crud-observable';

const { entitiesValueSelector } = crudSelectorFactory(['crud']);

console.log(entitiesValueSelector(state)); => // Immutable.Map({ 1234: { hash: 1234, name: 'Yoda' } });
```


## Roadmap

* Make the API configuration more generic
* Make customizable the API entity shape (thinking about how the id of the entity is found (at the moment, with a static `hash` key)
