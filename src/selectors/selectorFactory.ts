// /**
//  * Created by thomashourlier on 12/8/16.
//  */

// import { createSelector } from 'reselect';
// import { propsSelector } from '../components';

// export default function crudStoreSelectorsFactory(ENTITY) {
//   const entitiesStoreSelector = state => state.immutable[ENTITY].store;

//   const storeEntitiesCountSelector = createSelector(
//     entitiesStoreSelector,
//     (entitiesStore) => entitiesStore.get('totalCount')
//   );

//   const entityBootTimeSelector = createSelector(
//     entitiesStoreSelector,
//     (entitiesStore) => entitiesStore.get('bootTime')
//   );

//   const entitiesValueSelector = createSelector(
//     entitiesStoreSelector,
//     (entitiesStore) => entitiesStore.get('value')
//   );

//   const requestedEntitiesSelector = createSelector(
//     entitiesValueSelector,
//     entityBootTimeSelector,
//     (entitiesValue, entityBootTime) => {
//       const entityBootTimeTS = Number(new Date(entityBootTime));

//       return entitiesValue.filter(i =>
//         number(new Date(i.get('requestedAt'))) >= entityBootTimeTS
//       );
//     }
//   );

//   // NOTE: This is factory function returning a selector
//   // @see https://github.com/reactjs/reselect#sharing-selectors-with-props-across-multiple-components
//   const createEntityByHashPropSelector = () =>
//     createSelector(
//       entitiesValueSelector,
//       propsSelector,
//       (entitiesValue, props) => {
//         return entitiesValue.get(props.hash);
//       }
//     );

//   return {
//     storeEntitiesCountSelector,
//     entityBootTimeSelector,
//     entitiesValueSelector,
//     requestedEntitiesSelector,
//     createEntityByHashPropSelector,
//   };
// }
