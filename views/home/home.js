/*
$('#btn-new-diagram, #btn-open-diagram').click(function()
{
  $('body').load('views/tab-view/tab-view.html');
})
*/

let AbstractView = require("../../abstract-view-class.js");
let FileDialog = require("../file-dialog/file-dialog.js");
let TabView = require('../tab-view/tab-view.js');
let Project = require('../../data/project.js').Project;

class Home extends AbstractView
{
  constructor(element)
  {
    super(element);
  }

  display()
  {
    let htmlText = `
    <link rel="stylesheet" type="text/css" href="views/home/home.css">
    <div id="div-main-menu">
      <button class="btn btn-primary btn-main-menu" id="btn-new-project">New</button>
      <button class="btn btn-primary btn-main-menu" id="btn-open-project">Open</button>
      <button class="btn btn-primary btn-main-menu" id="btn-quit-app">Quit</button>
    </div>
    `;

    $(this.element).html(htmlText);
    this.addEvent();
  }

  addEvent()
  {
    let currentClass = this;

    let newProjectClickEvent = function(event)
    {
      // Open an empty project directly or open the save dialog ?
    };

    let openProjectClickEvent = this.openProject;

    let quitAppClickEvent = this.quitApp;

    $('#btn-new-project').click(newProjectClickEvent);
    $('#btn-open-project').click(openProjectClickEvent);
    $('#btn-quit-app').click(quitAppClickEvent);
  }

  newProject()
  {
    let tabView = new TabView($('#content-container'));

    tabView.display();
    tabView.createTab(new Project());
  }

  openProject()
  {
    const {app} = require('electron').remote;

    let directory = app.getPath('documents');
    let project = FileDialog.open(directory);
    let tabView = new TabView($('#content-container'));

    tabView.display();
    tabView.createTab(project);
  }

  quitApp()
  {
    const {app} = require('electron').remote;
    app.quit();
  }
}

module.exports = Home;
