import { IProduct } from "../../../src/types/product.type";
import { connect, disconnect } from "../../../src/jest.setup";
import Product from "../../../src/database/models/product.model";
import productService from "../../../src/database/services/product.service";

describe("Product Service Tests", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  describe("createNewProduct", () => {
    test("should create a new product", async () => {
      const productData = {
        brand: "Samsung",
        model: "iPhone XR",
        sku: 3894036727,
        price: 599.0,
        quantity: 13,
      };

      const newProduct = await productService.createNewProduct(
        productData as IProduct
      );

      expect(newProduct).toBeDefined();
      expect(newProduct.sku).toBe(productData.sku);

      const productInDb = await Product.findOne({ sku: productData.sku });
      expect(productInDb).toBeDefined();
      expect(productInDb.sku).toBe(productData.sku);
    });

    test("should return null if product with the same SKU already exists", async () => {
      const existingProductData = {
        brand: "Samsung",
        model: "iPhone XR",
        sku: 3894036727,
        price: 599.0,
        quantity: 13,
      };
      await Product.create(existingProductData);

      const duplicateProductData = {
        brand: "Samsung",
        model: "iPhone XR",
        sku: 3894036727,
        price: 599.0,
        quantity: 13,
      };

      const newProduct = await productService.createNewProduct(
        duplicateProductData as IProduct
      );

      expect(newProduct).toBeNull();
    });
  });

  describe("getAllProducts", () => {
    test("should return an array of all products", async () => {
      const productData1 = {
        brand: "Samsung",
        model: "iPhone XR",
        sku: 38940363453453543453727,
        price: 599.0,
        quantity: 13,
      };
      const productData2 = {
        brand: "Samsung",
        model: "iPhone R",
        sku: 3894036727,
        price: 599.0,
        quantity: 13,
      };
      await Product.create(productData1);
      await Product.create(productData2);

      const allProducts = await productService.getAllProducts();

      expect(allProducts).toHaveLength(2);
      expect(allProducts[0].sku).toBe(productData1.sku);
      expect(allProducts[1].sku).toBe(productData2.sku);
    });
  });

  describe("getProductId", () => {
    test("should return the product with the specified ID", async () => {
      const productData = {
        brand: "Samsung",
        model: "iPhone XR",
        sku: 3894036727,
        price: 599.0,
        quantity: 13,
      };
      const createdProduct = await Product.create(productData);

      const foundProduct = await productService.getProductId(
        createdProduct._id.toString()
      );

      expect(foundProduct).toBeDefined();
      expect(foundProduct.sku).toBe(productData.sku);
    });
  });

  describe("getTotalProductsReferences", () => {
    test("should return the total number of products in the database", async () => {
      await Product.create({
        brand: "Samsung",
        model: "iPhone XR",
        sku: 3894036727,
        price: 599.0,
        quantity: 13,
      });
      await Product.create({
        brand: "Samsungwwww",
        model: "iPhone XR",
        sku: 38940234236727,
        price: 599.0,
        quantity: 13,
      });

      const totalProducts = await productService.getTotalProductsReferences();

      expect(totalProducts).toBe(2);
    });
  });

  describe("getTotalProductsValue", () => {
    test("should return the total value of all products in the database", async () => {
      await Product.create({
        brand: "Samsung",
        model: "iPhone XR",
        sku: 3894036727,
        price: 599.0,
        quantity: 13,
      });
      await Product.create({
        brand: "Samsung",
        model: "iPhone XR",
        sku: 38942345257,
        price: 599.0,
        quantity: 13,
      });

      const totalValue = await productService.getTotalProductsValue();

      const product1 = await Product.findOne({ sku: 3894036727 });
      const product2 = await Product.findOne({ sku: 38942345257 });
      const expectedValue =
        product1.price * product1.quantity + product2.price * product2.quantity;

      expect(totalValue).toBe(expectedValue);
    });
  });

  describe("getTotalProductsQuantity", () => {
    test("should return the total quantity of all products in the database", async () => {
      await Product.create({
        brand: "Samsung",
        model: "iPhone XR",
        sku: 3894036727,
        price: 599.0,
        quantity: 13,
      });
      await Product.create({
        brand: "Samsun234234g",
        model: "iPhone XR23424",
        sku: 38934534566727,
        price: 599.0,
        quantity: 13,
      });

      const totalQuantity = await productService.getTotalProductsQuantity();

      expect(totalQuantity).toBe(13 + 13);
    });
  });
});
