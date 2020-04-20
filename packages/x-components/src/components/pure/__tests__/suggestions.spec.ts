import { Suggestion } from '@empathy/search-types';
import { mount } from '@vue/test-utils';
import { getSuggestionsStub } from '../../../__stubs__/suggestions-stubs.factory';
import Suggestions from '../suggestions.vue';

describe('testing Suggestions component', () => {
  const suggestions = getSuggestionsStub('QuerySuggestion');

  it('renders a list of suggestions passed as props', () => {
    const wrapper = mount(Suggestions, {
      propsData: { suggestions }
    });

    expect(wrapper.findAll('li')).toHaveLength(suggestions.length);
    // Expect generated keys to be unique
    const listItemKeys = new Set((wrapper.vm as any).suggestionsKeys);
    expect(listItemKeys.size).toEqual(suggestions.length);
  });

  it('has a default scoped slot to render each suggestion', () => {
    const wrapper = mount(Suggestions, {
      propsData: { suggestions },
      scopedSlots: {
        default({ suggestion }: { suggestion: Suggestion }) {
          return suggestion.query;
        }
      }
    });

    const liWrappers = wrapper.findAll('li');
    suggestions.forEach((suggestion, index) =>
      expect(liWrappers.at(index).element.textContent).toEqual(suggestion.query)
    );
  });
});
