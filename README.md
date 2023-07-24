# Phone Corp Order & Inventory Module.

## Context

This is an exercise from the Tipsi interview process for Junior full-stack developers.
The goal of this exercise is to create a module to be able to get visibility on current products stock, finding a specific product with his ID, order some products based on the stock data and have acces to all orders history.

## Tech choices

I decided to bootstrap this API with ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) &nbsp; ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) &nbsp; ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)&nbsp; ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Main features:

- A user may add _actions_ the _queue_, they will be added in the last position of the queue.
- An action is done **every other minute** as long as there is enough credits for this action. That is, at least one credit otherwise it's blocked.
- Insufficient credits for an action **won't block** the user from adding an action with no credits.
- Credits are refreshed **every 24 hours**, they should replace the current credits values and be **greater or equal to 80%** of the max credit value for each action.
- Users don't need to be authenticated.
- Tests should be written.
- A single `npm run start` must be used to run the app.
- A single `npm run test` must be used to run tests.

Tools that may be used:

- Javascript, Typescript
- React, Node

## How to run it

1. Run `npm run fullinstall` to install depencies. It is optional as it is automatically ran when typing the next command.
2. `npm run start` to run the fifo system. The frontend will open in your browser: `http:localhost:3000`.
3. `npm run test` to run tests.

## Assumptions

- Not having to authenticate the user allows us not to use persistance solutions such as databases or simply storing the current queue state in a file.
- The queue system could be implemented with either only frontend or only backend, in that case I developed both to show my abilities with both sides.

## Tools used

I chose to work with Typescript for the first time here because I believe it's a development standard nowadays and it's known as best for team work on js projects.

Jest is my testing tool for its ease of use.

Concurrently is a dev tool used to run both frontend and backend simultaneously.

### Backend

The backend uses a simple express server with a small API and sockets (using socket.io). The sockets were used to send real time messages to the frontend while the API was used to provide entry points to the frontend side.

No database were used. This means the queue state is initialized when the server starts and is manipulated by real-time events and user actions.

I chose to use the vanilla Javascript `setInterval()` method to handle real time events. I could have used a cron system instead using the `node-cron` module I'm familiar with but decided it was not needed.

### Frontend

The frontend side of the FIFO queue system is a small React project. It uses sockets to interact with the server's sockets and axios for API calls.

Pure CSS was used for styling purposes.

## Design choices

### AppState Object

No database means I needed to reinvent a state system for an object managing the whole Queue system. I developed methods to call when removing or pushing new actions to the Queue.

### PRNG

I developed a simple _Pseudo Random Number Generator_ that can be seeded for testing purposes. The chosen seed to start with is 2342 for personal nostalgy reasons.

To put it simply, it just performs left and right bitwise shifts on the seed, makes it positive and divides by 2<sup>32</sup> to make it yield a number between 0 and 1.

### Backend tests only

The core business logic of the app is in the backend. I tested this business logic and deemed the frontend was too simple to need tests.

However, frontend tests could be implemented using tools such as _puppeteer_ with jest or _cypress_. End to end could then be written and ran using headless testing commands.

## Possible improvements

- Better styling.
- Frontend testing:
  - Would be relevant given mockups, I could then check that styles are applied and work on every platform easily.
  - end to end tests would just confirm that everything that worked in the backend works in the frontend.
- Using a cron system instead of `setInterval()` would increase performance:
  - `"0/2 * * * *"` would be the right config to remove the first action of the queue.
  - `"0 0 * * *"` would reset credits everyday at midnight. Replacing the first 0 by the current minute and the second by the current hour when initializing the first credits would work better.

// {
// "order": [
// {
// "productId": "64b991dc857fbafa14af6cd5",
// "quantity": 2
// },
// {
// "productId": "64b992dd857fbafa14af6cd1", "quantity": 2
// },
// {
// "productId": "64b992f7857fbafa14af6cd9", "quantity": 2
// }
// ]
// }
