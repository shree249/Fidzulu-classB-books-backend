const request = require('request');
const app = require('../index');
var http = require('http');

const base_url = 'http://localhost:3004/';
const books_url = base_url + 'books/IN';
const not_found_url = base_url + 'books/';

app.set('port', 3004);

describe("Books Server E2E Test", function () {
    let server;
    
    beforeAll(() => {
        server = http.createServer(app);
        server.listen(3004);
    });
    afterAll((done) => {
        
      server.close(done); // Shutdown the server after tests are complete
    });
    describe("GET /books/IN", () => {
        it("returns status code 200",  (done) => {
            request.get(books_url, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contains price", (done) => {
            request.get(books_url, (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("price");
                expect(body).toContain("productName");
                done();
            });
        });
    });
    // test for wrong path and expect 404
    describe("GET /books/", () => {
        it("returns status code 404",  (done) => {
            request.get(not_found_url, (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });

    describe("GET with localhost:3034", () => {
        it("returns status code 404",  (done) => {
            request.get(base_url, (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
    describe("GET /books/Pakistan", () => {
        it("returns status code 404",  (done) => {
            request.get(not_found_url + "China", (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
});