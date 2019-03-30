import faker from 'faker'
const randomBoolean = faker.random.boolean()
export default {
  modules: {
    app: {
      namespaced: true,
      state: {
        sidebar: {
          opened: randomBoolean,
          withoutAnimation: randomBoolean
        },
        device: 'desktop'
      },
      actions: {
        closeSideBar: jest.fn(),
        toggleDevice: jest.fn()
      }
    }
  },
  constantRouter: [
    {
      path: '/401',
      name: faker.random.word(),
      hidden: true
    }
  ]
}