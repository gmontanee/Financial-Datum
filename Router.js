'use strict';

function Router() {
  this.page = null;
}

Router.prototype.buildDom = function(url, parentElement) {
  switch(url) {
    case '/':
      this.generateLandingPage(parentElement);
      break;
    // case '/Forex':
    //   this.generateForexPage(parentElement);
    //   break;
    // case '/Crypto':
    //   this.generateCryptoPage(parentElement);
    //   break;
    default:
        this.generateLandingPage(parentElement);
  } 
}

Router.prototype.generateLandingPage = function(parentElement) {
  this.page = new LandingPage(parentElement);
  this.page.generate();
}

// Router.prototype. = function() {}
// Router.prototype. = function() {}

var routerInstance = new Router();