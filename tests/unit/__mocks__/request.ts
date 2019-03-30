export default jest.fn((query: any): any => {
  return Promise.resolve({
    data: {
      list: [1, 2, 3]
    }
  })
})