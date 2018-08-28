// Imports for all the program
var $ = require("jquery");
require("bootstrap");


$(document).ready(function()
{
  let ConfirmModal = require('./views/confirm-modal/confirm-modal.js');
  ConfirmModal.display($('#modal-container'));

  let TabView = require('./views/tab-view/tab-view.js');
  let tabView = new TabView($('#content-container'));

  tabView.display();
});
