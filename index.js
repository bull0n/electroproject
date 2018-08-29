// Imports for all the program
var $ = require("jquery");
require("bootstrap");


$(document).ready(function()
{
  let Modal = require('./views/modal/modal.js');
  Modal.display($('#modal-container'));

  let TabView = require('./views/tab-view/tab-view.js');
  let tabView = new TabView($('#content-container'));

  tabView.display();
});
