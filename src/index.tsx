import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { rest, setupWorker } from 'msw'

const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/todos", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            userId: 1,
            id: 1,
            title: 'todo-test-1',
            completed: false
          },
          {
            userId: 2,
            id: 2,
            title: 'todo-test-2 ',
            completed: true
          }
        ]
      })
    );    
  }),
]

const worker = setupWorker(...handlers)

if (process.env.NODE_ENV === 'development') {
  worker.start()
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
