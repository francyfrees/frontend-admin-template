import { shallowMount } from '@vue/test-utils'

export function getRenderedVm(Component: any, propsData?: any): any {
  const wrapper = shallowMount(Component, {
    propsData: propsData,
    mocks: {
      $t: () => {}
    }
  })
  const vm: any = (<any>wrapper).vm
  return {
    wrapper,
    vm
  }
}

/**
 * 回收 vm
 * @param  {Object} vm
 */
export const destroyVM = function(vm: any) {
  vm.$destroy && vm.$destroy();
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el);
};

export const changeDefaultProperty = <T extends {}, K extends keyof T>(
  object: T,
  property: K,
  value: T[K]
) => {
  Object.defineProperty(object, property, { get: () => value })
}
