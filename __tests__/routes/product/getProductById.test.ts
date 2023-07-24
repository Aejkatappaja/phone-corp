import request from "supertest";
import app from "../../../src/index";

describe("GET /product/:id routes tests", () => {
  test("should return a specific product by ID", async () => {
    const productId = "64bed8f2687ae0df0d3675ff";
    const response = await request(app).get(`/product/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      product: {
        _id: "64bed8f2687ae0df0d3675ff",
        brand: "Samsun234234g",
        model: "iPhone XR23424",
        sku: 38934534566727,
        price: 599,
        quantity: 13,
        __v: 0,
      },
    });
  });

  test("should return 400 if id not provided", async () => {
    const response = await request(app).get("/product/");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "You need to provide an ID" });
  });

  test("should return 500 if an error occurs while fetching the product", async () => {
    const response = await request(app).get("/product/uyiuiuy");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Internal server error" });
  });

  test("should return 404 if product is not found", async () => {
    const fakeId = "64b992dd857fbafa14af6cd4";

    const response = await request(app).get(`/product/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Product not found" });
  });
});
