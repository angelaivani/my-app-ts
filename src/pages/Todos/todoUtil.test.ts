import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { getTodos } from './todoUtil'

const handlers = [
  rest.get("*/todos", (req, res, ctx) => {
    console.log('IAM TRIGGEREDS')
    return res(
      
      ctx.json({
        name: "hello"
      })
    );    
  }),
]

const server = setupServer(rest.get("*/todos", (req, res, ctx) => {
  console.log('IAM TRIGGEREDS')
  return res(
    
    ctx.json({
      name: "hello"
    })
  );    
}))

beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.


// Clean up after the tests are finished.
afterAll(() => server.close())

// import axios, { AxiosResponse} from 'axios'
// import { getTodos } from './todoUtil'

// jest.mock('axios')
// const mockAxios = axios as jest.Mocked<typeof axios>

describe('getTodos()', () => {
  test('should return todo list', async() => {
    // const todos = [
    //   {
    //     userId: 1,
    //     id: 1,
    //     title: 'todo-test-1',
    //     completed: false
    //   },
    //   {
    //     userId: 2,
    //     id: 2,
    //     title: 'todo-test-2 ',
    //     completed: true
    //   }
    // ]
    // const mockedResponse: AxiosResponse = {
    //   data: todos,
    //   status: 200,
    //   statusText: 'OK',
    //   headers: {},
    //   config: {},
    // };
    // mockAxios.get.mockResolvedValueOnce(mockedResponse)
    const data = await getTodos()
    console.log('DATA', data)
    expect(data).toEqual("hello")
    // expect(axios.get).toHaveBeenCalled()
    // expect(data).toEqual(todos)
  })
})
