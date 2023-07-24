import request from "supertest";
import app from "../../../src/index";
import Product from "../../../src/database/models/product.model";

describe("POST /order/create routes test", () => {
  test("should create a new order and return 201 status with correct data", async () => {
    const validOrderData = {
      order: [
        { productId: "64bed8f2687ae0df0d3675ff", quantity: 2 },
        { productId: "64bed8f2687ae0df0d3675fd", quantity: 2 },
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

  test("should return 400 status and error message if the order data is invalid", async () => {
    const response = await request(app)
      .post("/order/create")
      .send({ order: [] })
      .expect(400);

    expect(response.body.message).toBe("Invalid order data");
  });

  test("should return 400 status and error message if all order quantities are 0", async () => {
    const response = await request(app)
      .post("/order/create")
      .send({
        order: [
          { productId: "product_id_1", quantity: 0 },
          { productId: "product_id_2", quantity: 0 },
        ],
      })
      .expect(400);

    expect(response.body.message).toBe("Invalid order data");
  });
});
