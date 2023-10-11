let request = require("request");
let books = require("../dao/book");

describe("book module test", () => {
    describe("load all books", () => {
    
        it("have ten elements", async () => {
            let results = await books.query_by_arg("IN");
            expect(results.length).toBeGreaterThan(0);
            expect(results[0].price).toBeGreaterThan(-1);
            expect(results[0].price.toString()).toMatch(/^\d+\.\d{2}$/);
        });
        
    });
    describe("load all books with taxes", () => {
     
        it("with location India", async () => {
            let results = await books.query_by_arg("IN");
            expect(results[0].price).toBeGreaterThan(-1);
            expect(results[0].price.toString()).toMatch(/^\d+\.\d{2}$/);
        });
     
        it("with location IR", async () => {
            let results = await books.query_by_arg("IR");
            expect(results[0].price).toBeGreaterThan(-1);
            expect(results[0].price.toString()).toMatch(/^\d+\.\d{2}$/);
        });
     
        it("with invalid location Pakistan", async () => {
            let results = await books.query_by_arg("Pakistan");
            expect(results).toBeNull();
        });
       
    });

});