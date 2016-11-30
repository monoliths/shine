require ('application.css');
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
  router: require("@angular/router")
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
  var shouldBootstrap = document.getElementById("angular-test");
  if (shouldBootstrap) {
    ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AngularTestAppModule);
  }
});


var CustomerSearchComponent = ng.core.Component({
  selector: "shine-customer-search",
  templateUrl: 'customer/customer-search.component.html'
}).Class({
  constructor: function(){}
});

var CustomerSearchAppModule = ng.coreNgModule({
  imports: [ng.platformBrowser.BrowserModule, ng.forms.FormsModule ],
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
