'use strict';

function Loading(parentElement) {
  this.parentElement = parentElement;
  this.elements = null;
}

Loading.prototype.generate = function () {
  this.element = `<h1>Hello</h1>>`;
  this.render();
}

Loading.prototype.render = function () {
  this.parentElement.innerHTML = this.element;
}