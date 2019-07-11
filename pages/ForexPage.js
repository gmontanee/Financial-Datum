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

  var self = this;
  var orderedButton = document.querySelector('#Ordered');
  orderedButton.addEventListener('click',() => {
    orderedFunc(self);
  });
  var compareButton = document.querySelector('#Compare');
  compareButton.addEventListener('click',() => {
    compareFunc(self);
  });
  var allExchangesButton = document.querySelector('#Exchanges');
  allExchangesButton.addEventListener('click',() => {
    allExchangesFunc(self);
  });
  
  function orderedFunc(self) {
    self.elements = `
      <select id="orderlist">
        <option class="option">Please select</option>
        <option class="option" value="gainer">Gainers</option>
        <option class="option" value="loser">Losers</option>
      </select>`;
    self.render();
    self.aux = self.elements;

    var selector = document.querySelector('#orderlist');
    selector.addEventListener('change', orderby)

    function orderby (elem) {
      console.log(elem.target.chi)

      self.elements = self.aux;
      
      if (elem === 'gainer' || elem.target.value === 'gainer') {
        self.selected = 1;
        var arr = self.data.forexList.filter(function(a){
          return a.changes > 0;
        });
     
        var arr = arr.sort(function(a, b){
          return b.changes - a.changes;
        });
        arr.forEach(function(elem){
          self.elements += `
          <h3>${elem.ticker}</h3>
          <p><h4>Changes:</h4> ${elem.changes}</p>`;
        });
      }
      else if (elem === 'loser' || elem.target.value === 'loser') {
        self.selected = 2;
        var arr = self.data.forexList.filter(function(a){
          return a.changes <= 0;
        });
        var arr = arr.sort(function(a, b){
          return a.changes - b.changes;
        });
        arr.forEach(function(elem){
          self.elements += `
            <h3>${elem.ticker}</h3>
            <p><h4>Changes:</h4> ${elem.changes}</p>`;
        });
      } else {
        self.selected = 0;
      }
      self.render();
      var selector = document.querySelector('select');
      selector.addEventListener('change', orderby);
    }
  }

  function compareFunc(self) {
    self.elements = `
    <select id="forexlist1">
      <option class="option">Please select</option>`;

    self.data.forexList.forEach((currency) => {
      self.info = `
        <h3>${currency.ticker}</h3>
          <p><h4>Changes:</h4> ${currency.changes}</p>
          <p><h4>Bid:</h4> ${currency.bid}</p>
          <p><h4>Ask:</h4> ${currency.ask}</p>
          <p><h4>High:</h4> ${currency.high}</p>
          <p><h4>Low:</h4> ${currency.low}</p>
          <p><h4>Open:</h4> ${currency.open}</p>
          <p><h4>Date:</h4> ${currency.date}</p>`;
      self.elements += `
          <option value="${self.info}">${currency.ticker}</option>`;
    });
    self.elements += `
      </select>`;

    self.render();
    self.aux = self.elements;

    var selector = document.querySelector('#forexlist1');
    selector.addEventListener('change', printValue)

    function printValue(e) {
      console.log(e.target.value);
      self.elements = self.aux;
      self.elements += `${e.target.value}`;
      self.render();
      var selector = document.querySelector('#forexlist1');
      selector.addEventListener('change', printValue);
    }
  }
  function allExchangesFunc(self) {
    self.elements = `
      <input type="text" id="Currency" placeholder="Introduce currency" />
      <button class="search">Search</button>`;
    self.render();
    var currencyInput = document.querySelector('#Currency');
    var searchButton = document.querySelector('.search');
    searchfunc(currencyInput);
    
    function searchfunc(currencyInput) {
      var arrayCurrency = findexchanges(currencyInput.value);
      if(!(currencyInput.value === "")) {
        self.elements = self.aux;
        arrayCurrency.forEach(function(currency) {
          self.elements += `
          <h3>${currency.ticker}</h3>
          <p><h4>Changes:</h4> ${currency.changes}</p>
          <p><h4>Bid:</h4> ${currency.bid}</p>
          <p><h4>Ask:</h4> ${currency.ask}</p>
          <p><h4>High:</h4> ${currency.high}</p>
          <p><h4>Low:</h4> ${currency.low}</p>
          <p><h4>Open:</h4> ${currency.open}</p>
          <p><h4>Date:</h4> ${currency.date}</p>`;
        });
        self.render();;
      }
      var searchButton = document.querySelector('.search');
      var currencyInput = document.querySelector('#Currency');
      searchButton.addEventListener('click', function(){searchfunc(currencyInput)});
    }
    self.aux = self.elements;
    searchButton.addEventListener('click', function(){searchfunc(currencyInput)});
    
    function findexchanges(currency) {
      console.log(self.data);
      if(!currency) return; 
      var currencyUpper = currency.toUpperCase();
      var listOfCurrencis = self.data.forexList.filter(function(element){
        return element.ticker.includes(currencyUpper);
      });
      return listOfCurrencis;
    }
  }
}

ForexPage.prototype.render = function() {
  this.parentElement.innerHTML = this.elements; 
}

ForexPage.prototype.connectToAPI = async function() {
  this.data = await forexServiceInstance.getAPI();
}