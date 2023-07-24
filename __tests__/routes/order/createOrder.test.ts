import request from "supertest";
import app from "../../../src/index";
import Product from "../../../src/database/models/product.model";

describe("POST /order/create routes test", () => {
  test("should create a new order and return 201 status with correct data", async () => {
    const validOrderData = {
      order: [
        { productId: "64bed7ba2e4bcaa53af304f1", quantity: 2 },
        { productId: "64bed7ba2e4bcaa53af304ef", quantity: 2 },
      ],
    };

    const response = await request(app)
      .post("/order/create")
      .send(validOrderData);

    expect(response.status).toBe(201);
    expect(response.body.order).toBeDefined();
    expect(response.body.order.items.length).toBe(2);
  });

  test("should return 400 status with error message for invalid order data", async () => {
    const invalidOrderData = {};

    const response = await request(app)
      .post("/order/create")
      .send(invalidOrderData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid order data");
  });

  test("should update existing product quantities and save order in the database", async () => {
    const existingProduct1 = await Product.create({
      brand: "Super test",
      model: "Jest",
      sku: 99999,
      price: 777,
      quantity: 5,
    });

    const existingProductOrder = {
      productId: existingProduct1._id.toString(),
      quantity: 2,
    };

    const validOrderData = {
      order: [existingProductOrder],
    };

    const response = await request(app)
      .post("/order/create")
      .send(validOrderData);

    expect(response.status).toBe(201);
    expect(response.body.order).toBeDefined();

    const updatedProduct = await Product.findById(existingProduct1._id);
    expect(updatedProduct.quantity).toBe(
      existingProduct1.quantity + existingProductOrder.quantity
    );
  });

  test("should return alert for products not found in the database", async () => {
    const nonExistentProductOrder = {
      productId: "64b991dc857fbafa14af6cd3",
      quantity: 1,
    };

    const validOrderData = {
      order: [nonExistentProductOrder],
    };

    const response = await request(app)
      .post("/order/create")
      .send(validOrderData);

    expect(response.status).toBe(201);
    expect(response.body.alert).toContain(
      "Some products not found in the database"
    );
  });
});
