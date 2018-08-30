let AbstractView = require('../../abstract-view-class.js');
let {Project, Task, Member} = require('../../data/project.js');
let DiagramView = require('../diagram-view/diagram-view.js');
let ListTasks = require('../list-tasks/list-tasks.js');
let ListMembers = require('../list-members/list-members.js');

class TabContent extends AbstractView
{
  constructor(element, fileName, prefix)
  {
    super(element);
    this.project = new Project();
    this.prefix = prefix;

    let lucas = new Member();
    lucas.name = 'lucas';
    lucas.color = 'black';

    let malik = new Member();
    malik.name = 'malik';
    malik.color = 'red';

    let task1 = new Task();
    task1.name = 'task1';
    task1.from = new Date('08-04-2018');
    task1.to = new Date();
    task1.inCharge = lucas;
    task1.workingOn = [lucas, malik];
    task1.finished = false;

    let task2 = new Task();
    task2.name = 'task2';
    task2.from = new Date();
    task2.to = new Date();
    task2.inCharge = malik;
    task2.workingOn = [lucas, malik];
    task2.finished = true;

    let task3 = new Task();
    task3.name = 'task3';
    task3.from = new Date();
    task3.to = new Date();
    task3.inCharge = lucas;
    task3.workingOn = [lucas, malik];
    task3.finished = true;

    this.project.name = 'projet de la mort'
    this.project.team = [lucas, malik];
    this.project.tasks = [task1, task2, task3];

  }

  display()
  {
    let {displayView, addView, addAction, views} = require('./create-tab-functions.js');

    views[this.prefix] = [];

    this.createBasicStructure();

    addView(this.prefix, 'Diagram', '<i class="fas fa-equals"></i>', DiagramView, this.project);
    addView(this.prefix, 'Tasks', '<i class="fas fa-tasks"></i>', ListTasks, this.project);
    addView(this.prefix, 'Team', '<i class="fas fa-users"></i>', ListMembers, this.project);

    addAction(this.prefix, 'Save', '<i class="fas fa-save"></i>', function() { console.log('hello world'); });

    $('#'+ views[this.prefix][0].getIdButton()).click();
  }

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
