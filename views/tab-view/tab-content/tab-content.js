let {Project, Task, Member} = require('../../../data/project.js');
let ListTasks = require('../../list-tasks/list-tasks.js');

class TabContent
{
  constructor(fileName)
  {
    this.project = new Project();

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

  createTabContent(prefix, divIdTarget)
  {
    let {displayView, addView, addAction, createBasicStructure, views} = require('./create-tab.js');

    views[prefix] = [];

    createBasicStructure(prefix, divIdTarget);

    addView(prefix, 'Diagram', '<i class="fas fa-equals"></i>', ListTasks, this.project);
    addView(prefix, 'Tasks', '<i class="fas fa-tasks"></i>', ListTasks, this.project);
    addView(prefix, 'Team', '<i class="fas fa-users"></i>', ListTasks, this.project);

    addAction(prefix, 'Save', '<i class="fas fa-save"></i>', function() { console.log('hello world'); });

    $('#'+ views[prefix][1].getIdButton()).click();
  }
}

module.exports = TabContent;
