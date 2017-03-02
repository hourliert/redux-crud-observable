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

Simply run:
```js
npm install --save redux-crud-observable
```

It also has [peer dependencies](https://github.com/FoodMeUp/redux-crud-observable/blob/e0540947757cc7375b741a71a93ee76a3eeed9bd/package.json#L83): **redux, redux-observable, rxjs and reselect**. 

## Doc
You could browse the project documentation [here](https://foodmeup.github.io/redux-crud-observable/index.html).

## Usage

You could check an exemple in [this](https://github.com/FoodMeUp/redux-crud-observable/blob/7fa12ab1d3f73b2c0170d1cb58402a5176ba14a1/src/__tests__/reduxCrudObservable-test.ts#L66) functionnal test.

### Configuration

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

const store = createStore(rootReducer, applyMiddleware(createEpicMiddleware(rootEpic)));
```

### Actions Creators

You can generate and use crud actions creators like that:

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

The full list of actions creators is available [here](https://foodmeup.github.io/redux-crud-observable/interfaces/_actionscreatorfactory_interfaces_crudactions_.icrudactionscreators.html).

### Reducer

You can create the crud reducer and use it like that:

```js

import { combineReducers } from 'redux';
import { crudReducerFactory } from 'redux-crud-observable';

const crudReducer = crudReducerFactory('JEDI');

export default combineReducers({
  crud: crudReducer,
});

```

### Epic

You can create the root crud epic like that:

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

You can create some reselect selectors like that:

```js

import { crudSelectorFactory } from 'redux-crud-observable';

const { entitiesValueSelector } = crudSelectorFactory(['crud']);

console.log(entitiesValueSelector(state)); => // Immutable.Map({ 1234: { hash: 1234, name: 'Yoda' } });
```

[Here](https://foodmeup.github.io/redux-crud-observable/interfaces/_selectorfactory_interfaces_selectorfactory_.icrudselectors.html) is the list of available selectors.

## Roadmap

* Make the API configuration more generic ([current implementation](https://foodmeup.github.io/redux-crud-observable/interfaces/_observableapiconnector_interfaces_requestformatters_.iapiconfig.html))
* Make the API entity shape customizable (thinking about how the id of the entity is found (at the moment, with a static `hash` key)) ([current entity shape](https://foodmeup.github.io/redux-crud-observable/interfaces/_crudentity_interfaces_entities_.ientity.html))
