'use strict';

function Footer(parentElements, links, style) {
  this.parentElements = parentElements;
  this.links = links;
  this.style = style;
  this.elements = null;
}

Footer.prototype.generate = function() {
  this.elements = `
    <section>
      <h2>Footer</h2>
    </section>`;
  this.render();
}

Footer.prototype.render = function() {
  this.parentElements.innerHTML = this.elements;  
}