import request from "supertest";
import app from "../../../src/index";

describe("Product Service Tests", () => {
  test("should return product data", async () => {
    const response = await request(app).get("/product/stock");

    expect(response.status).toBe(200);
  });

  test("should return 500 if an error occurs", async () => {
    jest
      .spyOn(
        require("../../../src/database/utils/product.utils"),
        "getProductData"
      )
      .mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/product/stock");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Database error" });
  });
});
