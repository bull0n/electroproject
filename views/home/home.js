let SerializerTool = require('../../tools/serializertool.js');
let AbstractView = require("../../abstract-view-class.js");
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
    let topMenu = TopMenu.getInstance();

    let newProjectClickEvent = this.newProject;
    let openProjectClickEvent = this.openProject;
    let quitAppClickEvent = this.quitApp;

    $('#btn-new-project').click(topMenu.newProject);
    $('#btn-open-project').click(topMenu.openProject);
    $('#btn-quit-app').click(topMenu.quitApp);
  }
}

module.exports = Home;
