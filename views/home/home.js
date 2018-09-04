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

<<<<<<< HEAD
    $('#btn-new-project').click(topMenu.newProject);
    $('#btn-open-project').click(topMenu.openProject);
    $('#btn-quit-app').click(topMenu.quitApp);
=======
    $('#btn-new-project').click({source:this}, newProjectClickEvent);
    $('#btn-open-project').click({source:this}, openProjectClickEvent);
    $('#btn-quit-app').click({source:this}, quitAppClickEvent);
  }

  newProject(event)
  {
    let tabView = new TabView($('#content-container'));
    let project = new Project();
    let Modal = require('../modal/modal.js');
    let source = event.data.source;

    Modal.show('New project', source.getHTMLProjectNameForm(), function()
    {
      let tabView = new TabView($('#content-container'));

      project.name = $('#txt_project_name').val();

      source.display();
      tabView.display();
      tabView.createTab(project);
    });
  }

  openProject(event)
  {
    const {app, BrowserWindow} = require('electron').remote;

    let directory = app.getPath('documents');
    let project = FileDialog.open(directory, BrowserWindow.getFocusedWindow());
    let tabView = new TabView($('#content-container'));

    tabView.display();
    tabView.createTab(project);
  }

  quitApp(event)
  {
    const {app} = require('electron').remote;
    app.quit();
  }

  getHTMLProjectNameForm()
  {
    let htmlText = `
    <div class="form-group">
      <label for="txt_name">Name</label>
      <input type="text" id="txt_project_name" name="name" value="${name}" class="form-control" placeholder="name">
    </div>
    `;

    return htmlText;
>>>>>>> diagram-view
  }
}

module.exports = Home;
