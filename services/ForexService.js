'use strict';

function ForexService() {
  this.baseUrl = 'https://financialmodelingprep.com/api/v3/forex';
}

ForexService.prototype.getAPI = async function() {
  var response = await fetch(`${this.baseUrl}`);
  var data = await response.json(); 
  data.forexList.forEach(function (elem) {
    elem.changes = Math.round(elem.changes*1000)/1000;
  });
  return data;
}

var forexServiceInstance = new ForexService();
forexServiceInstance.getAPI();