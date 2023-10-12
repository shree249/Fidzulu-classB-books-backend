const request = require('request');
const app = require('../index');
var http = require('http');

// Mock your route dependencies

const base_url = 'http://localhost:3001/';
const books_url = base_url + 'books/all/IN';
const not_found_url = base_url + 'books/';

app.set('port', 3001);

describe("Books server  endpoint tests", function () {
    let server;

    beforeAll(() => {
        server = http.createServer(app);
        server.listen(3001);
    });
  
    afterAll((done) => {
        
      server.close(done); // Shutdown the server after tests are complete
    });
    
    describe("GET /books/all/IN", () => {
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
                done();
            });
        });
    });
    // test for wrong path and expect 404
    describe("GET /books/all", () => {
        it("returns status code 404",  (done) => {
            request.get(not_found_url, (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
    describe("GET /books/China", () => {
        it("returns status code 404",  (done) => {
            request.get(not_found_url + "China", (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
});