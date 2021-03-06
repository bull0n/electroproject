/**
 * @author : Malik Fleury, Bulloni Lucas
 * @description : Class to display the content of a tab (multiple view content(diagram, member, tasks))
 */

let AbstractView = require('../../abstract-view-class.js');
let {Project, Task, Member} = require('../../data/project.js');
let DiagramView = require('../diagram-view/diagram-view.js');
let ListTasks = require('../list-tasks/list-tasks.js');
let ListMembers = require('../list-members/list-members.js');
let FileDialog = require('../file-dialog/file-dialog.js');

class TabContent extends AbstractView
{
  constructor(element, project, prefix)
  {
    super(element);
    this.project = project;
    this.prefix = prefix;
  }

  display()
  {
    let {displayView, addView, addAction, views} = require('./create-tab-functions.js');
    let project = this.project;

    views[this.prefix] = [];

    this.createBasicStructure();

    addView(this.prefix, 'Diagram', '<i class="fas fa-equals"></i>', DiagramView, project);
    addView(this.prefix, 'Tasks', '<i class="fas fa-tasks"></i>', ListTasks, project);
    addView(this.prefix, 'Team', '<i class="fas fa-users"></i>', ListMembers, project);

    addAction(this.prefix, 'Save', '<i class="fas fa-save"></i>', function() {
      // const {app} = require('electron').remote; // ??
      // let directory = app.getPath('documents');
      // FileDialog.saveAs(project, directory); // parent should be passed but can't get the global win ...
      FileDialog.save(project);
    });

    $('#'+ views[this.prefix][0].getIdButton()).click();
  }

  // create the basic structure of a tab view
  createBasicStructure()
  {
    $(this.element).html(`
      <div class="content-view">
        <div id="${this.prefix}-left-button" class="left-button"></div>
        <div id="${this.prefix}-content" class="content"></div>
      </div>
    `);
  }
}

module.exports = TabContent;
