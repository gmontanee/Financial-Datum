'use strict';

function Router() {
  this.page = null;
}

Router.prototype.buildDom = function(url, parentElement) {
  switch(url) {
    case '/':
      this.generateLandingPage(parentElement);
      break;
    case '/Forex':
      this.generateForexPage(parentElement);
      break;
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

Router.prototype.generateForexPage = function(parentElement) {
  this.page = new ForexPage(parentElement);
  this.page.generate();
}

// Router.prototype.generateCryptoPage = function(parentElement) {
//   this.page = new CryptoPage(parentElement);
//   this.page.generate();
// }

var routerInstance = new Router();