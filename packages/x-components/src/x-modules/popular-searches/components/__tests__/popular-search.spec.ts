import { Suggestion } from '@empathy/search-types';
import { createLocalVue, mount } from '@vue/test-utils';
import { getXComponentXModuleName, isXComponent } from '../../../../components/x-component.utils';
import { XPlugin } from '../../../../plugins/x-plugin';
import { getSuggestionsStub } from '../../../../__stubs__/suggestions-stubs.factory';
import { SearchAdapterDummy } from '../../../../__tests__/adapter.dummy';
import { getDataTestSelector } from '../../../../__tests__/utils';
import PopularSearch from '../popular-search.vue';

describe('testing popular search item component', () => {
  const suggestion: Suggestion = getSuggestionsStub('PopularSearch')[0];

  const localVue = createLocalVue();
  localVue.use(XPlugin, { adapter: SearchAdapterDummy });

  const popularSearchWrapper = mount(PopularSearch, { localVue, propsData: { suggestion } });

  it('is an XComponent', () => {
    expect(isXComponent(popularSearchWrapper.vm)).toEqual(true);
    expect(getXComponentXModuleName(popularSearchWrapper.vm)).toBe('popularSearches');
  });

  it('emits UserSelectedAPopularSearch when a popular search is selected', async () => {
    const listener = jest.fn();
    popularSearchWrapper.vm.$x.on('UserSelectedAPopularSearch').subscribe(listener);

    popularSearchWrapper.trigger('click');

    await localVue.nextTick();

    expect(listener).toHaveBeenCalled();
    expect(listener).toHaveBeenCalledWith(suggestion);
  });

  it('renders a button with the query of the popular search (suggestion)', () => {
    expect(popularSearchWrapper.contains('span')).toBeFalsy();
    expect(popularSearchWrapper.element.innerHTML).toEqual(suggestion.query);
  });

  it('renders a button overriding the default content', () => {
    const wrapperComponent = {
      template: `
        <PopularSearch :suggestion="suggestion">
          <template #default="{ suggestion }">
            <svg data-test="icon" height="10" width="10">
              <circle cx="5" cy="5" r="4" stroke="black" />
            </svg>
            <span data-test="query" :aria-label="suggestion.query">{{ suggestion.query }}</span>
          </template>
        </PopularSearch>
      `,
      props: ['suggestion'],
      components: {
        PopularSearch
      }
    };

    const popularSearchWrapper = mount(wrapperComponent, {
      localVue,
      propsData: { suggestion }
    });

    expect(popularSearchWrapper.contains(getDataTestSelector('popular-search'))).toBeTruthy();
    expect(popularSearchWrapper.contains(getDataTestSelector('icon'))).toBeTruthy();
    expect(popularSearchWrapper.find(getDataTestSelector('query')).element.textContent).toEqual(
      suggestion.query
    );
  });
});
