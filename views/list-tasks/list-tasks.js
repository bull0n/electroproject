/**
 * @author : Malik Fleury, Bulloni Lucas
 * @description : Class to display a list of tasks with basics actions (add/edit/delete)
 */

let AbstractTabContentView = require('../../abstract-tab-content-view.js');
let {Project, Task, Member} = require('../../data/project.js');

class ListTasks extends AbstractTabContentView
{
  constructor(element, project, prefix, icon)
  {
    super(element, project, prefix, icon);
    this.project = project
    this.listTasks = this.project.tasks;
    this.prefix = prefix;
  }

  display()
  {
    let htmlText = `
      <h3>Tasks</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">In charge</th>
            <th scope="col">Assigned</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Finished ?</th>
            <th scope="col" class="action-container-task">Controls</th>
          </tr>
        </thead>
        <tbody>
          ${this.getHTMLLists()}
        </tbody>
      </table>
      <div class="action-btn-list-tasks">
        <button type="button" id="${this.prefix}-add-task" class="btn btn-primary">
          <i class="fas fa-plus"></i> Add a task
        </button>
      </div>
    `;

    $('#'+this.getIdContentDiv()).html(htmlText);
    this.addEvent();
  }

  getHTMLLists()
  {
    let htmlText = '';
    for(let i = 0; i < this.listTasks.length; i++)
    {
      let task = this.listTasks[i];
      let peopleAssigned = '';

      for(let i = 0; i < task.workingOn.length; i++)
      {
        peopleAssigned += task.workingOn[i].name;

        if(i < task.workingOn.length - 1)
        {
          peopleAssigned += ', ';
        }
      }

      htmlText += `<tr>
        <th scope="row">${task.name}</th>
        <td>${task.inCharge !== undefined ? task.inCharge.name : ''}</td>
        <td>${peopleAssigned}</td>
        <td>${task.from.toLocaleDateString()}</td>
        <td>${task.to.toLocaleDateString()}</td>
        <td>
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" ${task.finished ? 'checked' : ''} disabled>
            <label class="custom-control-label" for="customCheckDisabled">Finished</label>
          </div>
        </td>
        <td class="action-container-task">
          <button class="btn btn-link btn-action-task ${this.prefix}-edit" data-task-index="${i}"><i class="fas fa-edit"></i></button>
          <button class="btn btn-link btn-action-task ${this.prefix}-delete" data-task-index="${i}"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`;
    }

    return htmlText;
  }

  addEvent()
  {
    let project = this.project;
    let taskView = this;

    let clickDeleteEvent = function(event)
    {
      let Modal = require('../modal/modal.js');

      let iTask = $(event.currentTarget).attr('data-task-index');

      Modal.show('Confirmation needed', `
        <p>Do you really want to delete this tasks?<p>
        <strong>${project.tasks[iTask].name}</strong>
      `, () =>
      {

        project.tasks.splice(iTask, 1);
        refreshTabContent(taskView.prefix);
      });
    }

    $('.'+this.prefix+'-delete').click(clickDeleteEvent);

    let clickAddEditEvent = function(event)
    {
      let Modal = require('../modal/modal.js');
      let FormTask = require('../form-task/form-task.js');

      let formTask = undefined;
      let isEdit = $(event.currentTarget).hasClass('btn-action-task');

      if(isEdit)
      {
        formTask = new FormTask(project.tasks[$(event.currentTarget).attr('data-task-index')], project);
      }
      else
      {
        formTask = new FormTask(undefined, project);
      }

      let title = isEdit ? `Edit task : ${formTask.task.name}` : 'Add a task';

      Modal.show(title, formTask.display(), function()
      {
        let result = FormTask.save(formTask, isEdit);
        refreshTabContent(taskView.prefix);

        return result;
      });
    }

    $(`#${this.prefix}-add-task, .${this.prefix}-edit`).click(clickAddEditEvent);
  }
}

module.exports = ListTasks;
