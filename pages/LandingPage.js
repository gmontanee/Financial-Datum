'use strict';

function LandingPage(parentElement) {
  this.parentElement = parentElement;
  this.elements = null;
  this.data = null;
}

LandingPage.prototype.generate = function() {
  this.elements = `
    <header>
      <h1>Financial Datum</h1>
      <h2>Here you can find some information of Forex and Cryptocurrency</h2>
    </header>`;
  this.render();
}

LandingPage.prototype.render = function() {
  this.parentElement.innerHTML = this.elements;
}