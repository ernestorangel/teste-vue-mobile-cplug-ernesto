import Icon from './Icon.vue';
import { mount } from '@vue/test-utils';
import { expect, describe, it } from 'vitest';

interface icon {
  shape: string;
  size?: string | undefined;
  color?: string | undefined;
}

const icon: icon = {
  shape: 'plus',
  size: undefined,
  color: '#ffffff',
};

function mountIcon(size: string | undefined) {
  icon.size = size;
  return mount(Icon, {
    props: { ...icon },
  });
}

describe('Icon (Unit)', () => {
  it('Should mount component', () => {
    let wrapper = mountIcon(undefined);
    expect(wrapper.vm).toBeDefined();

    wrapper = mountIcon('xs');
    expect(wrapper.vm).toBeDefined();

    wrapper = mountIcon('sm');
    expect(wrapper.vm).toBeDefined();

    wrapper = mountIcon('md');
    expect(wrapper.vm).toBeDefined();

    wrapper = mountIcon('lg');
    expect(wrapper.vm).toBeDefined();

    wrapper = mountIcon('xl');
    expect(wrapper.vm).toBeDefined();
  });
});
