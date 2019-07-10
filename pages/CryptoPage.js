'use strict';

function CryptoPage (parentElement) {
  this.parentElement = parentElement;
  this.elements = null;
  this.page = null;
}

CryptoPage.prototype.generate = async function() {
  this.loading = new Loading(this.parentElement);
  this.loading.generate();
  await this.connectToAPI();
  this.elements = `
    <div>
      <h1>Crypto</h1>
    </div>`;
  this.render();
}

CryptoPage.prototype.render = function() {
  this.parentElement.innerHTML = this.elements;
}

CryptoPage.prototype.connectToAPI = async function() {
  this.data = await cryptoServiceInstance.getAPI();
}