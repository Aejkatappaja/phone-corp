import request from "supertest";
import app from "../../../src/index";
import orderService from "../../../src/database/services/order.service";

describe("GET /order/history route tests", () => {
  test("should return order data", async () => {
    const response = await request(app).get("/order/history");

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("orders");
    expect(Array.isArray(response.body.orders)).toBe(true);
    expect(response.body).toHaveProperty("Total orders passed");
    expect(typeof response.body["Total orders passed"]).toBe("number");
  });

  test("should return 500 if an error occurs", async () => {
    jest
      .spyOn(orderService, "getAllOrders")
      .mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/order/history");

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error", "Database error");
  });
});
