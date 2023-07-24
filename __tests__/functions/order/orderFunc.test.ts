import productService from "../../../src/database/services/product.service";
import { connect, disconnect } from "../../../src/jest.setup";

describe("Orders Service Tests", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    // await Product.deleteMany({});
  });
});
