import faker from 'faker'
import Cookies from 'js-cookie'
import { mutations, actions } from '@/store/modules/app'

test('测试侧导航', () => {
  // 解构 mutations
  const { TOGGLE_SIDEBAR } = mutations
  const randomBoolean = faker.random.boolean()
  // 模拟导航打开状态
  const state = {
    sidebarStatus: randomBoolean,
    sidebar: {
      opened: Cookies.get('sidebarStatus') !== 'off',
      withoutAnimation: false
    }
  }
  // 参数为空
  const payload = null
  // 应用 TOGGLE_SIDEBAR
  TOGGLE_SIDEBAR(state, payload)
  // 断言结果
  expect(state.sidebarStatus).toBe(randomBoolean)
  expect(state.sidebar.opened).toBe(!randomBoolean)
  expect(state.sidebar.withoutAnimation).toBe(false)
})

test('测试侧导航状态禁用启用', () => {
  // 解构 mutations
  const { SIDEBAR_STATUS } = mutations

  const randomBoolean = faker.random.boolean()
  // 模拟导航打开状态
  const state = {
    sidebarStatus: false
  }
  // 参数为空
  const payload = {
    open: randomBoolean
  }
  // 应用 OPEN_SIDEBAR
  SIDEBAR_STATUS(state, payload)
  // 断言结果
  expect(state.sidebarStatus).toBe(randomBoolean)
})

test('测试打开侧导航', () => {
  // 解构 mutations
  const { OPEN_SIDEBAR } = mutations
  const randomBoolean = faker.random.boolean()
  // 模拟导航打开状态
  const state = {
    sidebar: {
      opened: randomBoolean,
      withoutAnimation: randomBoolean
    }
  }
  // 参数为空
  const payload = null
  // 应用 OPEN_SIDEBAR
  OPEN_SIDEBAR(state, payload)
  // 断言结果
  expect(state.sidebar.opened).toBe(true)
  expect(state.sidebar.withoutAnimation).toBe(false)
})

test('测试关闭侧导航', () => {
  const { CLOSE_SIDEBAR } = mutations
  const randomBoolean = faker.random.boolean()
  const state = {
    sidebar: {
      opened: randomBoolean,
      withoutAnimation: randomBoolean
    }
  }
  const payload = {
    withoutAnimation: randomBoolean
  }
  CLOSE_SIDEBAR(state, payload)

  expect(state.sidebar.opened).toBe(false)
  expect(state.sidebar.withoutAnimation).toBe(randomBoolean)
})

test('测试运行终端', () => {
  const { TOGGLE_DEVICE } = mutations
  const randomString = faker.random.word()
  const state = {
    device: 'vice'
  }
  const payload = {
    device: randomString
  }
  TOGGLE_DEVICE(state, payload)
  expect(state.device).toBe(randomString)
})

test('测试加载图标', () => {
  const { PAGE_LOADING } = mutations
  const randomBoolean = faker.random.boolean()
  const state = {
    isLoading: false
  }
  const payload = {
    isLoading: randomBoolean
  }
  PAGE_LOADING(state, payload)
  expect(state.isLoading).toBe(randomBoolean)
})

test('测试语言切换', () => {
  const { SET_LANGUAGE } = mutations
  const randomLang = faker.random.word()
  const state = {
    language: 'chan'
  }
  const payload = {
    language: randomLang
  }
  SET_LANGUAGE(state, payload)
  expect(state.language).toBe(randomLang)
})

test('测试主题切换', () => {
  const { SET_THEME } = mutations
  const randomTheme = faker.random.word()
  const state = {
    theme: 'chan'
  }
  const payload = {
    theme: randomTheme
  }
  SET_THEME(state, payload)
  expect(state.theme).toBe(randomTheme)
})

test('模拟左侧导航点击： toggleSideBar', () => {
  const { toggleSideBar } = actions
  const commit = jest.fn()
  toggleSideBar({ commit })
  expect(commit).toBeCalledWith('TOGGLE_SIDEBAR')
})

test('操作左侧导航启用禁用： sideBarStatus', () => {
  const { sideBarStatus } = actions
  const commit = jest.fn()
  const randomBoolean = faker.random.boolean()
  const state = {
    open: randomBoolean
  }
  sideBarStatus({ commit }, state)
  expect(commit).toBeCalledWith({ open: randomBoolean, type: 'SIDEBAR_STATUS' })
})

test('关闭左侧导航： closeSideBar', () => {
  const { closeSideBar } = actions
  const commit = jest.fn()
  const randomBoolean = faker.random.boolean()
  const state = {
    withoutAnimation: randomBoolean
  }
  closeSideBar({ commit }, state)
  expect(commit).toBeCalledWith({ withoutAnimation: randomBoolean, type: 'CLOSE_SIDEBAR' })
})

test('打开左侧导航： openSideBar', () => {
  const { openSideBar } = actions
  const commit = jest.fn()
  openSideBar({ commit })
  expect(commit).toBeCalledWith('OPEN_SIDEBAR')
})

test('模拟终端切换： toggleDevice', () => {
  const { toggleDevice } = actions
  const commit = jest.fn()
  const randomString = faker.random.word()
  const device = randomString
  toggleDevice({ commit }, device)
  expect(commit).toBeCalledWith({ device: randomString, type: 'TOGGLE_DEVICE' })
})

test('模拟加载图标： pageLoading', () => {
  const { pageLoading } = actions
  const commit = jest.fn()
  const randomBoolean = faker.random.boolean()
  const isLoading = randomBoolean
  pageLoading({ commit }, isLoading)
  expect(commit).toBeCalledWith({ isLoading: randomBoolean, type: 'PAGE_LOADING' })
})

test('模拟切换语言： setLanguage', () => {
  const { setLanguage } = actions
  const commit = jest.fn()
  const randomString = faker.random.word()
  const language = randomString
  setLanguage({ commit }, language)
  expect(commit).toBeCalledWith({ language: randomString, type: 'SET_LANGUAGE' })
})

test('模拟切换主题： setLanguage', () => {
  const { setTheme } = actions
  const commit = jest.fn()
  const randomString = faker.random.word()
  const theme = randomString
  setTheme({ commit }, theme)
  expect(commit).toBeCalledWith({ theme: randomString, type: 'SET_THEME' })
})

test('模拟导航宽度： setNavWidth', () => {
  const { setNavWidth } = actions
  const commit = jest.fn()
  const navWidth = 10
  setNavWidth({ commit }, navWidth)
  expect(commit).toBeCalledWith({ navWidth: navWidth, type: 'SET_NAV_WIDTH' })
})

test('模拟动态响应宽度： setVaryWidth', () => {
  const { setVaryWidth } = actions
  const commit = jest.fn()
  const varyWidth = 20
  setVaryWidth({ commit }, varyWidth)
  expect(commit).toBeCalledWith({ varyWidth: varyWidth, type: 'SET_VARY_WIDTH' })
})
