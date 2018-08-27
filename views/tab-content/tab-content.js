let AbstractView = require('../../abstract-view-class.js');
let {Project, Task, Member} = require('../../data/project.js');
let ListTasks = require('../list-tasks/list-tasks.js');

class TabContent extends AbstractView
{
  constructor(element, fileName, prefix)
  {
    super(element);
    this.project = new Project();
    this.prefix = prefix;

    this.project = {
      name : 'test',
      filename : '/home/lucas/blabla',
      team : [
        {
          name: 'Lucas',
          color: 'black',
        },
        {
          name: 'Malik',
          color: 'Red',
        }
      ],
      tasks : [
        {
          name : 'tâche 1',
          from : new Date(),
          to : new Date(),
          inCharge : {
            name: 'Lucas',
            color: 'black'
          },
          workingOn : [
            {
              name: 'Lucas',
              color: 'black',
            },
            {
              name: 'Malik',
              color: 'Red',
            }
          ],
          finished : true
        },
        {
          name : 'tâche 2',
          from : new Date(),
          to : new Date(),
          inCharge : {
            name: 'Lucas',
            color: 'black'
          },
          workingOn : [
            {
              name: 'Lucas',
              color: 'black',
            },
            {
              name: 'Malik',
              color: 'Red',
            }
          ],
          finished : false
        }
      ]
    }
  }

  display()
  {
    let {displayView, addView, addAction, views} = require('./create-tab-functions.js');

    views[this.prefix] = [];

    this.createBasicStructure();

    addView(this.prefix, 'Diagram', '<i class="fas fa-equals"></i>', ListTasks, this.project);
    addView(this.prefix, 'Tasks', '<i class="fas fa-tasks"></i>', ListTasks, this.project);
    addView(this.prefix, 'Team', '<i class="fas fa-users"></i>', ListTasks, this.project);

    addAction(this.prefix, 'Save', '<i class="fas fa-save"></i>', function() { console.log('hello world'); });

    $('#'+ views[this.prefix][1].getIdButton()).click();
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
