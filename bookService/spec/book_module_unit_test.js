let request = require("request");
let books = require("../dao/books");


describe("Book module test", () => {
  describe("load all books", () => {
    it("should return an array of Books", async () => {
      const results =  await dvd.query_by_arg_dynamo("IN");
      expect(results).toHaveSize(10);
    });
  });

  describe("load all books with taxes", () => {
    it("with location India", async () => {
      const results = await dvd.query_by_arg_dynamo("IN");
      expect(results[0].price).toBeGreaterThanOrEqual(15866.28); // Close approximation for floating-point comparison
    });

    it("with location Ireland", async () => {
      const results = await dvd.query_by_arg_dynamo("IE");
      expect(results[0].price).toBeCloseTo(1); // Close approximation for floating-point comparison
    });

    it("with an invalid location Pakistan", async () => {
      const results =await dvd.query_by_arg_dynamo("PK");
      expect(results).toBeNull();
    });
  });

  describe("Unit tests on books module", () => {

    describe("load all books", () => {
        it("have ten elements", async () => {
            let results = await laptops.query_by_arg("IN");
            expect(results.length).toBe(10);
        });

    });
    describe("load books with taxes", () => {
        it("with location IN", async () => {
            let results = await books.query_by_arg("IN");
            expect(results[0].price).toBe(15866.28);
        });
        it("with location IRELAND", async () => {
            let results = await laptops.query_by_arg("IE");
            expect(results[0].price).toBe(189.3);
        });
        it("with invalid location China",async  () => {
            expect( () => {
                laptops.query_by_arg("China");
                expect(results).toBeNull();
            })
        });

    }
    )
});
});
 


