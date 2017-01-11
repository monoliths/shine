var reflectMetadata = require("reflect-metadata");
var ng = {
  core: require("@angular/core")
};

var CustomerDetailsComponent = ng.core.Component({
  selector: "shine-customer-details",
  template: require("./CustomerDetailsComponent.html")
}).Class({
  constructor: [
    function() {
    }
  ]
});

module.exports = CustomerDetailsComponent;
