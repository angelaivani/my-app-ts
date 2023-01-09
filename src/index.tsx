
import React from 'react';
import ReactDOM from 'react-dom/client';
import './telemetry-tracer'
import { datadogLogs } from '@datadog/browser-logs'
// import { datadogRum } from '@datadog/browser-rum'
// import './tracer'

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

datadogLogs.init({
  clientToken: 'pub2adfd6205348b86b3750b371febecb9d',
  service: 'my-ts-app',
  site: 'us5.datadoghq.com',
  forwardErrorsToLogs: true,
  sampleRate: 100,
})

// datadogRum.init({
//     applicationId: 'f751ab6b-15c7-49fe-bb07-e24f95b86614',
//     clientToken: 'pub2adfd6205348b86b3750b371febecb9d',
//     site: 'us5.datadoghq.com',
//     service:'my-ts-app',
//     env:'my-ts-app-dev',    
//     version: '1.0.0',
//     sampleRate: 100,
//     premiumSampleRate: 100,
//     trackInteractions: true,
//     defaultPrivacyLevel:'mask-user-input',
//     sessionReplaySampleRate: 0,
//     allowedTracingOrigins: ["https://angelaivani.github.io/my-app-ts/", (origin) => { console.log('ORIGIN', origin); return origin === "https://angelaivani.github.io/my-app-ts" || origin === "https://angelaivani.github.io" || origin === "http://localhost:3000"}]
// });
    

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
