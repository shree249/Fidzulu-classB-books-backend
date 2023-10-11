let request = require("request");
let laptops = require("../dao/laptops");

 

describe("Unit tests on laptops module", () => {

    describe("load all books", () => {
        it("have ten elements", async () => {
            let results = await laptops.query_by_arg("IN");
            expect(results.length).toBe(10);
        });

    });
    describe("load laptops with taxes", () => {
        it("with location IN", async () => {
            let results = await laptops.query_by_arg("IN");
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
