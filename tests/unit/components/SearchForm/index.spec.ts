import '../../../init/initVueTpl'
import { shallowMount } from '@vue/test-utils'

import SearchForm from '@/components/SearchForm/index.vue'

const wrapper = shallowMount(SearchForm)
const vm: any = (<any>wrapper).vm

describe('搜索框', () => {
  it('测试搜索函数', () => {
    const unitCb = jest.fn()
    vm.search(unitCb)
    expect(unitCb).toHaveBeenCalled()
  })
})
