import request from "supertest";
import express, { Express } from "express";
import { IProduct } from "../../../src/types/product.type";
import { createProduct } from "../../../src/controllers/product";
import productService from "../../../src/database/services/product.service";

const app: Express = express();
app.use(express.json());
app.post("/product/create", createProduct);

jest.mock("../../../src/database/services/product.service");
const mockCreateNewProduct =
  productService.createNewProduct as jest.MockedFunction<
    typeof productService.createNewProduct
  >;

describe("Product Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new product successfully", async () => {
    const productData = {
      brand: "Samsung",
      model: "iPhone XR",
      sku: 3894036727,
      price: 599.0,
      quantity: 13,
    };

    mockCreateNewProduct.mockResolvedValue(productData as IProduct);

    const response = await request(app)
      .post("/product/create")
      .send(productData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(productData);
  });

  test("should return 400 if not all required info is provided, missing sku", async () => {
    const productData = {
      brand: "Samsung",
      model: "iPhone XR",
      price: 599.0,
      quantity: 13,
    };

    const response = await request(app)
      .post("/product/create")
      .send(productData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "You need to provide all the required informations",
    });
  });

  test("should return 409 if product with the same SKU already exists", async () => {
    const productData = {
      brand: "Samsung",
      model: "iPhone XR",
      sku: 3894036727,
      price: 599.0,
      quantity: 13,
    };

    mockCreateNewProduct.mockResolvedValue(null);

    const response = await request(app)
      .post("/product/create")
      .send(productData);

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      message: "Product with the same SKU already exists",
    });
  });
});
