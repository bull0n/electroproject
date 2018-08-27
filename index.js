// Imports for all the program
var $ = require("jquery");
require("bootstrap");

$(document).ready(function()
{
  let TabView = require('./views/tab-view/tab-view.js');
  let tabView = new TabView($('body'));
  tabView.display();
});
