export default {
  foo(name: string) {
    if (!name) {
      return 'Hello world'
    }
    return name
  },
  compileAndroidCode() {
    throw new Error('you are using the wrong JDK')
  },
  forEach(items: any, cb: any) {
    for (let index = 0; index < items.length; index++) {
      cb(index)
    }
  },
  newJsType: (type: any) => type,
  generateNumber: (number: number) => number,
  newString: (string: string) => string
}