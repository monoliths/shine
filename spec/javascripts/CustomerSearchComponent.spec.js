var CustomerSearchComponent = require("../../webpack/CustomerSearchComponent")

// testdouble will allow us to use a generic test double library to stub Angulars HTTP library
// we basically dont want to make http calls, se we are stubing by doubling Angulars HTTP Library
var td = require("testdouble");

var component = null;

describe("CustomerSearchComponent", function(){
  describe("initial state", function() {
    it("sets customers to null", function() {
      expect(component.customers).toBe(null);
    });
    it("sets keywords to the empty string", function() {
      expect(component.keywords).toBe("");
    });
  });

  describe("search", function(){
    describe("A search for 'pa', less than three characters", function() {
      var mockHttp = null;
      beforeEach(function() {
        mockHttp = td.object(["get"]);
        component = new CustomerSearchComponent(mockHttp);
      });
      it("sets the keywords to be 'pa'", function() {
        component.search("pa");
        expect(component.keywords).toBe("pa");
      });
      it("does not make an HTTP call", function() {
        component.search("pa");
        // want to make sure a http was called 0 times (an HTTP called gets made on a valid search)
        td.verify(mockHttp.get(), { times: 0 });
      });
    });

    describe("A Search for 'pat', three or more characters", function(){
      var mockHttp = null;
      var customers = [
        {
          id: 1,
          created_at: (new Date()).toString(),
          first_name: "Pat",
          last_name: "Jones",
          username: "pj",
          email: "pjones@somewhere.net"
        },
        {
          id: 2,
          created_at: (new Date()).toString(),
          first_name: "Pat",
          last_name: "Jones",
          username: "pj",
          email: "pjones@somewhere.net"
        }
      ];
      beforeEach(function() {
        // the following mocks all HTTP calls to keep tests in isolation.
        var response = td.object(["json"]);
        td.when(response.json()).thenReturn({ customers: customers });
        mockHttp = td.object(["get"]);
        component = new CustomerSearchComponent(mockHttp);

        var observable = td.object(["subscribe"]);
        td.when(observable.subscribe (
          td.callback(response),
          td.matchers.isA(Function))).thenReturn();

          mockHttp = td.object(["get"]);
          td.when(mockHttp.get("/customers.json?keywords=pat")).thenReturn(observable);
      });
      describe("A successful search", function() {
        it("sets the keywords to be 'pat'", function() {
          component.search("pat");
          expect(component.keywords).toBe("pat");
        });
        it("sets the customers to the result of the HTTP call", function() {
          component.search("pat");
          expect(component.customers).toBe(customers)
        });
      });
      describe("A search that fails on the back-end", function(){
        it("sets the keywords to 'pat'");
        it("leaves the customers as null");
        it("alerts the user with the response message");
      });
    });
  });
  beforeEach(function(){
    component = new CustomerSearchComponent();
  });
});
