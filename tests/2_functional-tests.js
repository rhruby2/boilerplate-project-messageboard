const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Creating a new thread: POST request to /api/threads/{board}', function(){
    });
    test('Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}', function(){
        
    });
    test("Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password", function(){
    });
    test("Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password", function(){
        
    });
    test("Reporting a thread: PUT request to /api/threads/{board}", function(){
        
    });
    test("Creating a new reply: POST request to /api/replies/{board}",function(){
    });
    test("Viewing a single thread with all replies: GET request to /api/replies/{board}",function(){
    });
    test("Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password",function(){
    });
    test("Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password",function(){
    });
    test("Reporting a reply: PUT request to /api/replies/{board}",function(){
    });
});
