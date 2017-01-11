//This file is the top layer Component the rest of the angular app components will sit inside.
var ng = {
  core: require("@angular/core")
};
var AppComponent = ng.core.Component({
  selector: "shine-customers-app",
  template: "<router-outlet></router-outlet>"
}).Class({
  constructor: [
    function() {
    }
  ]
});
module.exports = AppComponent;
