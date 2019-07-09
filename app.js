'use strict';

function main () {
  async function test() {
    var response = await fetch('https://financialmodelingprep.com/api/v3/forex')
    var data = await response.json();
    console.log(data);
  }
  async function test1() {
    var response = await fetch('https://financialmodelingprep.com/api/v3/cryptocurrencies')
    var data = await response.json();
    console.log(data);
  }
  test();
  test1();
}
window.addEventListener('load', main);