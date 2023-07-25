# Phone Corp Module

## 💬 &nbsp; About

This is an exercise from a company interview process for Junior full-stack developers apply.</br>
The goal of this exercise is to create a backend module for a phone company</br> to list products and create orders from them.

## ⚙️ &nbsp; Tech Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) &nbsp;![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) &nbsp;![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) &nbsp;![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## 🔩 &nbsp; Main features

- Retrieve the list of products present in the database.
- Retrieve a specific product.
- Place an order of products.
- Display the list of orders.
- Handle non-passing cases: what to do if the requested product does not exist ? What if the order contains products not present in the database ?
- Qualitatives tests and documentation should be written.

## ？How to run it

1. `npm install` to install depencies.
2. `npm start` to run the PhoneCorp system. The server will listen port `:4000`.
3. `npm run test` to run tests.
4. You can create a `.env` file and place `MONGODB_URL=` followed by your connection string provided by MongoDB to interact with your database.

## 📁 Architecture

- I decided to create this project trying to build some layers to be able to have a clean and maintenable code.</br>
- I found `services` --> `utils` --> `controllers` --> `routes` a good path to design the project pattern.
- Created a `config` folder to store `mongoose` connection module exports and `env` with `PORT` config.
- Decided to create my `services` and `utils` folders into `database` because it interacts directly with it.
- Defined my tests in two differents folders `functions` and `routes`, both contains `order` and `product`.

## 🚏 Routes

| Routes            | Methods |                                   Function |
| :---------------- | :-----: | -----------------------------------------: |
| `/product/create` |  POST   |                           Create a product |
| `/product/stock`  |   GET   | List all existing products sorted by brand |
| `/product/:id`    |   GET   |              Retrieve a product with `:id` |
| `/product/`       |   GET   |         Handle error if `:id` not provided |
| `/order/create`   |  POST   |                              Pass an order |
| `/order/history`  |   GET   |             List all orders sorted by date |

### ？ How to use

- For `/product/stock`, `product/` and `order/history` routes, you just have to send a `GET` request.
  </br>

- ### `/product/create` :

```javascript
//example body to send to create a product

{
    "brand": "iPhone", // string
    "model": "15 Pro Max", // string
    "sku": 123456, // number
    "price": 1599, // number
    "quantity": 3 // number
}
```

- ### `/product/:id` :

```javascript
http://localhost:4008/product/ folloed by existing database ID
```

- ### `/order/create` :

```javascript
//example body to send to create an order

// replace examples Id by existing database ID, anyway if you provide a wrong ID the response will alert you.

{
    "order": [
        {
            "productId": "64bed8f2687ae0df0d3675fd",
            "quantity": 2
        },
           {
            "productId": "64bed8f2687ae0df0d3675fd", "quantity": 2
        },
           {
            "productId": "64bf01c275bc8f6ff962ae34", "quantity": 2
        }
    ]
}
```

### 🧱 Process

- Sent all my request with `Postman` when working on the project and set up all my environment to be comfortable.
  </br>

<img src="https://rb.gy/3lzju" alt="jest" width="300" height="230"/>

### ❌ Errors handling

- When I created my routes i decided to handle some errors handlers :

```typescript
-product/create => 400(at least 1 product information not provided / quantity ordered is < 1)
                   409(SKU already exists)
                   500(errors)

product/stock   => 500(errors)

product/:id     => 404(ID not found in DB)
                   500(error)

product/        => 400(product/:id not provided)

order/create    => 400(0 product placed on order / negative product quantity ordered)
                   500(errors)
                   alert(Object.JSON response: ID doesnt exists and cannot be placed in order)

order/history   => 500(errors)
```

## 🧪 Tests

- I decided to use `Jest`, `SuperTest` and `mongodb-memory-server` to deal with testing.
- This setup is pretty efficient and not that hard to use.
- I defined 33 tests which covers all the functions / API calls and DB interactions that i found relevant to test.
- As explained you can run all tests by running `npm run test` or you can do this separately with the commands i created in `package.json` :

```typescript
 npm run test:getOrder
 npm run test:createOrder
 npm run test:createProduct
 npm run test:getProductStock
 npm run test:getProductById
 npm run test:productFunc
 npm run test:orderFunc
```

## 💪🏼 Possible improvements

- Create independents functions to handle errors in API calls.
- Upgrading the module with `product/delete` and `product/update/:id` paths.
- Create an `assets` folder containing a `json` file to store all the reusable `string` messages.
- Edit the project config to be able to import with `@/whatever` instead of `../../../whatever`.
- Move all the functions contained in `getOrder.ts` to keep code cleaner and more maintenable.
- Refactoring some parts of my code to be clearer and more modular.
- Use a Schema Validator like `Zod` to avoid some possibles issues if the app growth.
- Add an Auth, Login, Register and Roles.
- Add a customer ID to track who passed orders.
- Frontend interface.

## 🙇🏻 What did i learn, improve and discover

- I Improved my TypeScript's knowledges.
- I improved my vision of project architecture.
- I learned how to run tests properly and to test what seemed relevant to me.
- I learned how to write and structure a well documented `README` file.
- I discovered [mongodb-memory-server](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) which is pretty good for testing interaction with database.

## 💥 Annoying encountered issues and how i solved them

### <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="18" height="18"/> <u>Jest / TypeScript compatibility</u>

- Had troubles with `Jest` and `TypeScript` compatibility, my tests crashed everytime. </br></br>
- After some investigations
  i discovered that i needed to install :
  </br>
  </br> `babel/core` </br> `babel/preset-env` </br> `babel/preset-typescript` </br> </br>
- Create a `babel.config.js` file and put this inside :

```javascript
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
```

- Also create a `jest.config.ts` and put this inside :

```typescript
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest --config=jest.config.ts",
  transformIgnorePatterns: ["/node_modules/(?!(uuid)/)"],
};
```

### 🔊 <u>Address already in use when testing</u>

- Had troubles running `npm run test` because tests failed with this error message :

```typescript
listen EADDRINUSE: address already in use :::4008
```

- After some investigations i discovered that i needed to mention `(require.main === module) &&` condition in my `index.ts` :

```typescript
require.main === module &&
  server.listen(config.port, () => {
    console.log(
      `⚡️[server]: Server started 🚀 running at http://localhost:${config.port}`
    );
  });
```

- With this condition the server won't force listening on port 4008 between each tests.

### 🛒 <u>create/order issues</u>

- Encountered some issues with `order/create` API Response when an order was passed.
- I created a new branch, reworked my schemas and made it works properly.
- Merged it when properly fixed.
- Also had trouble trying to export functions outside of `getOrder.ts`, had a lot of `TypeScript` errors </br> and bugs and i lost too much time trying to clean this. </br>
- It works well like that but it's kind of dirty part of my code, i should rework this later on !

## 🔭 Conclusion

- Working on this project was really exciting !
- I tried my best but can do way better if i restart from scratch a second time. </br>
- But I had to make choices because i lost a lot of times trying to refactor and deal with errors.
- I started by establishing a little sketch on [`Excalidraw`](https://excalidraw.com/) and took some notes to define the logic, structure and path i wanted to create.
- I improved my skills working on this project and i consider this as a really good point for me.
- A little bit frustrated to had no time to create a little frontend interface to have something to show.
