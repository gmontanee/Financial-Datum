'use strict';

function CryptoService() {
  this.baseUrl = 'https://financialmodelingprep.com/api/v3/cryptocurrencies'; 
}

CryptoService.prototype.getAPI = async function() {
  var response = await fetch(`${this.baseUrl}`);
  var data = await response.json();
}

var cryptoServiceInstance = new CryptoService();
cryptoServiceInstance.getAPI();