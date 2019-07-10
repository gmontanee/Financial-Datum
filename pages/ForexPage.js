'use strict';

function ForexPage (parentElement) {
  this.parentElement = parentElement;
  this.elements = null;
  this.data = null;
  this.loading = null;
  this.info = null;
  this.aux = null;
}

ForexPage.prototype.generate = async function() {
  this.loading = new Loading(this.parentElement);
  this.loading.generate();
  await this.connectToAPI();
  this.elements = `
    <button id="Ordered">Ordered</button>
    <button id="Compare">Compare</button>
    <button id="Exchanges">All exchanges of currency</button>
    `
  this.render();

  var orderedButton = document.querySelector('#Compare')
  var self = this;
  orderedButton.addEventListener('click',() => {
    orderedFunc(self)
  });
  // var compareButton = document.querySelector('#Compare')
  // compareButton.addEventListener('click',compareFunc);
  // var allExchangesButton = document.querySelector('#Compare')
  // allExchangesButton.addEventListener('click',allExchangesFunc);
  

  function orderedFunc(self) {
    self.elements = `
    <select id="forexlist">`;
    console.log(self.data);
    self.data.forexList.forEach((currency) => {
    self.info = `
        <h3>${currency.ticker}</h3>
        <p><h4>Bid:</h4> ${currency.bid}</p>
        <p><h4>Ask:</h4> ${currency.ask}</p>
        <p><h4>Open:</h4> ${currency.open}</p>
        <p><h4>Low:</h4> ${currency.low}</p>`;
    self.elements += `
      <option value="${self.info}">${currency.ticker}
      </option>`;
    });
    self.elements += `
    </select>`;

    self.render();
    self.aux = self.elements;

    window.addEventListener('change', function(e){printValue(e)});


    function printValue(e) {
      self.elements = self.aux;
      console.log(e.target.value);
      self.elements += `${e.target.value}`;
      self.render();
    }
  }
}

ForexPage.prototype.render = function() {
  this.parentElement.innerHTML = this.elements; 
}

ForexPage.prototype.connectToAPI = async function() {
  this.data = await forexServiceInstance.getAPI();
}