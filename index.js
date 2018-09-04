// Imports for all the program
window.electron = require('electron').remote;
window.$ = window.jquery = require('jquery');
require("bootstrap");
const fs = require('fs');

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

TopMenu.getInstance();

try
{
  FilesHistory.getInstance().load();
}
catch (exception)
{
  console.log("No history !");
}

$(document).ready(function()
{
  Modal.display($('#modal-container'));

  if(FilesHistory.getInstance().getTabHistory().length === 0)
  {
    let home = new Home($('#content-container'));
    home.display();
  }
  else
  {
    TabView.getInstance().display();
    let tabHistory = FilesHistory.getInstance().getTabHistory();

    for(let i = 0; i < tabHistory.length; i++)
    {
      if(fs.existsSync(tabHistory[i]))
      {
        TopMenu.getInstance().openProject(tabHistory[i]);
      }
      else
      {
        tabHistory.splice(i, 1);
        i--;
      }
    }
  }
});
