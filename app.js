'use strict';

function main () {
  var ENTRY_POINT = '/';
  var layoutInstance = null;
  var navbarInstance = null;
  var rootElement = document.querySelector('#root');
  var links = [
    {name: 'Home', 
      url:'/'},
    {name: 'Forex',
      url: '/Forex'},
    {name: 'Cryptocurrency', 
      url: '/Crypto'}];
    
    generateLayout();
    generateNavBar();
    addListenerToNavbar();
    activateRouter();

    function generateLayout() {
      layoutInstance = new Layout(rootElement);
      layoutInstance.generate();
    }

    function generateNavBar() {
      navbarInstance = new Navbar(layoutInstance.header, links);
      navbarInstance.generate();
    }

    function addListenerToNavbar() {
      var anchors = document.querySelectorAll('nav a');
      anchors.forEach(function(anchore) {
        anchore.addEventListener('clik', changePage);
      });
    }

    function activateRouter() {
      routerInstance.buildDom(ENTRY_POINT, layoutInstance.main);
    }
}
window.addEventListener('load', main);