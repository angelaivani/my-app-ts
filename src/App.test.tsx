import * as mathView from './MathView'
import * as mathUtil from './math'

// const forEach = (items: number[], callback: (value: number) => {})  => {
//   for (let index = 0; index < items.length; index++) {
//     callback(items[index]);
//   }
// }

// test('mocking callback function forEach', () => {
  
//   const mockCallback = jest.fn(x => x + 5)
//   forEach([0,4], mockCallback)

//   // expect(mockCallback.mock.calls.length).toBe(2)
  
//   // expect(mockCallback.mock.calls[0][0]).toBe(0)
//   // expect(mockCallback.mock.calls[1][0]).toBe(4)
//   expect(mockCallback.mock.results[1].value).toBe(9)
// })

test('returns undefined by default', () => {
  const mock = jest.fn()
  const result = mock("foo")  
  
  expect(result).toBeUndefined()
  expect(mock).toHaveBeenCalled()
  expect(mock).toHaveBeenCalledWith("foo")

  const doSomething = (a: number, b: number, callback: (val: number) => void) => {
    callback(a + b)
  }

  const mockFunction = jest.fn()
  doSomething(1, 2, mockFunction)
  expect(mockFunction).toBeCalledTimes(1)
  expect(mockFunction).toBeCalledWith(3)
})

jest.mock("./math.ts")
test('mocking math function', () => {
  const result = mathView.doAdd(1, 2)
  console.log('result', result)
  expect(mathUtil.add).toBeCalled()
  expect(mathUtil.add).toBeCalledWith(1, 2)
})