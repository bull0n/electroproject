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
const FilesHistory = require('./files-history.js');
const Home = require('./views/home/home.js');

$(document).ready(function()
{
  // Init. the top menu
  TopMenu.getInstance();


  Modal.display($('#modal-container'));

  let home = new Home($('#content-container'));
  home.display();
  if(FilesHistory.getInstance().getTabHistory().length === 0)
  {
    console.log('test');
  }


});
