// Imports for all the program
var $ = require("jquery");
require("bootstrap");
var {refreshTabContent} = require('./views/tab-content/create-tab-functions.js')

$(document).ready(function()
{
  let Modal = require('./views/modal/modal.js');
  Modal.display($('#modal-container'));

/*
  let TabView = require('./views/tab-view/tab-view.js');
  let tabView = new TabView($('#content-container'));
  let Project = require('./data/project.js').Project;
  let SerializerTool = require('./tools/serializertool.js');

  let revive = function(object)
  {
    let projectObject = new Project();
    projectObject.name = object.name;
    projectObject.filename = object.filename;
    projectObject.team = object.team;
    projectObject.tasks = object.tasks;

    for(let i = 0;i < projectObject.tasks.length; i++)
    {
      let task = projectObject.tasks[i];
      task.from = new Date(task.from);
      task.to = new Date(task.to);
    }

    return projectObject;
  };

  let project = SerializerTool.unserializeFromFile("/home/malik/Documents/test/myfile2", revive);

  tabView.display();
  tabView.createTab(project);
*/

  let Home = require('./views/home/home.js');
  let home = new Home($('#content-container'));

  home.display();
});
