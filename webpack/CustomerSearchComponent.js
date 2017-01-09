var reflectMetadata = require("reflect-metadata");
var ng = {
  core: require("@angular/core"),
  http: require("@angular/http")
}

var CustomerSearchComponent = ng.core.Component({
  selector: "shine-customer-search",
  templateUrl: 'customer-search.component.html'
}).Class({
  constructor: [
    ng.http.Http,
    function(http) {
      // keywords is the name of the bindon-ngModel
      // when a user types something in the search box, keywords will get updated
      this.keywords = "";
      this.http = http;
      this.customers = null;
    }
  ],
  search: function($event) {
    var self = this;
    self.keywords = $event;
    if (self.keywords.length < 3) {
      return;
    }
    self.http.get("/customers.json?keywords=" + self.keywords).subscribe(
      function(response) {
        self.customers = response.json().customers;
      },
      function(response) {
        window.alert(response);
      }
    );
  }
});

module.exports = CustomerSearchComponent;
