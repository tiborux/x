import { SearchBoxXStoreModule } from './types';

/**
 * {@link XStoreModule} For the search-box module.
 *
 * @internal
 */
export const searchBoxXStoreModule: SearchBoxXStoreModule = {
  state: () => ({
    query: '',
    config: {
      maxLength: 64,
      autofocus: true,
      instant: true,
      instantDebounceInMs: 500,
      autocomplete: {
        keyboardKeys: ['ArrowRight'],
        suggestionsEvent: 'QuerySuggestionsChanged'
      }
    }
  }),
  getters: {
    trimmedQuery(state) {
      return state.query.trim();
    }
  },
  mutations: {
    setQuery(state, newQuery) {
      state.query = newQuery;
    }
  },
  actions: {}
};
