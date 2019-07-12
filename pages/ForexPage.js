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
    <button class="screenButton" id="Ordered">Ordered changes</button>
    <button class="screenButton" id="Compare">Exchange consultation</button>
    <button class="screenButton" id="Exchanges">Consultation of all exchanges</button>
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
    self.aux = self.elements;
    // self.elements = `Please select one option, there are two options which will order the gainers exchanges depending on their value` + self.elements;
    self.render();

    var selector = document.querySelector('#orderlist');
    selector.addEventListener('change', orderby)

    function orderby (elem) {
      self.elements = self.aux;
      
      if (elem === 'gainer' || elem.target.value === 'gainer') {
        var arr = self.data.forexList.filter(function(a){
          return a.changes > 0;
        });
     
        var arr = arr.sort(function(a, b){
          return b.changes - a.changes;
        });
        self.elements += `<h2>GAINERS</h2>
          <table>
            <thead>
              <tr>
                <th>Pair</th>
                <th>Price</th>
                <th>Change</th>
                <th>Change(%)</th>
              </tr>
            </thead>
            <tbody>`;
        arr.forEach(function(elem){
          self.elements += `
          <tr>
            <td>${elem.ticker}</td>
            <td>${elem.ask}</td>
            <td>${Math.round((elem.ask-elem.open)*10000)/10000}</td>
            <td>+${elem.changes}%</td>
          </tr>`;
        });
      }
      else if (elem === 'loser' || elem.target.value === 'loser') {
        var arr = self.data.forexList.filter(function(a){
          return a.changes <= 0;
        });
        var arr = arr.sort(function(a, b){
          return a.changes - b.changes;
        });
        self.elements += `<h2>LOSERS</h2>
          <table>
          <thead>
            <tr>
              <th>Pair</th>
              <th>Price</th>
              <th>Change</th>
              <th>Change(%)</th>
            </tr>
          </thead>
          <tbody>`;
        arr.forEach(function(elem){
          self.elements += `
            <tr>
            <td>${elem.ticker}</td>
            <td>${elem.ask}</td>
            <td>${Math.round((elem.ask-elem.open)*10000)/10000}</td>
            <td>${elem.changes}%</td>
            </tr>`;
          });
      }
      self.elements += `</table>`;
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
        <div class='orderedDiv'>
          <h3>${currency.ticker}</h3>
          <section class='data'>
            <article class='two-rows'>
              <div>
                <h4>Changes:</h4>
                <p>${currency.changes}</p>
                </div>
                <div>
                <h4>Open:</h4>
                <p>${currency.open}</p>
              </div>
            </article>
            <article class='two-rows'>
            <div>
            <h4>Bid:</h4>
            <p>${currency.bid}</p>
            </div>
            <div>
            <h4>Ask:</h4>
            <p>${currency.ask}</p>
            </div>
            </article>
            <article class='two-rows'>
            <div>
            <h4>High:</h4>
            <p>${currency.high}</p>
            </div>
            <div>
            <h4>Low:</h4>
            <p>${currency.low}</p>
            </div>
            </article>
            <article>
              <h4>Date:</h4>
              <p>${currency.date}</p>
            </article>            
          </section>
        </div>`;
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
          <div class='orderedDiv'>
          <h3>${currency.ticker}</h3>
          <section class='data'>
            <article class='two-rows'>
              <div>
                <h4>Changes:</h4>
                <p>${currency.changes}</p>
                </div>
                <div>
                <h4>Open:</h4>
                <p>${currency.open}</p>
              </div>
            </article>
            <article class='two-rows'>
            <div>
            <h4>Bid:</h4>
            <p>${currency.bid}</p>
            </div>
            <div>
            <h4>Ask:</h4>
            <p>${currency.ask}</p>
            </div>
            </article>
            <article class='two-rows'>
            <div>
            <h4>High:</h4>
            <p>${currency.high}</p>
            </div>
            <div>
            <h4>Low:</h4>
            <p>${currency.low}</p>
            </div>
            </article>
            <article>
              <h4>Date:</h4>
              <p>${currency.date}</p>
            </article>            
          </section>
        </div>`;
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