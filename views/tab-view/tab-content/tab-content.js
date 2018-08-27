let {Project, Task, Member} = require('../../../data/project.js');
let ListTasks = require('../../list-tasks/list-tasks.js');

class TabContent
{
  constructor(fileName)
  {
    this.project = new Project();
  }

  createTabContent(prefix, divIdTarget)
  {
    let {displayView, addView, addAction, createBasicStructure, views} = require('./create-tab.js');

    views[prefix] = [];

    createBasicStructure(prefix, divIdTarget);

    let listTasks = new ListTasks(this.project);

    addView(prefix, 'Diagram', '<i class="fas fa-equals"></i>', '');
    addView(prefix, 'Tasks', '<i class="fas fa-tasks"></i>', listTasks.getView());
    addView(prefix, 'Team', '<i class="fas fa-users"></i>', '');

    addAction(prefix, 'Save', '<i class="fas fa-save"></i>', function() { console.log('hello world'); });

    $('#'+ views[prefix][1].getIdButton()).click();
  }
}

module.exports = TabContent;
