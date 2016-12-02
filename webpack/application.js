require('application.css');
require('bootstrap/dist/css/bootstrap.css');

var coreJS = require('core-js');
var zoneJS = require('zone.js');
var reflectMetadata = require('reflect-metadata');

var ng = {
  core: require("@angular/core"),
  common: require("@angular/common"),
  compiler: require("@angular/compiler"),
  forms: require("@angular/forms"),
  platformBrowser: require("@angular/platform-browser"),
  platformBrowserDynamic: require("@angular/platform-browser-dynamic"),
  router: require("@angular/router"),
  http: require("@angular/http")
}

var AngularTestComponent = ng.core.Component({
    selector: "shine-angular-test",
    template:'\
    <h2 *ngIf="name">Hello {{name}}!</h2> \
    <form> \
      <div class="form-group"> \
        <label for="name">Name</label> \
        <input type="text" id="name" class="form-control" name="name" \
                bindon-ngModel="name"> \
      </div> \
    </form> \
    '

}).Class({
  constructor: function() {
    this.name = null;
  }
});

var AngularTestAppModule = ng.core.NgModule({
  imports: [ ng.platformBrowser.BrowserModule, ng.forms.FormsModule ],
  declarations: [ AngularTestComponent ],
  bootstrap: [ AngularTestComponent ]
}).Class({
  constructor: function() {}
});

document.addEventListener('DOMContentLoaded', function() {
  var shouldBootstrap = document.getElementById("shine-angular-test");
  if (shouldBootstrap) {
    ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AngularTestAppModule);
  }
});

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
        alert(response);
      }
    );
  }
});

var CustomerSearchAppModule = ng.core.NgModule({
  imports: [
    ng.platformBrowser.BrowserModule,
    ng.forms.FormsModule,
    ng.http.HttpModule
  ],
  declarations: [ CustomerSearchComponent ],
  bootstrap: [ CustomerSearchComponent ]
}).Class({
  constructor: function() {}
});

document.addEventListener('DOMContentLoaded', function() {
  var shouldBootstrap = document.getElementById("shine-customer-search")
  if (shouldBootstrap) {
    ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(CustomerSearchAppModule);
  }
});
