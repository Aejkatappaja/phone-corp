# Phone Corp Module

## 💬 &nbsp; About

This is an exercise from the Tipsi interview process for Junior full-stack developers.</br>
The goal of this exercise is to create a backend module for a phone company</br> to list products and create orders from them.

## ⚙️ &nbsp; Tech Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) &nbsp;![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) &nbsp;![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) &nbsp;![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### 🔩 &nbsp; Main features

- Retrieve the list of products present in the database.
- Retrieve a specific product.
- Place an order of products.
- Display the list of orders.
- Handle non-passing cases: What to do if the requested product does not exist ? What if the order contains products not present in the database ?
- Qualitatives tests and documentation should be written.

## ？How to run it

1. `npm install` to install depencies.
2. `npm start` to run the PhoneCorp system. The server will listen port `:4000`.
3. `npm test` to run tests.
4. You can create a `.env` file and place `MONGODB_URL=` followed by your connection string provided by MongoDB to interact with your database.

## 📁 Architecture

I decided to create this project trying to build some layers to be able to have a clean and maintenable code.</br>

## 💪🏼 Possible improvements

- Create independents functions to handle errors in API calls.
- Upgrading the module with `product/delete` and `product/update/:id` routes.
- Create an `assets` folder containing a `json` file to store all the reusable `string` messages.
- Edit the project config to be able to import with `@/whatever` instead of `../../../whatever`.
- Move all the functions contained in `getOrder.ts` to keep code cleaner and more maintenable.

## 🙇🏻 What did i learn, improve and discover

- I Improved my TypeScript's knowledges.
- I improved my vision of project architecture.
- I learned how to run tests properly and to test what seemed relevant to me.
- I discovered [mongodb-memory-server](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) which is pretty good for testing interaction with database.

## 💥 Encountered issues and how i solved them

- Had troubles with `Jest` and `TypeScript` compatibility, my tests crashed everytime. </br></br>After some investigations
  i discovered that i needed to install : </br> `babel/core` </br> `babel/preset-env` </br> `babel/preset-typescript` </br> </br>
- Create a `babel.config.js` file and put this inside :

```javascript
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
```

- Also create a `jest.config.js` and put this inside :

```javascript
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest --config=jest.config.ts",
  transformIgnorePatterns: ["/node_modules/(?!(uuid)/)"],
};
```
