// Imports for all the program
window.electron = require('electron').remote;
window.$ = window.jquery = require('jquery');
require("bootstrap");

// Get the specific classes from electron
const app = window.electron.app;
const Menu = window.electron.Menu;
const BrowserWindow = window.electron.BrowserWindow;

// Get the classes of the main components
var {refreshTabContent} = require('./views/tab-content/create-tab-functions.js')
const TopMenu = require('./top-menu.js');
const TabView = require('./views/tab-view/tab-view.js');
const Modal = require('./views/modal/modal.js');

$(document).ready(function()
{
  // Init. the top menu
  TopMenu.getInstance();

  let Modal = require('./views/modal/modal.js');
  Modal.display($('#modal-container'));

  let Home = require('./views/home/home.js');
  let home = new Home($('#content-container'));

  home.display();
});
