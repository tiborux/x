import Vue from 'vue';
import {
  clearFacetSelectedFilters,
  clearFacetsSelectedFilters,
  clearSelectedFilters
} from './actions/clear-selected-filters.action';
import { setFacets } from './actions/set-facets.action';
import { toggleHierarchicalFilter } from './actions/toggle-hierarchical-filter.action';
import { toggleNumberRangeFilter, toggleSimpleFilter } from './actions/toggle-filter.action';
import { flattenedFilters } from './getters/flattened-filters.getter';
import { selectedFilters } from './getters/selected-filters.getter';
import { selectedFiltersByFacet } from './getters/selected-filters-by-facet.getter';
import { FacetsXStoreModule } from './types';

/**
 * {@link XStoreModule} For the facets module.
 *
 * @internal
 */
export const facetsXStoreModule: FacetsXStoreModule = {
  state: () => ({
    config: {
      multiSelect: {},
      ignoreNewFiltersSelected: true
    },
    facets: {},
    query: ''
  }),
  getters: {
    flattenedFilters,
    selectedFilters,
    selectedFiltersByFacet
  },
  mutations: {
    setFacets(state, newFacets) {
      state.facets = newFacets;
    },
    setFacetMultiSelect(state, { facetId, multiSelect }) {
      Vue.set(state.config.multiSelect, facetId, multiSelect);
    },
    setFilterSelected(_state, { filter, selected }) {
      filter.selected = selected;
    },
    setIgnoreNewFiltersSelected(state, ignoreNewFiltersSelected) {
      state.config.ignoreNewFiltersSelected = ignoreNewFiltersSelected;
    },
    setQuery(state, newQuery) {
      state.query = newQuery;
    }
  },
  actions: {
    setFacets,
    clearSelectedFilters,
    clearFacetSelectedFilters,
    clearFacetsSelectedFilters,
    toggleSimpleFilter,
    toggleHierarchicalFilter,
    toggleNumberRangeFilter
  }
};
