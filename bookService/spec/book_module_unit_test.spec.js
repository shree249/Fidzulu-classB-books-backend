let request = require("request");
let books = require("../dao/books");

describe("Unit tests on books module", () => {
    
    describe("load books with taxes", () => {
        it("with location India", async () => {
            let results =await books.query_by_arg("IN");
            expect(results.length).toBeGreaterThan(0);
            expect(results[0].price).toBeGreaterThan(-1);
            expect(results[0].price.toString()).toMatch(/^\d+\.\d{2}$/);
        });
        it("with location Ireland",async () => {
            let results = await books.query_by_arg("IE");
            expect(results[0].price).toBeGreaterThan(-1);
            expect(results[0].price.toString()).toMatch(/^\d+\.\d{1,2}$/);


        });
        it("with invalid location China", () => {
            expect( () => {
                books.getBooks("China");
                expect(results).toBeNull();
            })
        });
       
    });

});