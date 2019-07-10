'use strict';

function ForexService() {
  this.baseUrl = 'https://financialmodelingprep.com/api/v3/forex';
}

ForexService.prototype.getAPI = async function() {
  var response = await fetch(`${this.baseUrl}`);
  return await response.json(); 
}

var forexServiceInstance = new ForexService();
forexServiceInstance.getAPI();