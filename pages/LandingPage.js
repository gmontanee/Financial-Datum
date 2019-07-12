'use strict';

function LandingPage(parentElement) {
  this.parentElement = parentElement;
  this.elements = null;
  this.data = null;
}

LandingPage.prototype.generate = function() {
  this.elements = `
    <header>
      <h1 class='animation-title'>Financial Datum</h1>
      <h2 class='animation-text'>This is a website where you can consult basic information about forex, such as those of EUR USD GBP JPY CHF CAD AUD NZD SEK SEK</h2>
    </header>`;
  this.render();
}

LandingPage.prototype.render = function() {
  this.parentElement.innerHTML = this.elements;
}
